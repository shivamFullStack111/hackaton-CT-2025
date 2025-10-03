import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const JoinSession = () => {
    return (
        <>
            <Header></Header>
                <div className="min-h-screen bg-dark-purple py-8 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-5xl font-bold text-white mb-4">Join Learning Session</h1>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Enter session code or browse available sessions to join your virtual classroom
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                                <h2 className="text-3xl font-bold text-white mb-6">Join with Code</h2>
                                <p className="text-gray-300 text-lg mb-8">
                                    Enter the session code provided by your teacher
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-white text-lg font-semibold mb-3">Session Code</label>
                                        <div className="bg-gray-750 border border-gray-600 rounded-xl p-4 text-white text-xl text-center font-mono tracking-widest">
                                            X7B9-K2M4-P6Q8
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white text-lg font-semibold mb-3">Your Name</label>
                                        <div className="bg-gray-750 border border-gray-600 rounded-xl p-4 text-white text-lg">
                                            Shivam
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white text-lg font-semibold mb-3">Session Password (if required)</label>
                                        <div className="bg-gray-750 border border-gray-600 rounded-xl p-4 text-white text-lg">
                                            ••••••••
                                        </div>
                                    </div>

                                    <button className="w-full bg-purple-600 text-white text-xl font-semibold py-4 rounded-xl hover:bg-purple-700 transition-colors duration-200 mt-6">
                                        Join Session
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                                <h2 className="text-3xl font-bold text-white mb-6">Available Sessions</h2>
                                <p className="text-gray-300 text-lg mb-8">
                                    Browse and join public sessions
                                </p>

                                <div className="space-y-4">
                                    <div className="bg-gray-750 rounded-xl p-6 border border-gray-600 hover:border-purple-500 transition-colors duration-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-white text-xl font-semibold mb-2">Advanced Mathematics Workshop</h3>
                                                <p className="text-gray-400 text-sm">Dr. Shivam</p>
                                            </div>
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Live
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                                            <div className="flex items-center gap-4">
                                                <span>🔴 45/50 joined</span>
                                                <span>⏱ 30 mins left</span>
                                            </div>
                                            <span className="text-purple-400 font-semibold">#X7B9-K2M4</span>
                                        </div>

                                        <div className="flex gap-2 mb-4">
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Whiteboard</span>
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Code Editor</span>
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Live Chat</span>
                                        </div>

                                        <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
                                            Join Session
                                        </button>
                                    </div>

                                    {/* 2 */}
                                    <div className="bg-gray-750 rounded-xl p-6 border border-gray-600 hover:border-purple-500 transition-colors duration-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-white text-xl font-semibold mb-2">Python Programming Basics</h3>
                                                <p className="text-gray-400 text-sm">Prof. Mike Chen</p>
                                            </div>
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Live
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                                            <div className="flex items-center gap-4">
                                                <span>🔴 28/40 joined</span>
                                                <span>⏱ 60 mins left</span>
                                            </div>
                                            <span className="text-purple-400 font-semibold">#P8T2-R9W1</span>
                                        </div>

                                        <div className="flex gap-2 mb-4">
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Code Editor</span>
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">AI Review</span>
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Live Chat</span>
                                        </div>

                                        <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
                                            Join Session
                                        </button>
                                    </div>

                                    <div className="bg-gray-750 rounded-xl p-6 border border-gray-600 hover:border-purple-500 transition-colors duration-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-white text-xl font-semibold mb-2">Physics Lab Session</h3>
                                                <p className="text-gray-400 text-sm">Dr. Emily Roberts</p>
                                            </div>
                                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Starting Soon
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                                            <div className="flex items-center gap-4">
                                                <span>⚪ 15/30 joined</span>
                                                <span>⏰ Starts in 5 mins</span>
                                            </div>
                                            <span className="text-purple-400 font-semibold">#F3G7-H5J9</span>
                                        </div>

                                        <div className="flex gap-2 mb-4">
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Whiteboard</span>
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Simulations</span>
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Live Chat</span>
                                        </div>

                                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                                            Join Waiting Room
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
                <Footer></Footer>
                </>

    )
}

export default JoinSession