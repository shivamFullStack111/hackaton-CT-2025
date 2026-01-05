import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  AlertCircle,
  Home,
  Users,
  Calendar,
  MessageSquare,
  Share2,
  RefreshCw,
  Star,
  X,
  Send,
  Smile,
  Frown,
  Meh,
} from "lucide-react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { formatDuration, intervalToDuration } from "date-fns";
import axios from "axios";

const SessionEndedByHostOverlay = ({ isHost = false, roomData, user }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  
  const navigate = useNavigate()

  // Only show for non-hosts
  if (isHost) return null;

  // const handleFeedbackSubmit = async () => {
  //   try {
  //     const res = await axios.post(
  //       `http://localhost:8888/api/session/${roomData?._id}/add-feedback`,
  //       {
  //         feedback,
  //         rating,
  //         userId: user?._id,
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating before submitting");
      return;
    }

    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", {
      rating,
      feedback,
      emotion: selectedEmotion,
    });

    try {
      const res = await axios.post(
        `http://localhost:8888/api/session/${roomData?._id}/add-feedback`,
        {
          feedbackMessage: feedback,
          rating,
          userId: user?._id,
        }
      );

      if (res?.data?.success) {
        setFeedbackSubmitted(true);
        setTimeout(() => {
          navigate("/home")
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const emotionOptions = [
    { icon: Smile, label: "Happy", value: "happy", color: "text-green-400" },
    { icon: Meh, label: "Neutral", value: "neutral", color: "text-yellow-400" },
    {
      icon: Frown,
      label: "Disappointed",
      value: "disappointed",
      color: "text-red-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-gray-900/95  backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="h-[95vh] overflow-y-auto scrollbar">
        <AnimatePresence mode="wait">
          {showFeedbackForm ? (
            <FeedbackForm
              emotionOptions={emotionOptions}
              feedback={feedback}
              feedbackSubmitted={feedbackSubmitted}
              handleFeedbackSubmit={handleFeedbackSubmit}
              handleRatingClick={handleRatingClick}
              hoverRating={hoverRating}
              rating={rating}
              selectedEmotion={selectedEmotion}
              setFeedback={setFeedback}
              setHoverRating={setHoverRating}
              setSelectedEmotion={setSelectedEmotion}
              setShowFeedbackForm={setShowFeedbackForm}
              key="feedback"
            />
          ) : (
            <MainOverlay
              getDuration={getDuration}
              setShowFeedbackForm={setShowFeedbackForm}
              key="main"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal/20 via-purple-600/20 to-red-500/20"></div>
      </div>
    </motion.div>
  );
};

export default SessionEndedByHostOverlay;

// Main Overlay Component
const MainOverlay = ({ setShowFeedbackForm, getDuration }) => (
  <motion.div
    initial={{ scale: 0.9, y: 20, opacity: 0 }}
    animate={{ scale: 1, y: 0, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    className="bg-dark-navy border h-[95vh] border-gray-800 rounded-2xl max-w-md w-full p-8 text-center"
  >
    {/* Icon */}
    <div className="mb-6 flex justify-center">
      <div className="h-20 w-20 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
        <AlertCircle className="h-10 w-10 text-white" />
      </div>
    </div>

    {/* Title */}
    <h2 className="text-3xl font-bold text-white mb-3">Session Ended</h2>

    {/* Message */}
    <p className="text-gray-300 mb-6">
      The host has ended this session. Thank you for participating!
    </p>

    {/* Session Stats */}
    <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-teal" />
            <span className="text-white font-semibold">{getDuration()}</span>
          </div>
          <span className="text-xs text-gray-400">Duration</span>
        </div>
        {/* <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="h-4 w-4 text-purple-400" />
            <span className="text-white font-semibold">24</span>
          </div>
          <span className="text-xs text-gray-400">Participants</span>
        </div> */}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="space-y-3">
      <Link
        to="/dashboard"
        className="w-full py-3 bg-gradient-to-r from-teal to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <Home className="h-4 w-4" />
        Go to Dashboard
      </Link>

      <Link
        to="/join-session"
        className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Calendar className="h-4 w-4" />
        Join Another Session
      </Link>

      <button
        onClick={() => setShowFeedbackForm(true)}
        className="w-full py-3 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share Feedback
      </button>
    </div>

    {/* Footer Note */}
    <p className="text-gray-500 text-sm mt-6">
      Want to create your own sessions?
      <Link
        to="/create-session"
        className="text-teal hover:text-teal/80 ml-1 font-medium"
      >
        Become a host
      </Link>
    </p>
  </motion.div>
);

// Feedback Form Component
const FeedbackForm = ({
  setShowFeedbackForm,
  feedbackSubmitted,
  handleFeedbackSubmit,
  handleRatingClick,
  setHoverRating,
  hoverRating,
  rating,
  emotionOptions,
  setSelectedEmotion,
  selectedEmotion,
  feedback,
  setFeedback,
}) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    className="bg-dark-navy min-w-[460px] border border-gray-800 rounded-2xl max-w-md w-full p-8"
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-bold text-white">Share Your Feedback</h3>
      <button
        onClick={() => setShowFeedbackForm(false)}
        className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
      >
        <X className="h-5 w-5" />
      </button>
    </div>

    {feedbackSubmitted ? (
      <div className="text-center py-8">
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-teal flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-white" />
        </div>
        <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
        <p className="text-gray-300">Your feedback has been submitted.</p>
      </div>
    ) : (
      <form onSubmit={handleFeedbackSubmit}>
        {/* Rating Stars */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-3">
            How would you rate this session?
          </label>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transform hover:scale-110 transition-transform"
              >
                <Star
                  className={`h-10 w-10 ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Emotion Selector */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-3">
            How did you feel about this session?
          </label>
          <div className="flex justify-center gap-4">
            {emotionOptions.map((emotion) => (
              <button
                key={emotion.value}
                type="button"
                onClick={() => setSelectedEmotion(emotion.value)}
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                  selectedEmotion === emotion.value
                    ? `border-teal bg-teal/10 ${emotion.color}`
                    : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300"
                }`}
              >
                <emotion.icon
                  className={`h-8 w-8 mb-2 ${
                    selectedEmotion === emotion.value ? emotion.color : ""
                  }`}
                />
                <span className="text-sm">{emotion.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Textarea */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Additional comments (optional)
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What did you like? What could be improved?"
            className="w-full h-32 p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none placeholder-gray-500"
            maxLength={500}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {feedback.length}/500 characters
          </div>
        </div>

        {/* Feedback Categories */}
        {/* <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            What stood out most?
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              "Content Quality",
              "Host Knowledge",
              "Interactive",
              "Well Organized",
              "Technical Issues",
              "Too Fast",
              "Too Slow",
            ].map((category) => (
              <button
                key={category}
                type="button"
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={rating === 0}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
            rating === 0
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-teal to-purple-600 text-white hover:shadow-lg"
          }`}
        >
          <Send className="h-4 w-4" />
          Submit Feedback
        </button>
      </form>
    )}
  </motion.div>
);
