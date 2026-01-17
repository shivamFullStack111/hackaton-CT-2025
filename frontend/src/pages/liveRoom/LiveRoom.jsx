/* eslint-disable no-unused-vars */
import Header from "./Header";

import { useEffect, useRef, useState } from "react";
import SidebarLeft from "./SidebarLeft";
import { Excalidraw } from "@excalidraw/excalidraw";
import "../../../node_modules/@excalidraw/excalidraw/dist/dev/index.css";
import SidebarRight from "./SidebarRight";
import MyEditor from "@monaco-editor/react";
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
import SessionEndedByHostOverlay from "./SessionEndedByHostOverlay";
import SessionEndedOverlay from "./SessionEndedOverlay";

const socket = io("http://localhost:8888");

const LiveRoom = () => {
  const [isCallingButtonsOn, setisCallingButtonsOn] = useState(true);
  const [currentPage, setcurrentPage] = useState("whiteboard"); // whiteboard || editor || quiz
  const [language, setlanguage] = useState("javascript");
  const [theme, settheme] = useState("vs-dark");
  const [activeUsersPopUpOpen, setactiveUsersPopUpOpen] = useState(false);
  const [codeEditorCurrentValue, setcodeEditorCurrentValue] = useState();
  const [roomData, setroomData] = useState();
  const [allJoindedUsers, setallJoindedUsers] = useState([]);
  const navigate = useNavigate();
  const [allLiveChatMessages, setallLiveChatMessages] = useState([]);

  const { user } = useSelector((state) => state.user);
  const { id: roomId } = useParams();
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  // this state use when session ended by host only for first time
  const [isSessionEndedByHost, setisSessionEndedByHost] = useState(false);

  // This useEffect run when host accidentaly leave room
  // this useEffect calling the function which is ending the liveRoom and sending socket emit of session ending
  useEffect(() => {
    return () => {
      if (user?._id == roomData?.createdBy?._id) {
        endSession();
      }
    };
  }, [roomData, user]);

  const endSession = async () => {
    socket.emit("session-ended", {
      session_id: roomData?._id,
      roomId: roomData?.roomId,
    });

    const res = await axios.post(
      `http://localhost:8888/api/session/${roomData?._id}/end`,
      {}
    );

    if (res?.data?.success) {
      setisSessionEndedByHost(true);
    }
  };

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
        if (!res.data?.session) {
          setroomData(null);
        }
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
        toast.error(message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });

      socket.on("session-ended", ({ session_id, roomId }) => {
        setisSessionEndedByHost(true);
        setroomData((p) => ({ ...p, endedDateTime: new Date() }));
        console.log("first");
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
    if (!socket || !user?._id || !roomData?.createdBy?._id) return;

    // this is only for admin because when new user will add admin send (all messages and code editor value).
    socket.on("single-user-added", ({ userId, roomId, userSocketId }) => {
      // if (user?._id == roomData?.createdBy?._id) {
      //   console.log("first77777777777777777777", codeEditorCurrentValue);
      //   socket.emit("editor-code-change", {
      //     newVal: codeEditorCurrentValue,
      //     roomId,
      //   });
      // }
      if (
        user?._id == roomData?.createdBy?._id &&
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
    roomData?.createdBy?._id,
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

  // Loading state
  if (!roomData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading room information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isSessionEndedByHost && (
        <SessionEndedByHostOverlay
          user={user}
          roomData={roomData}
          isHost={false}
        ></SessionEndedByHostOverlay>
      )}

      {(!roomData || roomData?.ended == true) && (
        <SessionEndedOverlay
          roomData={roomData}
          isRoomFound={roomData ? true : false}
        />
      )}

      {roomData && roomData?.ended == false && (
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
                  style={{
                    display: currentPage === "whiteboard" ? "" : "none",
                  }}
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
                  <CreateQuiz roomData={roomData} />
                </div>

                {/* Quiz For Users */}
                <div
                  style={{ display: currentPage === "quiz" ? "" : "none" }}
                  className="w-full h-[100.5%] bg-gray-900 z-30"
                >
                  <QuizPage user={user} roomData={roomData} />
                </div>

                {/* Dashboard */}
                <div
                  style={{ display: currentPage === "dashboard" ? "" : "none" }}
                  className="w-full h-[100.5%] bg-gray-900 z-30"
                >
                  <Dashboard />
                </div>

                {/* <Call_Controls  isCallingButtonsOn={isCallingButtonsOn} setisCallingButtonsOn={setisCallingButtonsOn}/> */}
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
      )}
    </div>
  );
};

export default LiveRoom;
