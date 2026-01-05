import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { DB_URL } from "../../utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Particles from "../../components/Particles";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { ArrowLeft, BookOpen, User } from "lucide-react";
import { motion } from "framer-motion";

const JoinSession = () => {
  const [allSession, setallSession] = useState([]);
  const [roomId, setroomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const res = await axios.get(DB_URL + "/session/get-all");
      setallSession(res.data);
    };

    getSession();
  }, []);
  return (
    <>
      <>
        <Toaster position="top-right"></Toaster>

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
                        Join Learning Session
                      </p>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <p className="text-gray-300 font-semibold mt-4">
                    Enter session code or browse available sessions to
                  </p>
                  <p className="text-gray-300 font-semibold ">
                    join your virtual classroom
                  </p>
                </motion.div>
              </div>

              <div className="grid mt-12 grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 h-min rounded-2xl p-8 border border-gray-700">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Join with Code
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    Enter the session code provided by your teacher
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-white text-lg font-semibold mb-3">
                        Session Code
                      </label>
                      <div className="bg-gray-750 border border-gray-600 rounded-xl p-4 text-white text-xl text-center font-mono tracking-widest">
                        <input
                          value={roomId}
                          onChange={(e) => setroomId(e.target.value)}
                          className="w-full h-full bg-transparent outline-none"
                          type="text"
                        />
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        const res = await axios.get(
                          DB_URL + `/session/${roomId}`
                        );
                        console.table(res.data);
                        if (!res?.data?.success) {
                          toast.error(res?.data?.message);
                          return;
                        } else {
                          toast.success(res.data?.message);
                        }

                        navigate(`/room/${roomId}`);
                      }}
                      className="w-full bg-purple-600 text-white text-xl font-semibold py-4 rounded-xl hover:bg-purple-700 transition-colors duration-200 mt-6"
                    >
                      Join Session
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 mb-8 rounded-2xl p-8 border border-gray-700">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Available Sessions
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    Browse and join public sessions
                  </p>

                  <div className="space-y-4">
                    {allSession?.map((sess) => {
                      return (
                           <div className="bg-gray-750 bg-dark-navy rounded-xl p-6 border min-w-[500px] border-gray-600 hover:border-purple-500 transition-colors duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white flex items-center gap-2 text-xl font-semibold mb-2">
                          {/* <TvMinimalPlay size={20} />  */}
                          {sess?.sessionInfo?.title}
                        </h3>
                        <p className="text-gray-400 flex gap-2 items-center text-sm">
                          <User size={20} /> {sess?.createdBy?.name}
                        </p>
                      </div>
                      {!sess?.ended && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Live
                        </span>
                      )}
                      {sess?.ended && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Ended
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen />{" "}
                        <span className="z-50">
                          {sess?.sessionInfo?.gradeLevel}
                          {sess?.sessionInfo?.gradeLevel == "primary" &&
                            "Grades 1 – 5 "}
                          {sess?.sessionInfo?.gradeLevel == "middle" &&
                            "Grades 6 – 8 "}
                          {sess?.sessionInfo?.gradeLevel == "secondary" &&
                            "Grades 9 – 10 "}
                          {sess?.sessionInfo?.gradeLevel ==
                            "senior-secondary" && "Grades 11 – 12 "}
                        </span>
                      </div>
                      <span className="text-purple-400 font-semibold">
                        {sess?.roomId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                      <span className="text-purple-400 font-semibold">
                        {sess?.sessionInfo?.description}
                      </span>
                    </div>

                    {sess?.ended ? (
                      <button className="w-full bg-gray-500 text-white py-3 rounded-lg  transition-colors duration-200 font-semibold">
                        Session Ended
                      </button>
                    ) : (
                      <Link to={`/room/${sess?.roomId}`}>
                        <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
                          Join Session
                        </button>
                      </Link>
                    )}
                  </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ResponsiveContainer>

            <Footer></Footer>
          </div>
        </div>
      </>
    </>
  );
};

export default JoinSession;
