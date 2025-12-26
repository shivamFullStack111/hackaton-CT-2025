import React, { useState, useRef, useEffect } from "react";
import {
  IoExitOutline,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import {
  MdReviews,
  MdQuiz,
  MdOutlineDashboard,
  MdOutlineCode,
} from "react-icons/md";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Zap,
  Code2,
  Shield,
  CheckCircle,
  FileCode,
  X,
  Copy,
  Send,
  Bot,
  User,
  Filter,
  RefreshCw,
  Terminal,
  BrainCircuit,
} from "lucide-react";

const SidebarLeft = ({
  roomData,
  codeEditorCurrentValue,
  setcodeEditorCurrentValue,
  programingLanguage,
  currentPage,
  setcurrentPage,
}) => {
  const [isCodeReviewOpen, setIsCodeReviewOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [allMessages, setallMessages] = useState([]);
  const participants = Array.isArray(roomData?.participants)
    ? roomData.participants
    : [];

  const { user } = useSelector((state) => state.user || {});

  // Safe access with fallbacks
  const isTeacher = user?._id === roomData?.createdBy;

  // Navigation items
  const navItems = [
    {
      id: "dashboard",
      icon: MdOutlineDashboard,
      label: "Dashboard",
      active: currentPage === "dashboard",
      onClick: () => setcurrentPage("dashboard"),
      visible: true,
    },
    {
      id: "ai-review",
      icon: FaRobot,
      label: "AI Review",
      active: isCodeReviewOpen,
      onClick: () => setIsCodeReviewOpen(!isCodeReviewOpen),
      visible: true,
      badge: allMessages?.length > 1 ? allMessages?.length - 1 : null,
    },
    {
      id: "quiz-generator",
      icon: MdQuiz,
      label: "Quiz Generator",
      active: currentPage === "quiz-generator",
      onClick: () => setcurrentPage("quiz-generator"),
      visible: isTeacher,
    },
  ].filter((item) => item.visible);

  // Exit Modal Component
  const ExitModal = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-dark-navy border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <IoExitOutline className="text-red-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Leave Session</h3>
            <p className="text-gray-400 text-sm">
              Are you sure you want to exit?
            </p>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <p className="text-gray-300 mb-2">You'll lose access to:</p>
          <ul className="text-gray-400 text-sm space-y-1">
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              Live code collaboration
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              AI code assistant
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              Quiz generator features
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowExitModal(false)}
            className="flex-1 py-3 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors font-medium"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all font-medium">
            Leave Session
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #475569",
          },
        }}
      />

      {/* Exit Modal */}
      {showExitModal && <ExitModal />}

      {/* Main Sidebar Container */}
      <div className="flex h-full relative">
        {/* Left Sidebar */}
        <div
          className={`flex flex-col h-full bg-dark-navy border-r border-gray-800 transition-all duration-300 ${
            isSidebarCollapsed ? "w-16" : "w-20"
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-3 border-b border-gray-800 text-gray-400 hover:text-white"
          >
            {isSidebarCollapsed ? (
              <IoChevronForward className="h-5 w-5 mx-auto" />
            ) : (
              <IoChevronBack className="h-5 w-5 mx-auto" />
            )}
          </button>

          {/* Navigation Items */}
          <div className="flex-1 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`relative group w-full p-4 ${
                  item.active
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
                title={item.label}
              >
                <div className="flex flex-col items-center">
                  {React.createElement(item.icon, {
                    className: "h-5 w-5",
                  })}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {!isSidebarCollapsed && (
                    <span className="text-xs mt-1 truncate w-full text-center">
                      {item.label}
                    </span>
                  )}
                </div>
                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.label}
                    {item.badge && ` (${item.badge})`}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* User Info */}
          {!isSidebarCollapsed && user && (
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-teal flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-400">
                    {isTeacher ? "Teacher 👑" : "Student"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Exit Button */}
          <button
            onClick={() => setShowExitModal(true)}
            className="w-full p-4 text-red-400 hover:text-red-300 border-t border-gray-800"
            title="Exit Room"
          >
            <div className="flex flex-col items-center">
              <IoExitOutline className="h-5 w-5" />
              {!isSidebarCollapsed && (
                <span className="text-xs mt-1">Exit</span>
              )}
            </div>
          </button>
        </div>

        {/* AI Code Review Drawer */}
        <CodeReviewDrawer
          roomData={roomData}
          user={user}
          allMessages={allMessages}
          setallMessages={setallMessages}
          isCodeReviewOpen={isCodeReviewOpen}
          codeEditorCurrentValue={codeEditorCurrentValue}
          setcodeEditorCurrentValue={setcodeEditorCurrentValue}
          setIsCodeReviewOpen={setIsCodeReviewOpen}
          programingLanguage={programingLanguage}
        />
      </div>
    </>
  );
};

export default SidebarLeft;

// Code Review Drawer Component
const CodeReviewDrawer = ({
  codeEditorCurrentValue,
  setcodeEditorCurrentValue,
  setIsCodeReviewOpen,
  isCodeReviewOpen,
  roomData,
  user,
  allMessages,
  setallMessages,
  programingLanguage,
}) => {
  const [userInput, setUserInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeReviewMode, setActiveReviewMode] = useState("comprehensive");
  // const [codeMetrics, setCodeMetrics] = useState(null);
  const messagesEndRef = useRef(null);

  // AI Review Modes
  const reviewModes = [
    {
      id: "comprehensive",
      name: "Comprehensive",
      icon: BrainCircuit,
      color: "bg-gradient-to-r from-purple-600 to-purple-700",
      description: "Full code analysis",
    },
    {
      id: "security",
      name: "Security",
      icon: Shield,
      color: "bg-gradient-to-r from-red-600 to-red-700",
      description: "Security audit",
    },
    {
      id: "performance",
      name: "Performance",
      icon: Zap,
      color: "bg-gradient-to-r from-teal to-teal-dark",
      description: "Optimization tips",
    },
    {
      id: "best-practices",
      name: "Best Practices",
      icon: CheckCircle,
      color: "bg-gradient-to-r from-green-600 to-green-700",
      description: "Coding standards",
    },
    {
      id: "debug",
      name: "Debug",
      icon: Terminal,
      color: "bg-gradient-to-r from-yellow-600 to-yellow-700",
      description: "Find and fix bugs",
    },
  ];

  // Quick Prompts for AI
  // const quickPrompts = [
  //   "Review this code for bugs",
  //   "Optimize performance",
  //   "Check security vulnerabilities",
  //   "Explain how this code works",
  //   "Suggest improvements",
  //   "Convert to async/await",
  //   "Add error handling",
  //   "Make it more readable",
  //   "Check for edge cases",
  //   "Suggest better variable names",
  // ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current && isCodeReviewOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages, isCodeReviewOpen]);

  // useEffect(() => {
  //   if (codeEditorCurrentValue) {
  //     const lines = codeEditorCurrentValue.split("\n");
  //     const functions = (
  //       codeEditorCurrentValue.match(
  //         /function\s+\w+|const\s+\w+\s*=\s*\(|let\s+\w+\s*=\s*\(|var\s+\w+\s*=\s*\(|=>/g
  //       ) || []
  //     ).length;
  //     const comments = lines.filter(
  //       (line) =>
  //         line?.trim().startsWith("//") ||
  //         line?.trim().startsWith("/*") ||
  //         line?.trim().startsWith("*")
  //     ).length;

  //     setCodeMetrics({
  //       lines: lines?.length,
  //       functions,
  //       comments,
  //       characters: codeEditorCurrentValue.length,
  //       complexity:
  //         lines?.length > 100 ? "High" : lines?.length > 50 ? "Medium" : "Low",
  //     });
  //   }
  // }, [codeEditorCurrentValue]);

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  useEffect(() => {
    console.log(allMessages);
  }, [allMessages]);

  const handleReviewCode = async () => {
    if (!codeEditorCurrentValue?.trim()) {
      toast.error("Please write some code first!");
      return;
    }

    setIsAiLoading(true);

    try {
      setallMessages((p) => [
        ...p,
        {
          role: "user",
          content: userInput,
        },
      ]);

      const payload = {
        allMessages: [
          ...(allMessages?.slice(-6) || []),
          {
            role: "user",
            content: `
            USER MESSAGE: ${userInput}

            ${
              programingLanguage
                ? `USER USING PROGRAMMING LANGUAGE: ${programingLanguage}`
                : ``
            }

            USER CODE: ${codeEditorCurrentValue}
            `,
          },
        ],
        reviewMode: activeReviewMode,
      };

      setUserInput("");

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
      setUserInput("");
      setTimeout(() => {
        container.scrollTo({
          top: container.scrollTop + 350,
          behavior: "smooth",
        });
      }, 400);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleClearChat = () => {
    setallMessages([]);
    toast.success("Chat cleared!");
  };

  return (
    <motion.div
      initial={{ x: "-200%" }}
      animate={{ x: isCodeReviewOpen ? 0 : "-200%" }}
      transition={{ duration: 0.6 }}
      className="absolute z-40 left-full top-0 h-full w-96 bg-dark-navy border-r border-gray-800 flex flex-col"
    >
      {/* Drawer Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">AI Code Assistant</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Ready to analyze</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              title="Clear chat"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsCodeReviewOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Review Mode Selector */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4 text-teal" />
            <span className="text-sm font-medium text-white">Review Mode</span>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar pb-2">
            {reviewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveReviewMode(mode.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeReviewMode === mode.id
                    ? `${mode.color.split(" ")[2]} text-white`
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <mode.icon className="h-3 w-3" />
                {mode.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat Messages */}
      <div className="flex-1 overflow-y-auto scrollbar p-4 space-y-4">
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-xl p-4 bg-gray-800 text-white rounded-bl-none border-l-4 border-teal">
            {/* Message Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded">
                  <Bot className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-medium">AI Assistant</span>
                <span className="text-xs text-gray-400">just now</span>
              </div>

              <button
                onClick={() =>
                  handleCopyMessage(
                    "Hello 👋 I am your AI assistant. Paste your code and I will review it."
                  )
                }
                className="p-1 text-gray-400 hover:text-white"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>

            {/* Message Content */}
            <div className="text-sm whitespace-pre-wrap">
              Hello 👋 I am your **AI Assistant**. You can paste your code, ask
              questions, or request improvements. I will analyze it and give you
              clear suggestions 🚀
            </div>
          </div>
        </div>

        {allMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-4 ${
                message.role === "user"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-br-none"
                  : "bg-gray-800 text-white rounded-bl-none border-l-4 border-teal"
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {message.role === "assistant" ? (
                    <div className="p-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <div className="p-1 bg-gray-700 rounded">
                      <User className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <span className="text-xs font-medium">
                    {message.role === "assistan" ? "AI Assistant" : "You"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {message.timestamp}
                  </span>
                </div>
                <button
                  onClick={() => handleCopyMessage(message.content)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>

              {/* Message Content */}
              <div className="text-sm whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isAiLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-xl rounded-bl-none bg-gray-800 border-l-4 border-teal p-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-teal border-t-transparent"></div>
                <div>
                  <p className="text-sm text-white">Analyzing your code...</p>
                  <p className="text-xs text-gray-400">
                    Checking for issues and improvements
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        {/* Quick Prompts */}
        {/* <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Quick Prompts</span>
            <span className="text-xs text-gray-500">{quickPrompts?.length}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleAiReview(prompt)}
                disabled={isAiLoading || !codeEditorCurrentValue?.trim()}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div> */}

        {/* Input Field */}
        <div className="relative">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask AI about your code..."
            className="w-full h-20 p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none placeholder-gray-500 text-sm"
            disabled={isAiLoading}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="p-2 text-gray-400 hover:text-white"
              title="Clear chat"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleReviewCode()}
              disabled={
                isAiLoading ||
                (!userInput?.trim() && !codeEditorCurrentValue?.trim())
              }
              className={`p-2 rounded-lg ${
                isAiLoading ||
                (!userInput?.trim() && !codeEditorCurrentValue?.trim())
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg"
              }`}
            >
              {isAiLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Current code: {codeEditorCurrentValue?.length || 0} chars</span>
          <span>Ctrl+Enter to send</span>
        </div>
      </div>
    </motion.div>
  );
};
