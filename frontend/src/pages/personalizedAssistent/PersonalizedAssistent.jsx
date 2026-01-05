

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

import UserDetailPopUp from "./UserDetailPopUp";
import UserDetailBlock from "./UserDetailBlock";
import ConversationBlock from "./ConversationBlock";
import { useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Particles from "../../components/Particles";
import ResponsiveContainer from "../../components/ResponsiveContainer";

const PersonalAIAssistant = () => {
  const [isLoading, setisLoading] = useState(true);
  const [userData, setuserData] = useState({
    userId: "",
    fullName: "",
    age: "",
    currentlyPursuing: "",
    careerInterest: "",
    strongSubjects: "",
    areasOfImprovement: "",
    learningPreferences: "",
    weeklyStudyTime: "",
  });

  useEffect(() => {
    try {
      const getUserProfile = async () => {
        const res = await axios.get(
          `http://localhost:8888/api/user-profile/get-profile/${
            JSON.parse(localStorage.getItem("user"))._id
          }`
        );
        if (res?.data?.success) {
          setuserData(res?.data?.profile);
        }
      };
      getUserProfile();
    } catch (error) {
      console.log(error.message);
    } finally {
      setisLoading(false);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen relative w-full flex bg-gray-900">
        {/* Background Particles */}
        <Particles
          className={"h-screen fixed top-0 z-20 right-0 w-full "}
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={300}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          alphaParticles={false}
          disableRotation={true}
        />

        <div className="w-full ">
          <Header />

          <ResponsiveContainer className={""}>
            {isLoading && <LoadingSpinner></LoadingSpinner>}

            {/* Popup UI only */}
            {!isLoading && (
              <UserDetailPopUp
                userData2={userData}
                setuserData2={setuserData}
              />
            )}

            <div className="min-h-screen  bg-gray-900 py-8  sm:px-6">
              <div className="max-w-7xl flex flex-col mx-auto">
                <div className="z-20 mb-12">
                  <div className="flex  items-center gap-4">
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
                        Personalized AI Assistant
                      </p>
                    </motion.div>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-300 font-semibold mt-4">
                      Your intelligent companion for personalized
                    </p>
                    <p className="text-gray-300 font-semibold ">
                      learning guidance and career path recommendations
                    </p>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                  {/* User Profile Panel */}
                  <UserDetailBlock userData={userData} />

                  {/* Conversation UI only — no logic */}
                  <ConversationBlock userData={userData} messages={[]} />
                </div>
              </div>
            </div>
          </ResponsiveContainer>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PersonalAIAssistant;
