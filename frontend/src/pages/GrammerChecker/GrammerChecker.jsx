import React, { useState } from "react";
import { Zap, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Particles from "../../components/Particles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import ConversationBox from "./ConversationBox";
import { motion } from "framer-motion";

const GrammarChecker = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      corrected_text:
        "Hello! I'm your AI grammar assistant. Paste or type any text below, and I'll help you improve it.",
      timestamp: "10:00 AM",
      corrections: [],
    },
  ]);

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        corrected_text:
          "Hello! I'm your AI grammar assistant. Paste or role any text below and I'll help you improve it.",
        timestamp: "10:00 AM",
        corrections: [],
      },
    ]);
  };

  return (
    <div className="min-h-screen relative w-full flex bg-gray-900">
      {/* Background Particles */}
      <Particles
        className={"h-screen fixed top-0 right-0 w-full "}
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={300}
        particleSpread={10}
        speed={0.3}
        particleBaseSize={100}
        alphaParticles={false}
        disableRotation={true}
      />

      <div className="w-full z-10">
        <Header />

        <ResponsiveContainer>
          {/* Back Button and Header */}
          <div className="w-full my-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Link
                  to="/home"
                  className="p-2 rounded-lg bg-dark-navy hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="text-white h-5 w-5" />
                </Link>
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-white "
                >
                  <p className="text-white text-4xl font-bold">
                    {" "}
                    Grammar Checker
                  </p>
                </motion.div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClearChat}
                  className="p-2 px-4 rounded-lg bg-dark-navy text-gray-300 font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear Chat
                </button>
                <div className="p-2 px-4 rounded-lg bg-purple-600 text-white font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Premium
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-gray-300 font-semibold mt-4">
                Eliminate errors and enhance your impact, every time you write.
              </p>
              <p className="text-gray-300 font-semibold mt-1">
                Improve your grammar with AI assistance
              </p>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* chat box  */}
            <ConversationBox messages={messages} setMessages={setMessages} />
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
            <p>
              Grammar Checker uses advanced AI to analyze and improve your
              writing. Results may vary based on text complexity.
            </p>
          </div>
        </ResponsiveContainer>

        <Footer />
      </div>
    </div>
  );
};

export default GrammarChecker;
