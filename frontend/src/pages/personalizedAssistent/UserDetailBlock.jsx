import React from 'react'

const UserDetailBlock = ({userData}) => {
    return (
        <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">AI</span>
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">Learning Assistant</h3>
                    <p className="text-gray-400">Always active and ready to help</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-500 text-sm">Online</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                        <h4 className="text-white font-semibold mb-3">Current Focus Areas</h4>
                        <div className="space-y-2">
                            {userData.careerInterest && (
                                <>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">{userData.careerInterest}</span>
                                        <span className="text-purple-400">70%</span>
                                    </div>
                                    <div className="w-full bg-gray-600 rounded-full h-2">
                                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                                    </div>
                                </>
                            )}

                            {userData.strongSubjects && userData.strongSubjects.split(',').slice(0, 2).map((subject, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">{subject.trim()}</span>
                                        <span className="text-purple-400">{85 - index * 15}%</span>
                                    </div>
                                    <div className="w-full bg-gray-600 rounded-full h-2">
                                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${85 - index * 15}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                        <h4 className="text-white font-semibold mb-3">User Profile</h4>
                        <div className="space-y-3 text-sm">
                            {userData.fullName && (
                                <div>
                                    <div className="text-gray-400">Name</div>
                                    <div className="text-white">{userData.fullName}</div>
                                </div>
                            )}
                            {userData.currentlyPursuing && (
                                <div>
                                    <div className="text-gray-400">Currently Pursuing</div>
                                    <div className="text-white">{userData.currentlyPursuing}</div>
                                </div>
                            )}
                            {userData.careerInterest && (
                                <div>
                                    <div className="text-gray-400">Career Goal</div>
                                    <div className="text-white">{userData.careerInterest}</div>
                                </div>
                            )}
                            <div>
                                <div className="text-gray-400">Skill Level</div>
                                <div className="text-white">Intermediate</div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default UserDetailBlock