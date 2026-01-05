import React, { useState } from "react";
import { motion } from "framer-motion";
import { intervalToDuration, formatDuration } from "date-fns";
import {
  DoorClosed,
  CalendarX,
  Home,
  Clock,
  Users,
  AlertTriangle,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const SessionEndedOverlay = ({ roomData, isRoomFound }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  // Mock room data if not provided
  const room = roomData || {
    title: "Advanced JavaScript Patterns",
    hostName: "John Doe",
    endedAt: "2024-01-20 14:30",
    duration: "2h 15m",
    participants: 18,
    category: "Programming",
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Here you would send feedback to backend
    console.log("Feedback for ended room:", { rating, feedback });
    setShowFeedback(false);
    setFeedback("");
    setRating(0);
  };

  const getDuration = () => {
    const duration = intervalToDuration({
      start: roomData?.createdAt,
      end: roomData?.endedDateTime,
    });
    const formattedDuration = formatDuration(duration, {
      delimiter: ", ",
      zero: false, // Prevents displaying zero units
      // You might want to customize how it formats based on your exact needs
    });
    return formattedDuration;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        // style={{ height: isRoomFound ? "95vh" : "" }}
        className="bg-dark-navy max-h-[95vh]  scrollbar overflow-y-auto border border-gray-800 rounded-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <DoorClosed className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isRoomFound ? "Session Has Ended!" : "Session doesn't exist!"}
          </h2>
          {isRoomFound && (
            <p className="text-red-100">This session is no longer active</p>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Room Info */}
          {isRoomFound && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3">
                {roomData?.sessionInfo?.title} 
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {roomData.createdBy?.name?.charAt(0) || "H"}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Hosted by</p>
                    <p className="text-white font-medium">
                      {roomData.createdBy?.name || "Unknown Host"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-teal" />
                        <span className="text-white font-semibold">
                          {getDuration()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">Duration</span>
                    </div>
                    {/* <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span className="text-white font-semibold">
                          {roomData.participants}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        Participants
                      </span>
                    </div> */}
                  </div>
                  {roomData.endedDateTime && (
                    <div className="text-center mt-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-900/30 text-red-300 rounded-full text-sm">
                        <CalendarX className="h-3 w-3" />
                        Ended on {roomData.endedDateTime?.slice(0, 10)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Warning Message */}
          {/* <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-300 font-medium mb-1">Unable to join</p>
                <p className="text-yellow-200/80 text-sm">
                  This session has already ended. You can view similar active sessions or provide feedback about what you were hoping to learn.
                </p>
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/home"
              className="w-full py-3 bg-gradient-to-r from-teal to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return to Home
            </Link>

            <Link
              to="/join-session"
              className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Browse Active Sessions
            </Link>

            {/* {isRoomFound && (
              <button
                onClick={() => setShowFeedback(!showFeedback)}
                className="w-full py-3 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                {showFeedback ? "Cancel Feedback" : "Provide Feedback"}
              </button>
            )} */}
          </div>

          {/* Feedback Form */}
          {/* {showFeedback && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-800"
            >
              <h4 className="text-lg font-semibold text-white mb-3">
                What were you hoping to learn?
              </h4>

              <form onSubmit={handleFeedbackSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm mb-2">
                    Your feedback helps us improve
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="I was hoping to learn about..."
                    className="w-full h-24 p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none placeholder-gray-500 text-sm"
                    maxLength={300}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {feedback.length}/300 characters
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 text-sm mb-2">
                    Interest level in this topic
                  </label>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 transform hover:scale-110 transition-transform"
                      >
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            rating >= star
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {star}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Low interest</span>
                    <span>High interest</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFeedback(false)}
                    className="flex-1 py-2 border border-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!feedback.trim()}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                      !feedback.trim()
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-teal to-teal-dark text-white hover:shadow-lg"
                    }`}
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </motion.div>
          )} */}

          {/* Suggested Sessions */}
          {/* {isRoomFound && (
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">
                Similar Active Sessions
              </h4>
              <div className="space-y-2">
                {[
                  {
                    title: "Modern JavaScript ES6+",
                    participants: 12,
                    time: "Starting in 30m",
                  },
                  {
                    title: "React Hooks Workshop",
                    participants: 8,
                    time: "Live Now",
                  },
                  {
                    title: "Web Development Bootcamp",
                    participants: 25,
                    time: "Tomorrow 10 AM",
                  },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-sm font-medium">
                          {session.title}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {session.participants} participants • {session.time}
                        </p>
                      </div>
                      <Link
                        to={`/join-session`}
                        className="px-3 py-1 bg-teal hover:bg-teal/80 text-white text-xs rounded-full"
                      >
                        Join
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </motion.div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-purple-600/20 to-gray-900/20"></div>
      </div>
    </motion.div>
  );
};

export default SessionEndedOverlay;
