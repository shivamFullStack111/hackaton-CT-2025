import axios from "axios";
import React, { useEffect, useState } from "react";
import { DB_URL } from "../utils";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LiveRoom from "./LiveRoom";
import PasswordVerification from "./PasswordVerification"; // Import the new component
import SessionEndedOverlay from "./SessionEndedOverlay";
import { useSelector } from "react-redux";

const SecurityCheck_RootPage = () => {
  const [roomData, setroomData] = useState();
  const [isLoadingRoomData, setisLoadingRoomData] = useState(true);
  const { id: roomId } = useParams();
  const [isVerified, setisVerified] = useState(false);
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  // get session/room data
  useEffect(() => {
    if (!roomId) return;

    const getRoomData = async () => {
      try {
        const res = await axios.get(DB_URL + "/session/" + roomId);
        setroomData(res.data?.session);
        if (!res.data?.session) {
          setroomData(null);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setisLoadingRoomData(false);
      }
    };
    getRoomData();
  }, [roomId, user?._id]);

  useEffect(() => {
    if (!roomData || !user) return;
    if (roomData?.createdBy?._id == user?._id) {
      setisVerified(true);
    }
  }, [user, roomData]);

  const verifyPassword = async () => {
    setisLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8888/api/session/verify-password",
        { roomId: roomData._id, password }
      );

      if (res?.data?.success) {
        setisVerified(true);
        toast.success("Password verified successfully!");
      } else {
        toast.error("Incorrect password");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setisLoading(false);
    }
  };

  // Loading state
  if (isLoadingRoomData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading room information...</p>
        </div>
      </div>
    );
  }



  if (roomData?.ended == true || !roomData)
    return (
      <SessionEndedOverlay
        roomData={roomData}
        isRoomFound={roomData ? true : false}
      />
    );

  // Room not found
  if (roomData === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="p-4 bg-red-500/20 rounded-2xl inline-block mb-4">
            <Shield className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Room Not Found</h1>
          <p className="text-gray-400">
            The requested session does not exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  // Password verification screen for private rooms
  if (roomData?.privacySetting?.isPrivate && !isVerified) {
    return (
      <PasswordVerification
        roomData={roomData}
        password={password}
        setPassword={setpassword}
        verifyPassword={verifyPassword}
        isLoading={isLoading}
      />
    );
  }

  // Live room (either public or verified private room)
  return <LiveRoom />;
};

export default SecurityCheck_RootPage;
