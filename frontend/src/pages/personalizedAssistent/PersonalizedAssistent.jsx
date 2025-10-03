import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const PersonalAIAssistant = () => {
    const [showInfoPopup, setShowInfoPopup] = useState(true)

    return (
        <>
            <Header />
            
            {showInfoPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-2xl h-[95vh] overflow-y-auto p-8 border border-gray-700 max-w-2xl w-full mx-4">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome to Your AI Learning Assistant</h2>
                        <p className="text-gray-300 text-center mb-8">Help me understand you better to provide personalized guidance</p>
                        
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">Full Name</label>
                                    <div className="bg-gray-750 border border-gray-600 rounded-xl p-3 text-white">
                                        John Student
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">Age</label>
                                    <div className="bg-gray-750 border border-gray-600 rounded-xl p-3 text-white">
                                        21
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-white text-sm font-semibold mb-2">Currently Pursuing</label>
                                <div className="bg-gray-750 border border-gray-600 rounded-xl p-3 text-white">
                                    Computer Science Degree
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-white text-sm font-semibold mb-2">Career Interest/Goal</label>
                                <div className="bg-gray-750 border border-gray-600 rounded-xl p-3 text-white">
                                    Full Stack Developer
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-white text-sm font-semibold mb-2">Strong Subjects</label>
                                <div className="bg-gray-750 border border-gray-600 rounded-xl p-3 text-white">
                                    Mathematics, Programming, Web Development
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-white text-sm font-semibold mb-2">Areas of Improvement</label>
                                <div className="bg-gray-750 border border-gray-600 rounded-xl p-3 text-white">
                                    Algorithms, Database Design, System Architecture
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-white text-sm font-semibold mb-2">Learning Preferences</label>
                                <div className="bg-gray-750 border border-gray-600 rounded-xl p-3 text-white">
                                    Project-based learning, Video tutorials, Hands-on coding
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-white text-sm font-semibold mb-2">Weekly Study Time Available</label>
                                <div className="bg-gray-750 border border-gray-600 rounded-xl p-3 text-white">
                                    10-15 hours per week
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-center mt-8">
                            <button 
                                onClick={() => setShowInfoPopup(false)}
                                className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-colors duration-200 font-semibold"
                            >
                                Start Learning Journey
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-dark-navy py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-white mb-4">Personal AI Learning Assistant</h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Your intelligent companion for personalized learning guidance and career path recommendations
                        </p>
                    </div>

                    <div className="flex gap-8">
                        <div className="w-96 flex-shrink-0">
                            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                                <div className="text-center mb-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <img src="ai.gif" className='h-full w-full rounded-full' alt="AI Assistant" />
                                    </div>
                                    <h3 className="text-white text-2xl font-bold mb-2">Learning Assistant</h3>
                                    <p className="text-gray-400">Always active and ready to help</p>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-green-500 text-sm">Online</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                                        <h4 className="text-white font-semibold mb-3">Current Focus Areas</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">Web Development</span>
                                                <span className="text-purple-400">85%</span>
                                            </div>
                                            <div className="w-full bg-gray-600 rounded-full h-2">
                                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '85%'}}></div>
                                            </div>
                                            
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">Data Structures</span>
                                                <span className="text-purple-400">60%</span>
                                            </div>
                                            <div className="w-full bg-gray-600 rounded-full h-2">
                                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '60%'}}></div>
                                            </div>
                                            
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">Algorithms</span>
                                                <span className="text-purple-400">45%</span>
                                            </div>
                                            <div className="w-full bg-gray-600 rounded-full h-2">
                                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '45%'}}></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                                        <h4 className="text-white font-semibold mb-3">User Profile</h4>
                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <div className="text-gray-400">Interest</div>
                                                <div className="text-white">Web Development, AI/ML</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Currently Pursuing</div>
                                                <div className="text-white">Computer Science Degree</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Career Goal</div>
                                                <div className="text-white">Full Stack Developer</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Skill Level</div>
                                                <div className="text-white">Intermediate</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                                        <h4 className="text-white font-semibold mb-3">Learning Statistics</h4>
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <div className="text-2xl font-bold text-purple-400">24</div>
                                                <div className="text-gray-400 text-xs">Sessions</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-green-400">18</div>
                                                <div className="text-gray-400 text-xs">Topics Covered</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-blue-400">12</div>
                                                <div className="text-gray-400 text-xs">Projects Done</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-yellow-400">36</div>
                                                <div className="text-gray-400 text-xs">Hours Learned</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                                <h3 className="text-white text-xl font-bold mb-4">Quick Assessment</h3>
                                <div className="space-y-4">
                                    <div className="text-gray-300 text-sm">
                                        Based on your profile, I recommend focusing on:
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg border border-gray-600">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            <span className="text-white text-sm">Advanced JavaScript Concepts</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg border border-gray-600">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            <span className="text-white text-sm">React & Node.js Framework</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg border border-gray-600">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            <span className="text-white text-sm">Database Management</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="bg-gray-800 rounded-2xl border border-gray-700 h-[700px] flex flex-col">
                                <div className="p-6 border-b border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Learning Guidance Session</h2>
                                            <p className="text-gray-400">Personalized recommendations based on your goals</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-white font-semibold">John Student</div>
                                                <div className="text-gray-400 text-sm">Computer Science</div>
                                            </div>
                                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold">J</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold">AI</span>
                                        </div>
                                        <div className="bg-gray-750 rounded-2xl p-6 border border-gray-600 max-w-3xl">
                                            <div className="text-white">
                                                Hello John! Based on your profile, I can see you're pursuing Computer Science and aiming to become a Full Stack Developer. I'm here to help you create a personalized learning path and provide guidance on your journey.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 justify-end">
                                        <div className="bg-blue-600 rounded-2xl p-6 border border-blue-500 max-w-3xl">
                                            <div className="text-white">
                                                I want to improve my web development skills. Can you create a personalized learning plan?
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold">J</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold">AI</span>
                                        </div>
                                        <div className="bg-gray-750 rounded-2xl p-6 border border-gray-600 max-w-3xl">
                                            <div className="text-white mb-4">
                                                Here's a 3-month learning plan tailored for you:
                                            </div>
                                            <div className="text-gray-300 space-y-2 text-sm">
                                                <div>• Month 1: Advanced Frontend (React, State Management)</div>
                                                <div>• Month 2: Backend Development (Node.js, Databases)</div>
                                                <div>• Month 3: Full Stack Integration & Deployment</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-gray-400 text-sm mb-4">Try asking:</div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <div className="bg-gray-750 text-gray-300 px-4 py-2 rounded-lg text-sm border border-gray-600">
                                                "Break down Month 1 into weekly tasks"
                                            </div>
                                            <div className="bg-gray-750 text-gray-300 px-4 py-2 rounded-lg text-sm border border-gray-600">
                                                "Suggest project ideas for practice"
                                            </div>
                                            <div className="bg-gray-750 text-gray-300 px-4 py-2 rounded-lg text-sm border border-gray-600">
                                                "Help me with algorithm concepts"
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-gray-700">
                                    <div className="flex gap-4">
                                        <div className="flex-1 bg-gray-750 border border-gray-600 rounded-2xl p-4">
                                            <div className="text-gray-400">Type your message here...</div>
                                        </div>
                                        <button className="bg-purple-600 text-white px-8 py-4 rounded-2xl hover:bg-purple-700 transition-colors duration-200 font-semibold text-lg">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PersonalAIAssistant