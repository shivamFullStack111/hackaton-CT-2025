import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import UserDetailPopUp from './UserDetailPopUp';
import UserDetailBlock from './UserDetailBlock';
import ConversationBlock from './ConversationBlock';
import { useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';

const PersonalAIAssistant = () => {
    const [isLoading, setisLoading] = useState(true)
    const [userData, setuserData] = useState({
        userId: '',
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
        try {
            const getUserProfile = async () => {
                const res = await axios.get(`http://localhost:8888/api/user-profile/get-profile/${JSON.parse(localStorage.getItem("user"))._id}`)
                if (res?.data?.success) {
                    setuserData(res?.data?.profile)
                }
            }
            getUserProfile()
        } catch (error) {
            console.log(error.message)
        } finally {
            setisLoading(false)
        }
    }, [])

    return (
        <>
            {isLoading && <LoadingSpinner></LoadingSpinner>}
            <Header />

            {/* Popup UI only */}
            {!isLoading && <UserDetailPopUp
                userData2={userData}
                setuserData2={setuserData}
            />}

            <div className="min-h-screen bg-dark-navy py-8 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Personal AI Learning Assistant
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                            Your intelligent companion for personalized learning guidance and career path recommendations
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* User Profile Panel */}
                        <UserDetailBlock userData={userData} />

                        {/* Conversation UI only — no logic */}
                        <ConversationBlock
                            userData={userData}
                            messages={[]}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default PersonalAIAssistant;
