import EmojiPicker from "emoji-picker-react";

import React, { useState, useEffect, useRef } from "react";
import { IoExitOutline } from "react-icons/io5";
import { MdQuiz, MdOutlineDraw, MdOutlineCode } from "react-icons/md";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  MessageSquare,
  Send,
  Users,
  X,
  Copy,
  Smile,
  Paperclip,
  Search,
  Pin,
  Filter,
  Crown,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const SidebarRight = ({
  currentPage,
  setcurrentPage,
  handleSendMessage,
  allLiveChatMessages = [],
  setallLiveChatMessages,
  roomData,
}) => {
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [activeReaction, setActiveReaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { user } = useSelector((state) => state.user || {});
  const [emojiOpen, setemojiOpen] = useState(false);

  // Safe access with fallbacks
  const sessionFeatures = roomData?.sessionFeatures || {};
  const participants = Array.isArray(roomData?.participants)
    ? roomData.participants
    : [];
  const isTeacher = user?._id === roomData?.createdBy?._id;

  // Reactions for messages
  const reactions = ["👍", "❤️", "😂", "😮", "😢", "👏"];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && isLiveChatOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allLiveChatMessages, isLiveChatOpen]);

  // Handle sending message
  const handleSendChatMessage = () => {
    if (!inputValue.trim() || !user?._id) {
      toast.error("Please enter a message");
      return;
    }

    const newMessage = {
      sender: {
        _id: user._id,
        name: user.name || "User",
        isTeacher,
      },
      message: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reactions: {},
    };

    // Call parent handler if provided
    if (handleSendMessage) {
      handleSendMessage(user._id, inputValue);
      setemojiOpen(false);
    }

    // Update local state
    if (setallLiveChatMessages) {
      setallLiveChatMessages((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return [...prevArray, newMessage];
      });
    }

    setInputValue("");
    toast.success("Message sent!");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChatMessage();
    }
  };

  // Handle reaction to message
  const handleAddReaction = (messageIndex, reaction) => {
    const updatedMessages = [
      ...(Array.isArray(allLiveChatMessages) ? allLiveChatMessages : []),
    ];
    if (updatedMessages[messageIndex]) {
      if (!updatedMessages[messageIndex].reactions) {
        updatedMessages[messageIndex].reactions = {};
      }
      if (!updatedMessages[messageIndex].reactions[reaction]) {
        updatedMessages[messageIndex].reactions[reaction] = [];
      }
      updatedMessages[messageIndex].reactions[reaction].push(
        user?._id || "user"
      );
      setallLiveChatMessages(updatedMessages);
      setActiveReaction(null);
    }
  };

  // Handle pin message
  const handlePinMessage = (messageIndex) => {
    const message = allLiveChatMessages[messageIndex];
    if (message && !pinnedMessages.some((m) => m.message === message.message)) {
      setPinnedMessages((prev) => [
        ...prev,
        { ...message, pinnedAt: new Date() },
      ]);
      toast.success("Message pinned!");
    }
  };

  // Handle copy message
  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Filter messages based on search
  const filteredMessages = Array.isArray(allLiveChatMessages)
    ? allLiveChatMessages.filter(
        (msg) =>
          msg?.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg?.sender?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Navigation items with proper conditional rendering
  const navItems = [
    {
      id: "whiteboard",
      icon: MdOutlineDraw,
      label: "Whiteboard",
      active: currentPage === "whiteboard",
      visible: sessionFeatures?.whiteboard,
      onClick: () => setcurrentPage("whiteboard"),
    },
    {
      id: "editor",
      icon: MdOutlineCode,
      label: "Code Editor",
      active: currentPage === "editor",
      visible: sessionFeatures?.codeEditor,
      onClick: () => setcurrentPage("editor"),
    },
    {
      id: "quiz",
      icon: MdQuiz,
      label: "Quiz",
      active: currentPage === "quiz",
      visible: true,
      onClick: () => setcurrentPage("quiz"),
    },
  ].filter((item) => item.visible);

  // Participants list component
  const ParticipantsList = () => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-teal" />
          <span className="text-sm font-medium text-white">
            Participants ({participants.length})
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-500" />
      </div>
      <div className="space-y-2">
        {participants.slice(0, 3).map((participant, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50"
          >
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-teal flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {participant?.name?.charAt(0) || "U"}
                </span>
              </div>
              {participant?._id === roomData?.createdBy?._id && (
                <div className="absolute -top-1 -right-1">
                  <Crown className="h-3 w-3 text-yellow-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-white truncate">
                {participant?.name || "Unknown User"}
                {participant?._id === roomData?.createdBy?._id && " 👑"}
              </p>
              <p className="text-xs text-gray-400">Active now</p>
            </div>
          </div>
        ))}
        {participants.length > 3 && (
          <div className="text-center">
            <button className="text-sm text-teal hover:text-teal/80">
              + {participants.length - 3} more
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Session Stats Component
  const SessionStats = () => (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="h-4 w-4 text-teal" />
        <span className="text-sm font-medium text-white">Session Stats</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-800/50 p-2 rounded-lg">
          <div className="text-lg font-bold text-white">
            {allLiveChatMessages.length}
          </div>
          <div className="text-xs text-gray-400">Messages</div>
        </div>
        <div className="bg-gray-800/50 p-2 rounded-lg">
          <div className="text-lg font-bold text-teal">
            {participants.length}
          </div>
          <div className="text-xs text-gray-400">Participants</div>
        </div>
      </div>
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
      {showExitModal && (
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
      )}

      {/* Main Sidebar Container */}
      <div className="flex h-full relative">
        {/* Right Sidebar */}
        <div
          className={`flex flex-col h-full bg-dark-navy border-l border-gray-800 transition-all duration-300 ${
            isSidebarCollapsed ? "w-16" : "w-20"
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-3 border-b border-gray-800 text-gray-400 hover:text-white"
          >
            {isSidebarCollapsed ? (
              <ChevronLeft className="h-5 w-5 mx-auto" />
            ) : (
              <ChevronRight className="h-5 w-5 mx-auto" />
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
                  {!isSidebarCollapsed && (
                    <span className="text-xs mt-1">{item.label}</span>
                  )}
                </div>
                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.label}
                  </div>
                )}
              </button>
            ))}

            {/* Live Chat Button */}
            {sessionFeatures?.liveChat && (
              <button
                onClick={() => setIsLiveChatOpen(true)}
                className={`relative group w-full p-4 ${
                  isLiveChatOpen
                    ? "text-teal"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Live Chat"
              >
                <div className="flex flex-col items-center">
                  <MessageSquare className="h-5 w-5" />
                  {!isSidebarCollapsed && (
                    <>
                      <span className="text-xs mt-1">Chat</span>
                      {allLiveChatMessages.length > 0 && (
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {allLiveChatMessages.length}
                        </span>
                      )}
                    </>
                  )}
                </div>
                {isSidebarCollapsed && allLiveChatMessages.length > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {allLiveChatMessages.length}
                  </span>
                )}
                {/* Tooltip for collapsed state */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Live Chat
                    {allLiveChatMessages.length > 0 &&
                      ` (${allLiveChatMessages.length})`}
                  </div>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Live Chat Drawer */}
        <motion.div
          initial={{ x: "200%" }}
          animate={{ x: isLiveChatOpen ? 0 : "200%" }}
          transition={{ duration: 0.6 }}
          className="absolute right-full z-40 top-0 h-full w-96 bg-dark-navy border-l border-gray-800 flex flex-col"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-teal to-purple-600 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Live Chat</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">
                      {participants.length} active •{" "}
                      {allLiveChatMessages.length} messages
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsLiveChatOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search and Filter */}
            <div className="mt-4 flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                <Filter className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Pinned Messages */}
            {pinnedMessages.length > 0 && (
              <div className="mt-3 p-3 bg-gray-900/50 rounded-lg border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Pin className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">
                    Pinned Messages
                  </span>
                </div>
                {pinnedMessages.slice(0, 2).map((msg, idx) => (
                  <div key={idx} className="text-xs text-gray-300 truncate">
                    {msg.sender?.name}: {msg.message}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto scrollbar p-4 space-y-4">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender?._id === user?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-3 ${
                      msg.sender?._id === user?._id
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-br-none"
                        : "bg-gray-800 text-white rounded-bl-none"
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {msg.sender?._id !== user?._id && (
                          <div className="flex items-center gap-1">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-teal to-purple-600 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {msg.sender?.name?.charAt(0) || "U"}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-medium ${
                                msg.sender?.isTeacher
                                  ? "text-yellow-400"
                                  : "text-teal"
                              }`}
                            >
                              {msg.sender?.name || "User"}
                              {msg.sender?.isTeacher && " 👑"}
                            </span>
                          </div>
                        )}
                        <span className="text-xs text-gray-400 ml-2">
                          {msg.timestamp || "Just now"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handlePinMessage(index)}
                          className="p-1 text-gray-400 hover:text-yellow-400"
                          title="Pin message"
                        >
                          <Pin className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleCopyMessage(msg.message)}
                          className="p-1 text-gray-400 hover:text-white"
                          title="Copy message"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Message Content */}
                    <p className="text-sm mb-2">{msg.message}</p>

                    {/* Reactions */}
                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {Object.entries(msg.reactions).map(
                          ([reaction, users]) => (
                            <button
                              key={reaction}
                              className="px-2 py-1 bg-gray-900/50 rounded-full text-xs flex items-center gap-1"
                            >
                              <span>{reaction}</span>
                              <span className="text-gray-400">
                                {users.length}
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    )}

                    {/* Reaction Picker */}
                    <div className="mt-2 pt-2 border-t border-gray-700/50">
                      <div className="flex items-center gap-1">
                        {reactions.map((reaction) => (
                          <button
                            key={reaction}
                            onClick={() => handleAddReaction(index, reaction)}
                            className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                          >
                            {reaction}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <MessageSquare className="h-12 w-12 text-gray-600 mb-3" />
                <h4 className="text-white font-medium mb-2">No messages yet</h4>
                <p className="text-gray-400 text-sm">
                  {searchQuery
                    ? "No messages match your search"
                    : "Start the conversation!"}
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {emojiOpen && (
            <EmojiPicker
              onEmojiClick={(e) => setInputValue((p) => p + e.emoji)}
            ></EmojiPicker>
          )}
          {/* Input Area */}
          <div className="border-t border-gray-800 p-4">
            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full h-20 p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none placeholder-gray-500 text-sm"
              />
              <div className="absolute  bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => setemojiOpen((p) => !p)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <Smile className="h-4 w-4" />
                </button>

                <button className="p-2 text-gray-400 hover:text-white">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSendChatMessage}
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-lg ${
                    !inputValue.trim()
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-teal to-purple-600 text-white hover:shadow-lg"
                  }`}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Press Enter to send • Shift+Enter for new line</span>
              <span>{inputValue.length}/500</span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SidebarRight;
