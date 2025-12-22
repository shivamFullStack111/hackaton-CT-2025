import React from 'react';
import { useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from "react-hot-toast"
import { Toaster } from "react-hot-toast"
import axios from "axios"
import { useEffect } from 'react';


const UserDetailPopUp = ({ userData2 }) => {
    const [isLoading, setisLoading] = useState(false)
    const [isPopUpOpen, setisPopUpOpen] = useState(false)
    const [userData, setuserData] = useState({
        userId: JSON.parse(localStorage.getItem("user"))._id,
        fullName: '',
        age: '',
        currentlyPursuing: '',
        careerInterest: '',
        strongSubjects: '',
        areasOfImprovement: '',
        learningPreferences: '',
        weeklyStudyTime: '',
    });

    useEffect(() => {
        if (userData2?.fullName && userData2?.age && userData2?.currentlyPursuing && userData2?.careerInterest && userData2?.weeklyStudyTime) {
            setuserData(userData2)
            setisPopUpOpen(false)
        } else {
            setisPopUpOpen(true)
        }
    }, [userData2])

    const handleSubmit = async () => {
        setisLoading(true)
        if (!userData?.fullName) {
            toast.error("Name is Required")
            return setisLoading(false)
        } if (!userData?.age) {
            toast.error("Age is Required")
            return setisLoading(false)
        }
        if (!userData?.currentlyPursuing) {
            toast.error("Currently Pursuing is Required")
            return setisLoading(false)
        }
        if (!userData?.careerInterest) {
            toast.error("Career Goal is Required")
            return setisLoading(false)
        }

        if (!userData?.strongSubjects) {
            toast.error("Strong Subjects is Required")
            return setisLoading(false)
        }

        if (!userData?.areasOfImprovement) {
            toast.error("Areas of Improvement is Required")
            return setisLoading(false)
        }
        if (!userData?.learningPreferences) {
            toast.error("Learning Preferences is Required")
            return setisLoading(false)
        }

        if (!userData?.weeklyStudyTime) {
            toast.error("Weekly Study Time is Required")
            return setisLoading(false)
        }

        const payload = { profile: userData, userId: JSON.parse(localStorage.getItem("user"))._id }

        const res = await axios.post("http://localhost:8888/api/user-profile/initialize-profile", payload)

        console.log(res.data)
        if (!res?.data?.success) {
            toast.error(res?.data?.message)
            return setisLoading(false)
        }

        toast.success(res.data?.message)
        setisLoading(false)
        setisPopUpOpen(false)
    }

    return (
        <div style={{ display: isPopUpOpen ? "flex" : "none" }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Toaster />
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl h-[95vh] overflow-y-auto p-8 border border-purple-500/30 max-w-2xl w-full mx-4 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">AI</span>
                    </div>

                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        Welcome to Your AI Learning Assistant
                    </h2>

                    <p className="text-gray-300 text-lg">
                        Help me understand you better to provide personalized guidance
                    </p>
                </div>

                {/* STATIC FORM - NO LOGIC */}
                <div className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-white text-sm font-semibold mb-3">Full Name *</label>
                            <input
                                onChange={(e) => {
                                    setuserData(p => ({ ...p, fullName: e.target.value }))
                                }}
                                type="text"
                                className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-semibold mb-3">Age</label>
                            <input
                                onChange={(e) => {
                                    setuserData(p => ({ ...p, age: e.target.value }))
                                }}
                                type="number"
                                className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full"
                                placeholder="Your age"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white text-sm font-semibold mb-3">Currently Pursuing</label>
                        <input
                            onChange={(e) => {
                                setuserData(p => ({ ...p, currentlyPursuing: e.target.value }))
                            }}
                            type="text"
                            className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full"
                            placeholder="e.g., Computer Science Degree"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-semibold mb-3">Career Goal *</label>
                        <input
                            onChange={(e) => {
                                setuserData(p => ({ ...p, careerInterest: e.target.value }))
                            }}
                            type="text"
                            className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full"
                            placeholder="e.g., Full Stack Developer"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-semibold mb-3">Strong Subjects</label>
                        <input
                            onChange={(e) => {
                                setuserData(p => ({ ...p, strongSubjects: e.target.value }))
                            }}
                            type="text"
                            className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full"
                            placeholder="e.g., Mathematics, Programming"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-semibold mb-3">Areas of Improvement</label>
                        <input
                            onChange={(e) => {
                                setuserData(p => ({ ...p, areasOfImprovement: e.target.value }))
                            }}
                            type="text"
                            className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full"
                            placeholder="e.g., Algorithms, System Design"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-semibold mb-3">Learning Preferences</label>
                        <input
                            onChange={(e) => {
                                setuserData(p => ({ ...p, learningPreferences: e.target.value }))
                            }}
                            type="text"
                            className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full"
                            placeholder="e.g., Project-based learning"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-semibold mb-3">Weekly Study Time Available</label>
                        <input
                            onChange={(e) => {
                                setuserData(p => ({ ...p, weeklyStudyTime: e.target.value }))
                            }}
                            type="text"
                            className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full"
                            placeholder="e.g., 10-15 hours per week"
                        />
                    </div>
                </div>

                {/* BUTTON STATIC */}
                <div className="flex justify-center mt-8">
                    <button
                        disabled={isLoading}
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-purple-500/25"
                    >
                        {isLoading ? <LoadingSpinner /> : "Start Learning Journey"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailPopUp;
