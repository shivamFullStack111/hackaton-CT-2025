import {
  AlertCircle,
  BadgeInfo,
  BookOpen,
  Check,
  Copy,
  Loader2,
  Send,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Sidebar_grammer from "./Sidebar_grammer";
import { DB_URL } from "../../utils";

const ConversationBox = ({ messages, setMessages }) => {
  const [currentDetails, setcurrentDetails] = useState({});
  const [selectedMode, setSelectedMode] = useState("standard");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [showCorrections, setShowCorrections] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line no-undef
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!inputText.trim() || isLoading) return;

      setMessages((p) => [
        ...p,
        {
          id: messages?.length + 1,
          role: "user",
          original_text: inputText,
        },
      ]);

      setInputText("");
      setIsLoading(true);

      const payload = {
        userInput: inputText,
        grammer_mode: selectedMode,
      };

      const res = await axios.post(
        `${DB_URL}/ai/grammer-checker`,
        payload
      );

      const content = JSON.parse(res?.data?.message?.content) || {};
      setcurrentDetails(content);
      setMessages((p) => [
        ...p,
        {
          id: messages?.length + 1,
          role: "assistant",
          ...content,
        },
      ]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text, messageId) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <>
      {/* conversation box  */}
      <div className="flex-1">
        <div className="bg-dark-navy rounded-2xl border border-gray-700 overflow-hidden flex flex-col h-[600px]">
          {/* Messages Header */}
          <div className="border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-white">
                  AI Grammar Assistant
                </span>
                <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-sm text-gray-400">
                {messages.length} messages
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto scrollbar p-4 md:p-6 space-y-6">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-5 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white rounded-tr-none border border-purple-500"
                      : "bg-gray-800 border border-gray-700 rounded-tl-none"
                  }`}
                >
                  {/* Message Header */}
                  <div
                    className={`flex items-center justify-between mb-3 ${
                      message.role === "user"
                        ? "text-purple-200"
                        : "text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {message.role === "assistant" ? (
                        <>
                          <div className="p-1 bg-gradient-to-r from-teal to-purple-600 rounded">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium">GrammarAI</span>
                        </>
                      ) : (
                        <>
                          <div className="p-1 bg-white/20 rounded">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <span className="font-medium">You</span>
                        </>
                      )}
                    </div>
                    {message?.id !== 1 && message?.role == "assistant" && (
                      <button
                      onClick={()=>{
                        setcurrentDetails(message)
                      }}
                        className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${
                          message.role === "user"
                            ? "bg-white/20 hover:bg-white/30 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        }`}
                      >
                        <>
                          <BadgeInfo className="h-4 w-4" />
                          Show Details
                        </>
                      </button>
                    )}
                  </div>

                  {/* Message Content */}
                  <p
                    className={`whitespace-pre-wrap ${
                      message.role === "user" ? "text-white" : "text-gray-200"
                    }`}
                  >
                    {message?.role == "assistant"
                      ? message?.corrected_text
                      : message?.original_text}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-opacity-20 border-gray-600">
                    <div className="flex items-center gap-3">
                      {message.role === "assistant" &&
                        message.mistakes?.length > 0 && (
                          <button
                            onClick={() =>
                              setShowCorrections((prev) => ({
                                ...prev,
                                [message.id]: !prev[message.id],
                              }))
                            }
                            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                              showCorrections[message.id]
                                ? "bg-purple-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                          >
                            <AlertCircle className="h-3.5 w-3.5" />
                            {message.mistakes.length} correction
                            {message.mistakes.length !== 1 ? "s" : ""}
                          </button>
                        )}

                      {message.role === "assistant" && (
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-teal transition-colors">
                          <Volume2 className="h-3.5 w-3.5" />
                          Listen
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        const messageToCopy =
                          message?.role == "user"
                            ? message.original_text
                            : message.corrected_text;
                        handleCopyText(messageToCopy, message?.id);
                      }}
                      className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        message.role === "user"
                          ? "bg-white/20 hover:bg-white/30 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      }`}
                    >
                      {copiedMessageId === message.id ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  {/* Corrections Panel */}
                  {message.role === "assistant" &&
                    message.mistakes?.length > 0 &&
                    showCorrections[message.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-600 border-opacity-20">
                        <h4 className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-teal" />
                          Grammar Corrections
                        </h4>
                        <div className="space-y-3">
                          {message.mistakes.map((correction, index) => (
                            <div
                              key={index}
                              className="bg-gray-900 p-3 rounded-lg border border-gray-700"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="line-through text-red-400 font-medium">
                                  {correction?.original}
                                </span>
                                <span className="text-gray-500">→</span>
                                <span className="text-teal font-semibold">
                                  {correction?.corrected}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400">
                                {correction?.reason}
                              </p>
                            </div>
                          ))}
                        </div>

                        {message.original && (
                          <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-gray-700">
                            <p className="text-sm text-gray-400 mb-1">
                              Original text:
                            </p>
                            <p className="text-gray-300 italic">
                              {message.original}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-gray-800 border border-gray-700 p-5">
                  <div className="flex items-center gap-3 text-gray-400 mb-3">
                    <div className="p-1 bg-gradient-to-r from-teal to-purple-600 rounded">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">GrammarAI</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Loader2 className="h-5 w-5 animate-spin text-teal" />
                    <span>Analyzing your text and making mistakes...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700 p-4">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type or paste your text here to check grammar..."
                className="w-full scrollbar h-32 p-4 pr-12 bg-gray-800 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className={`absolute -translate-y-10  right-3 bottom-3 p-3 rounded-xl transition-all ${
                  !inputText.trim() || isLoading
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal to-purple-600 text-white hover:shadow-lg"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>

              <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Press Enter to send • Shift+Enter for new line</span>
                </div>
                <span>{inputText.length}/5000 characters</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar box */}
      <Sidebar_grammer
        currentDetails={currentDetails}
        setcurrentDetails={setcurrentDetails}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        setInputText={setInputText}
      />
    </>
  );
};

export default ConversationBox;
