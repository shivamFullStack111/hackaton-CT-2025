import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { DB_URL } from "../../utils";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

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
      <Toaster />
      <Header></Header>
      <div className="min-h-screen bg-dark-purple py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Join Learning Session
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enter session code or browse available sessions to join your
              virtual classroom
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
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
                    const res = await axios.get(DB_URL + `/session/${roomId}`);
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

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
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
                          <h3 className="text-white text-xl font-semibold mb-2">
                            {sess?.sessionInfo?.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {sess?.createdBy?.name}
                          </p>
                        </div>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Live
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                        <div className="flex items-center gap-4">
                          <span>🔴 45/50 joined</span>
                        </div>
                        <span className="text-purple-400 font-semibold">
                          {sess?.roomId}
                        </span>
                      </div>

                      <div className="flex gap-2 mb-4">
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          Whiteboard
                        </span>
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          Code Editor
                        </span>
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          Live Chat
                        </span>
                      </div>
                      {/* <Link to={`/room/${sess?.roomId}`}>
                        <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
                          Join Session
                        </button>
                      </Link> */}

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
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default JoinSession;
