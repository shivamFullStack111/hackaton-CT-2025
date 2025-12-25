import React, { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

// for chat ui
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ConversationBlock = ({ userData }) => {
  const [userInput, setuserInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isMessageSending_Loading, setisMessageSending_Loading] =
    useState(false);
  const [allMessages, setallMessages] = useState([]);

  const handleSendMessage = useCallback(async () => {
    try {
      setisMessageSending_Loading(true);

      const payload = {
        allMessages: [
          ...allMessages,
          {
            role: "user",
            content: userInput,
          },
        ],
        profile: userData,
      };

      setallMessages((p) => [
        ...p,
        {
          role: "user",
          content: userInput,
        },
      ]);
      setuserInput("");
      const res = await axios.post(
        "http://localhost:8888/api/ai/personalized-chat",
        payload
      );
      setuserInput("");
      setallMessages((p) => [
        ...p,
        {
          role: "assistant",
          content: res?.data?.message?.content,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setisMessageSending_Loading(false);
    }
  }, [allMessages, userInput, userData]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        e.key === "Enter" &&
        userInput?.trim()?.length > 0 &&
        !isMessageSending_Loading
      ) {
        handleSendMessage();
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [userInput, handleSendMessage, isMessageSending_Loading]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const scrollToBottom = async () => {
    messagesEndRef?.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <div className="flex-1 z-30">
      <div className="bg-dark-navy rounded-2xl border border-gray-700 h-[700px] flex flex-col">
        {/* HEADER */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Learning Guidance Session
              </h2>
              <p className="text-gray-400">
                Personalized recommendations based on your goals
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white font-semibold">
                  {userData.fullName || "Student"}
                </div>
                <div className="text-gray-400 text-sm">
                  {userData.currentlyPursuing || "Computer Science"}
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {userData.fullName ? userData.fullName[0].toUpperCase() : "S"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CHAT BODY */}
        <div className="flex-1 overflow-y-auto p-6  space-y-6">
          {/* EMPTY STATE */}
          {allMessages.length === 0 ? (
            <div className="text-center text-gray-500 h-full flex items-center justify-center">
              <div>
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-xl">
                  Start a conversation with your AI assistant!
                </p>
                <p className="text-gray-400 mt-2">
                  Ask about learning plans, resources, or any questions you
                  have.
                </p>
              </div>
            </div>
          ) : (
            allMessages?.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message?.role == "assistant" ? "" : "justify-end"
                }`}
              >
                {/* AI Avatar */}
                {message?.role == "assistant" && (
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">AI</span>
                  </div>
                )}

                {/* MESSAGE BUBBLE */}
                <div
                  className={`rounded-2xl p-6 border max-w-3xl ${
                    message?.role == "assistant"
                      ? "bg-gray-750 border-gray-600"
                      : "bg-blue-600 border-blue-500"
                  }`}
                >
                  <div className="text-white whitespace-pre-wrap">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");

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
                </div>

                {/* USER Avatar */}
                {message?.role !== "assistant" && (
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">
                      {userData.fullName
                        ? userData.fullName[0].toUpperCase()
                        : "U"}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BOX */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <textarea
                value={userInput}
                onChange={(e) => {
                  setuserInput(e.target.value);
                }}
                placeholder="Type your message here..."
                className="w-full text-black bg-gray-750 border border-gray-600 rounded-2xl p-4 pr-12  resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                rows="3"
              />
            </div>

            <button
              onClick={() => {
                handleSendMessage();
              }}
              disabled={isMessageSending_Loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold text-lg flex items-center gap-2"
            >
              {isMessageSending_Loading ? (
                <div className="border-l-2 rounded-full border-r-2 border-t-2 h-6 w-6 border-white animate-spin"></div>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBlock;
