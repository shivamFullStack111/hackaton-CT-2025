/* eslint-disable no-unused-vars */
import Header from "./Header";
import { FaChevronUp } from "react-icons/fa6";
import { AiOutlineAudio } from "react-icons/ai";
import { CiVideoOn } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import SidebarLeft from "./SidebarLeft";
import { Excalidraw } from "@excalidraw/excalidraw";
import "../../../node_modules/@excalidraw/excalidraw/dist/dev/index.css";
import SidebarRight from "./SidebarRight";
import MyEditor from "@monaco-editor/react";
import JoinedUsersPopUp from "./JoinedUsersPopUp";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DB_URL } from "../../utils";
import { toast } from "react-hot-toast";
import Call_Controls from "./Call_Controls";
import CreateQuiz from "./Create_Quiz/CreateQuiz";
import QuizPage from "./QuizPage";
import Dashboard from "./Dashboard";

const socket = io("http://localhost:8888");

const LiveRoom = () => {
  const [isCallingButtonsOn, setisCallingButtonsOn] = useState(true);
  const [currentPage, setcurrentPage] = useState("whiteboard"); // whiteboard || editor || quiz
  const [language, setlanguage] = useState("javascript");
  const [theme, settheme] = useState("vs-light");
  const [activeUsersPopUpOpen, setactiveUsersPopUpOpen] = useState(false);
  const [codeEditorCurrentValue, setcodeEditorCurrentValue] = useState();
  const [roomData, setroomData] = useState();
  const [allJoindedUsers, setallJoindedUsers] = useState([]);
  const navigate = useNavigate();
  const [allLiveChatMessages, setallLiveChatMessages] = useState([]);

  const { user } = useSelector((state) => state.user);
  const { id: roomId } = useParams();
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = "Are you sure you want to end session? ";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // get session/room data
  useEffect(() => {
    if (!roomId) return;

    const getRoomData = async () => {
      try {
        const res = await axios.get(DB_URL + "/session/" + roomId);
        setroomData(res.data?.session);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getRoomData();
  }, [roomId]);

  // live chat message
  const handleSendMessage = (senderId, message) => {
    socket.emit("live-chat-message", { senderId, message });
  };

  // kick user
  const handleKickUser = (userId) => {
    socket.emit("kick-user", userId);
  };

  // 🔹 flag to handling excelidraw
  // this for avoid infinite loop error
  const isRemoteUpdate = useRef(false);

  //   join room
  useEffect(() => {
    if (roomId && user?._id && roomData) {
      socket.emit("join-room", { userId: user._id, roomId });
      socket.on("joinded-users", (data) => {
        console.log("Joined users:", data);
        setallJoindedUsers(data);
      });

      socket.on("editor-code-change", (newVal) => {
        setcodeEditorCurrentValue(newVal);
      });

      socket.on("kick-user", ({ message }) => {
        navigate("/");
      });

      socket.on("live-chat-message", ({ senderData, message }) => {
        setallLiveChatMessages((p) => [...p, { sender: senderData, message }]);
        console.table(senderData, message);
      });

      socket.on(
        "all-chat-message-and-code",
        ({ codeEditorCurrentValue: CEV, allLiveChatMessages: ALM, roomId }) => {
          console.log("++++++++++++++++++++++++++++++++++");

          setcodeEditorCurrentValue(CEV);
          setallLiveChatMessages(ALM);
          console.log("++++++++++++++++++++++++++++++++++");
        }
      );
    }

    return () => {
      socket.off("joinded-users");
      socket.off("editor-code-change");
      socket.off("kick-user");
      socket.off("all-chat-message-and-code");
    };
  }, [roomId, user?._id, roomData]);

  // all messages and code send for new user
  useEffect(() => {
    if (!socket || !user?._id || !roomData?.createdBy) return;

    // this is only for admin because when new user will add admin send (all messages and code editor value).
    socket.on("single-user-added", ({ userId, roomId, userSocketId }) => {
      // if (user?._id == roomData?.createdBy) {
      //   console.log("first77777777777777777777", codeEditorCurrentValue);
      //   socket.emit("editor-code-change", {
      //     newVal: codeEditorCurrentValue,
      //     roomId,
      //   });
      // }
      if (
        user?._id == roomData?.createdBy &&
        (allLiveChatMessages?.length > 0 || codeEditorCurrentValue)
      ) {
        console.log("senddddd--", roomId);
        socket.emit("all-chat-message-and-code", {
          codeEditorCurrentValue: codeEditorCurrentValue || "",
          allLiveChatMessages: allLiveChatMessages || "",
          roomId,
        });
      }
    });

    return () => {
      socket.off("single-user-added");
    };
  }, [
    codeEditorCurrentValue,
    roomData?.createdBy,
    user?._id,
    allLiveChatMessages,
  ]);

  // WHITEBOARD = listen for remote updates
  useEffect(() => {
    if (!excalidrawAPI) return;

    socket.on("update-exceil-change", (elements) => {
      if (excalidrawAPI) {
        isRemoteUpdate.current = true; // jab remote se change hokr data ayega tab ham isRemoteUpdate ko true kr denge
        // mtlb ye data dusre user se aya fir ham isse excalidraw me update kr denge
        // pr handleExceilDrawChange function har bar change hone pr run ho rha he to jab ham remote changes ko apply krenge and isRemoteUpdate.current=true  kr denge then  changes detect hone pr handleExceilDrawChange function run hoga
        // and hamne isRemoteUpdate.current=true kr diya tha socket.on me abb handleExceilDrawChange function run hoga  condition isRemoteUpdate.current=true hoga fir ham isRemoteUpdate.current=false krke function exit kr denge jisse dobara emit nhi hoga jisse infinite loop se bachenge
        // iss liye ham function me isRemoteUpdate.current check kr rhe he mtlb  ===  agr remote se aya he to usse ham socket.on me listen krke ExceilDraw update kr rhe he
        // pr agr current user ne change kiya to isRemoteUpdate.current=false hoga tab ham emmit kr denge
        excalidrawAPI.updateScene({ elements });
      }
    });

    return () => {
      socket.off("update-exceil-change");
    };
  }, [excalidrawAPI]);

  // WHITEBOARD = handle local change
  const handleExceilDrawChange = (elements) => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false; // this is used for ignore remote update
      return;
    }
    socket.emit("update-exceil-change", { roomId, elements });
  };

  // EDITOR: handle editor code changes
  const changeEditorCodeHandler = (newVal) => {
    socket.emit("editor-code-change", { newVal, roomId });
  };

  return (
    <>
      <div className="w-[100vw] bg-gray-900 overflow-hidden">
        <Header
          handleKickUser={handleKickUser}
          activeUsersPopUpOpen={activeUsersPopUpOpen}
          allJoindedUsers={allJoindedUsers}
          roomData={roomData}
          setactiveUsersPopUpOpen={setactiveUsersPopUpOpen}
          setlanguage={setlanguage}
          settheme={settheme}
          currentPage={currentPage}
        ></Header>
        <div className="h-[89.3vh] flex ">
          {/* sidebar left */}
          <SidebarLeft
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
            programingLanguage={language}
            codeEditorCurrentValue={codeEditorCurrentValue}
            setcodeEditorCurrentValue={setcodeEditorCurrentValue}
            roomData={roomData}
          ></SidebarLeft>

          {/* main section */}
          <div className="w-full bg-white overflow-hidden h-full flex flex-col ">
            <div className="h-full relative  w-full">
              {/* Whiteboard */}
              <div
                style={{ display: currentPage === "whiteboard" ? "" : "none" }}
                className="w-full h-[100.5%] bg-gray-900 z-30"
              >
                <Excalidraw
                  excalidrawAPI={(api) => setExcalidrawAPI(api)}
                  //   ref={excalidrawRef}
                  onChange={(elements) => handleExceilDrawChange(elements)}
                />
              </div>

              {/* Editor */}
              <div
                style={{ display: currentPage === "editor" ? "" : "none" }}
                className="w-full h-[100.5%] bg-gray-900 z-30"
              >
                <MyEditor
                  theme={theme}
                  value={codeEditorCurrentValue}
                  language={language}
                  onChange={(newVal) => {
                    setcodeEditorCurrentValue(newVal);
                    changeEditorCodeHandler(newVal);
                  }}
                />
              </div>

              {/*Ai Quiz generator */}
              <div
                style={{
                  display: currentPage === "quiz-generator" ? "" : "none",
                }}
                className="w-full h-[100.5%] bg-gray-900 z-30"
              >
                <CreateQuiz />
              </div>

              {/* Quiz For Users */}
              <div
                style={{ display: currentPage === "quiz" ? "" : "none" }}
                className="w-full h-[100.5%] bg-gray-900 z-30"
              >
                <QuizPage />
              </div>

              {/* Dashboard */}
              <div
                style={{ display: currentPage === "dashboard" ? "" : "none" }}
                className="w-full h-[100.5%] bg-gray-900 z-30"
              >
                <Dashboard />
              </div>

              <Call_Controls />
            </div>
          </div>

          {/* sidebar right */}
          <SidebarRight
            roomData={roomData}
            setallLiveChatMessages={setallLiveChatMessages}
            allLiveChatMessages={allLiveChatMessages}
            handleSendMessage={handleSendMessage}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          ></SidebarRight>
        </div>
      </div>
    </>
  );
};

export default LiveRoom;
