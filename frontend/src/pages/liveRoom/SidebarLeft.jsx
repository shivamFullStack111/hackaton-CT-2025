/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { MdReviews } from "react-icons/md";
import { motion } from "framer-motion";
import { GrNotes } from "react-icons/gr";
import { RiAiGenerate2, RiLoader4Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { BsSendFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
import axios from "axios";

// for chat ui
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SidebarLeft = ({
  roomData,
  codeEditorCurrentValue,
  setcodeEditorCurrentValue,
  programingLanguage,
}) => {
  const [barNumber, setbarNumber] = useState(0);
  const [exitRoomPopUpOpen, setexitRoomPopUpOpen] = useState(false);
  const [isReviewOpen, setisReviewOpen] = useState(false);
  const [isCodeReviewingLoading, setisCodeReviewingLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);
  const [allMessages, setallMessages] = useState([]);
  const [userInput, setuserInput] = useState("");
  const [noOfRowsOfInput, setnoOfRowsOfInput] = useState(2);

  useEffect(() => {
    if (allMessages?.length % 2 == 0) {
      return;
    }
    messagesEndRef?.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [allMessages]);

  useEffect(() => {
    const keyPress = (e) => {
      if (e.key == "Enter" && userInput?.trim()) {
        handleReviewCode(userInput);
      }
    };
    window.addEventListener("keydown", keyPress);

    return () => {
      return window.removeEventListener("keydown", keyPress);
    };
  }, [userInput]);

  const handleReviewCode = async (content) => {
    setisCodeReviewingLoading(true);
    try {
      const payload = {
        allMessages: [
          ...(allMessages?.slice(-6) || []),
          {
            role: "user",
            content: `
            ${content}
            ${
              programingLanguage
                ? `USER USING PROGRAMMING LANGUAGE: ${programingLanguage}`
                : ``
            }
            `,
          },
        ],
      };

      setallMessages((p) => [
        ...p,
        {
          role: "user",
          content: content,
        },
      ]);

      setuserInput("");

      const res = await axios.post(
        "http://localhost:8888/api/ai/review-code",
        payload
      );

      setallMessages((p) => [
        ...p,
        {
          role: "assistant",
          content: res?.data?.message?.content,
        },
      ]);

      const container = messagesEndRef.current.parentElement;
      setuserInput("");
      setTimeout(() => {
        container.scrollTo({
          top: container.scrollTop + 350,
          behavior: "smooth",
        });
      }, 400);
    } catch (error) {
      console.log(error.message);
    } finally {
      setisCodeReviewingLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {/* exit room pop up  */}
      <motion.div
        initial={{ display: "none" }}
        transition={{ delay: exitRoomPopUpOpen ? 0 : 0 }}
        animate={{ display: exitRoomPopUpOpen ? "flex" : "none" }}
        className="absolute top-0 w-full h-full left-0 z-50  bg-[#0000005a] flex justify-center items-center "
      >
        <motion.div
          initial={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          animate={{ scale: exitRoomPopUpOpen ? 1 : 0 }}
          className="rounded-xl shadow-xl px-10 bg-white py-4"
        >
          <p className="font-bold text-xl">
            Are you sure? you want to leave room
          </p>
          <div className="flex mt-6 justify-end gap-5 items-center">
            <button
              onClick={() => setexitRoomPopUpOpen(false)}
              className="px-6 py-1 hover:scale-110 duration-200 rounded-lg border-2 text-purple-500 border-purple-500  "
            >
              No
            </button>
            <button className="px-6 py-1 hover:scale-110 duration-200   rounded-lg text-white border-2 border-purple-500  bg-purple-600">
              Yes
            </button>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex  ">
        <div className="flex gap-4 flex-col  py-4 bg-dark-navy ">
          <div
            title="Ai code reviewer"
            onClick={() => setbarNumber((p) => (p == 1 ? 0 : 1))}
            className={`flex cursor-pointer border-dark-navy text-white  border-l-4 ${
              barNumber == 1 && " text-purple-500 !border-purple-500"
            }   justify-center p-4`}
          >
            <MdReviews className="text-3xl text-gray-500"></MdReviews>
          </div>
          <div
            title="Ai notes generator"
            className={`flex cursor-pointer border-dark-navy text-white  border-l-4    justify-center p-4`}
          >
            <GrNotes className="text-3xl text-gray-500"></GrNotes>
          </div>
          {user?._id == roomData?.createdBy && (
            <div
              title="Ai quiz generator"
              className={`flex cursor-pointer border-dark-navy text-white  border-l-4    justify-center p-4`}
            >
              <RiAiGenerate2 className="text-3xl text-gray-500"></RiAiGenerate2>
            </div>
          )}

          <div
            onClick={() => setexitRoomPopUpOpen(true)}
            title="Exit room"
            className="mt-auto cursor-pointer flex justify-center text-3xl text-red-500"
          >
            <IoExitOutline className="mt-auto"></IoExitOutline>
          </div>
        </div>
        {/* code review  */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: barNumber == 1 ? 450 : 0,
            opacity: barNumber == 1 ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          className={`w-72 h-full relative overflow-hidden flex flex-col   bg-[#1c1e2ad4] ${
            barNumber == 1 && " p-3"
          } `}
        >
          <div className="flex  min-w-[350px] items-center gap-2 pb-2   ">
            <img className="h-8 w-8" src="/public/ai.gif" alt="" />
            <p className="font-bold text-gray-300">Code Review with AI ✨</p>
          </div>

          <div className="h-full    flex flex-col">
            <div className="h-[100%] pb-36 flex flex-col px-3 overflow-y-auto scrollbar ">
              {allMessages?.length &&
                allMessages?.map((message) => {
                  if (message?.role == "user")
                    return (
                      <>
                        {" "}
                        <br />
                        <div className="ml-auto bg-gray-900 px-3 py-2 rounded-lg text-white">
                          {message?.content}
                        </div>
                        <br />
                      </>
                    );

                  if (message?.role == "assistant")
                    return (
                      <div className="text-white over  max-w-[370px] text-wrap flex-wrap  whitespace-pre-wrap">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );

                              return !inline && match ? (
                                <SyntaxHighlighter
                                  style={oneDark}
                                  language={match[1]}
                                  PreTag="div"
                                  className="rounded-xl text-sm my-3"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                              ) : (
                                <code className="bg-gray-800 px-1 rounded text-purple-400">
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    );
                })}
              <div ref={messagesEndRef}></div>
            </div>
            <div className=" absolute w-[90%] bottom-4  flex justify-center items-center ">
              {!isReviewOpen && (
                <button
                  onClick={() => {
                    if (!codeEditorCurrentValue?.trim()?.length) {
                      return toast.error("You Have Not Write Any Code Yet!");
                    }
                    setisReviewOpen(true);
                    handleReviewCode(codeEditorCurrentValue);
                  }}
                  className="  p-2 w-[90%] bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-400"
                >
                  Review
                </button>
              )}

              {isReviewOpen && (
                <div className=" flex-col relative w-full flex">
                  <div className="absolute -top-7 ml-2 flex items-center gap-2"></div>
                  <div className="rounded-xl text-gray-200  h-14 flex items-center w-full">
                    <textarea
                      value={userInput}
                      onChange={(e) => {
                        setuserInput(e.target.value);
                      }}
                      className="w-[85%]  rounded-l-xl p-1 bg-gray-700  outline-none"
                      placeholder="Ask Anything..."
                      name=""
                      rows={noOfRowsOfInput}
                      id="userInputField"
                    ></textarea>
                    <div
                      onClick={() => {
                        if (!isCodeReviewingLoading)
                          handleReviewCode(userInput);
                      }}
                      className="w-[15%] cursor-pointer group  h-full bg-gray-700 rounded-r-xl flex justify-center items-center"
                    >
                      {isCodeReviewingLoading ? (
                        <RiLoader4Fill className="text-black  animate-spin  text-xl " />
                      ) : (
                        <BsSendFill className="text-green-600 group-hover:scale-110 transition-all duration-200 text-xl rotate-45" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SidebarLeft;
