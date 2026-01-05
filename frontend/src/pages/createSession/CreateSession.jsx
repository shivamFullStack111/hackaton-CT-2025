/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { toast, Toaster } from "react-hot-toast";
import { createRoomID } from "../../utils";
import { DB_URL } from "../utils";
import axios from "axios";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { ArrowLeft } from "lucide-react";
import Particles from "../../components/Particles";

const CreateSession = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [sessionInfo, setsessionInfo] = useState({
    title: "",
    description: "",
    subject: "",
    gradeLevel: "",
  });

  const [sessionSetting, setsessionSetting] = useState({
    duration: 30,
    maxParticipants: 50,
  });

  const [privacySetting, setprivacySetting] = useState({
    isPrivate: false,
    password: "",
  });

  const [sessionFeatures, setsessionFeatures] = useState({
    liveChat: true,
    whiteboard: true,
    codeEditor: false,
    aiCodeReview: false,
    recording: false,
  });
  const onSessionCreate = async () => {
    // Validation
    if (!sessionInfo.title) return toast.error("Session title is required");
    if (!sessionInfo.subject) return toast.error("Subject is required");
    if (!sessionInfo.gradeLevel) return toast.error("Grade level is required");
    if (privacySetting.isPrivate && !privacySetting.password)
      return toast.error("Password is required for private session");

    const roomId = createRoomID();

    const payload = {
      roomId,
      sessionInfo,
      sessionSetting,
      privacySetting,
      sessionFeatures,
      userId: user?._id, // later we will assign this userid in backend for more efficiency
    };

    try {
      const res = await axios.post(`${DB_URL}/session/create`, payload);
      if (res.data.success) {
        toast.success("Session created successfully!");
        navigate(`/room/${roomId}`);
      } else {
        toast.error(res.data.message || "Failed to create session");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };
  return (
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
                      Create New Teaching Session
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
                  Set up your virtual classroom with interactive tools and
                  collaborative features
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 mt-12 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">
                      Session Information
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-white text-lg font-semibold mb-3">
                          Session Title
                        </label>
                        <div className="bg-gray-750 border border-gray-600 rounded-xl p-4 text-white text-lg">
                          <input
                            onChange={(e) =>
                              setsessionInfo((p) => ({
                                ...p,
                                title: e.target.value,
                              }))
                            }
                            value={sessionInfo?.title}
                            className="outline-none bg-transparent h-full w-full text-gray-300"
                            type="text"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white text-lg font-semibold mb-3">
                          Description
                        </label>
                        <div className="bg-gray-750 border border-gray-600 rounded-xl p-4 text-white text-lg h-32">
                          <textarea
                            onChange={(e) =>
                              setsessionInfo((p) => ({
                                ...p,
                                description: e.target.value,
                              }))
                            }
                            value={sessionInfo?.description}
                            className="outline-none bg-transparent h-full w-full text-gray-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white text-lg font-semibold mb-3">
                            Subject
                          </label>
                          <div className="bg-gray-750 border border-gray-600 rounded-xl p-4 text-white text-lg">
                            <input
                              onChange={(e) =>
                                setsessionInfo((p) => ({
                                  ...p,
                                  subject: e.target.value,
                                }))
                              }
                              value={sessionInfo?.subject}
                              className="outline-none bg-transparent h-full w-full text-gray-300"
                              type="text"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-white text-lg font-semibold mb-3">
                            Grade Level
                          </label>
                          <div className="bg-gray-750 border border-gray-600 rounded-xl p-4 text-white text-lg">
                            <select
                              onChange={(e) =>
                                setsessionInfo((p) => ({
                                  ...p,
                                  gradeLevel: e.target.value,
                                }))
                              }
                              value={sessionInfo?.gradeLevel || ""}
                              className="outline-none bg-transparent !bg-dark-purple text-gray-300 opacity-80 h-full w-full "
                            >
                              <option value="" disabled>
                                Select Grade Level
                              </option>

                              <option value="primary">
                                Grades 1 – 5 (Primary)
                              </option>
                              <option value="middle">
                                Grades 6 – 8 (Middle School)
                              </option>
                              <option value="secondary">
                                Grades 9 – 10 (Secondary)
                              </option>
                              <option value="senior-secondary">
                                Grades 11 – 12 (Senior Secondary)
                              </option>
                              <option value="college">
                                College / University
                              </option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Session Features
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-white text-lg">Live Chat</div>
                      <div
                        style={{
                          backgroundColor: sessionFeatures?.liveChat
                            ? "#9333ea"
                            : "transparent",
                        }}
                        onClick={() =>
                          setsessionFeatures((p) => ({
                            ...p,
                            liveChat: p?.liveChat ? !p.liveChat : true,
                          }))
                        }
                        className="w-12 h-6 border cursor-pointer bg-purple-600 rounded-full flex items-center "
                      >
                        <motion.div
                          initial={{
                            x: sessionFeatures?.liveChat ? 19 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          animate={{
                            x: sessionFeatures?.liveChat ? 19 : 0,
                          }}
                          className="w-5 h-5 bg-white rounded-full mr-1 ml-1"
                        ></motion.div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-white text-lg">Whiteboard</div>
                      <div
                        style={{
                          backgroundColor: sessionFeatures?.whiteboard
                            ? "#9333ea"
                            : "transparent",
                        }}
                        onClick={() => toast.error("Whiteboard is required")}
                        className="w-12 h-6 border cursor-pointer bg-purple-600 rounded-full flex items-center "
                      >
                        <motion.div
                          initial={{
                            x: sessionFeatures?.whiteboard ? 19 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          animate={{
                            x: sessionFeatures?.whiteboard ? 19 : 0,
                          }}
                          className="w-5 h-5 bg-white rounded-full mr-1 ml-1"
                        ></motion.div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-white text-lg">Code Editor</div>
                      <div
                        style={{
                          backgroundColor: sessionFeatures?.codeEditor
                            ? "#9333ea"
                            : "transparent",
                        }}
                        onClick={() =>
                          setsessionFeatures((p) => ({
                            ...p,
                            codeEditor: p?.codeEditor ? !p.codeEditor : true,
                          }))
                        }
                        className="w-12 h-6 border cursor-pointer bg-purple-600 rounded-full flex items-center "
                      >
                        <motion.div
                          initial={{
                            x: sessionFeatures?.codeEditor ? 19 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          animate={{
                            x: sessionFeatures?.codeEditor ? 19 : 0,
                          }}
                          className="w-5 h-5 bg-white rounded-full mr-1 ml-1"
                        ></motion.div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-white text-lg">AI Code Review</div>
                      <div
                        style={{
                          backgroundColor: sessionFeatures?.aiCodeReview
                            ? "#9333ea"
                            : "transparent",
                        }}
                        onClick={() =>
                          setsessionFeatures((p) => ({
                            ...p,
                            aiCodeReview: p?.aiCodeReview
                              ? !p.aiCodeReview
                              : true,
                          }))
                        }
                        className="w-12 h-6 border cursor-pointer bg-purple-600 rounded-full flex items-center "
                      >
                        <motion.div
                          initial={{
                            x: sessionFeatures?.aiCodeReview ? 19 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          animate={{
                            x: sessionFeatures?.aiCodeReview ? 19 : 0,
                          }}
                          className="w-5 h-5 bg-white rounded-full mr-1 ml-1"
                        ></motion.div>
                      </div>
                    </div>

                    {/* <div className="flex items-center justify-between">
                                        <div className="text-white text-lg">Session Recording</div>
                                        <div style={{ backgroundColor: sessionFeatures?.recording ? '#9333ea' : "transparent" }} onClick={() => setsessionFeatures(p => ({ ...p, recording: p?.recording ? !p.recording : true }))} className="w-12 h-6 border cursor-pointer bg-purple-600 rounded-full flex items-center ">
                                            <motion.div initial={{ x: sessionFeatures?.recording ? 19 : 0 }} transition={{ duration: 0.2 }} animate={{ x: sessionFeatures?.recording ? 19 : 0 }} className="w-5 h-5 bg-white rounded-full mr-1 ml-1"></motion.div>
                                        </div>
                                    </div> */}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Quick Actions
                  </h2>

                  <div className="space-y-4">
                    <button
                      onClick={onSessionCreate}
                      className="w-full bg-purple-600 text-white text-lg font-semibold py-4 rounded-xl hover:bg-purple-700 transition-colors duration-200"
                    >
                      Create Session
                    </button>

                    {/* <button className="w-full bg-gray-700 text-white text-lg font-semibold py-4 rounded-xl border border-gray-600 hover:bg-gray-600 transition-colors duration-200">
                                        Save as Template
                                    </button>

                                    <button className="w-full bg-gray-700 text-white text-lg font-semibold py-4 rounded-xl border border-gray-600 hover:bg-gray-600 transition-colors duration-200">
                                        Import Settings
                                    </button> */}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-2xl mb-6 p-6 border border-gray-700 mt-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Session Preview
                  </h2>

                  <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                    <div className="text-white font-semibold text-lg mb-2">
                      Advanced Mathematics
                    </div>
                    <div className="text-gray-400 text-sm mb-3">
                      Calculus Workshop
                    </div>

                    <div className="flex items-center justify-between text-gray-300 text-sm mb-2">
                      <span>Duration:</span>
                      <span>{sessionSetting?.duration || 10} mins</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-300 text-sm mb-2">
                      <span>Participants:</span>
                      <span>{sessionSetting?.maxParticipants || 50}/5000</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-300 text-sm">
                      <span>Status:</span>
                      <span className="text-green-500">Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveContainer>

          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default CreateSession;
