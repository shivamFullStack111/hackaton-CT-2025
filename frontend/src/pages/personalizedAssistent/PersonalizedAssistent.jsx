


import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReactMarkDown from 'react-markdown'

const PersonalAIAssistant = () => {
    const [showInfoPopup, setShowInfoPopup] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [conversationStarted, setConversationStarted] = useState(false);

    const [userData, setUserData] = useState({
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

    const [initializedProfile, setInitializedProfile] = useState(null);

    const quickQuestions = [
        "Give me a 4-week study plan to become a Full Stack Developer.",
        "What are best resources for learning system design?",
        "Help me plan a small project to learn databases.",
        "Explain how REST vs GraphQL works.",
        "How to optimize database queries?"
    ];

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages, isLoading]);

    const pushMessage = ({ text, isAI = false }) => {
        setMessages(prev => [
            ...prev,
            {
                id: Date.now().toString() + Math.random().toString(36).slice(2),
                text,
                isAI,
                timestamp: new Date()
            }
        ]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.fullName || !userData.careerInterest) {
            alert('Please fill required fields: Full Name and Career Goal.');
            return;
        }

        setIsLoading(true);
        try {
            const payload = { profile: userData };
            const res = await fetch('http://localhost:8888/api/ai/initialize-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            console.log(res.data, 'iiiiiiiiiiiiiiiiiiii999999999999999999999')

            if (!res.ok) {
                const text = await res.text();
                console.error('Initialize profile failed:', text);
                throw new Error('Failed to initialize profile');
            }

            const data = await res.json();
            setInitializedProfile(data.profile || data);
            setConversationStarted(true);
            setShowInfoPopup(false);

            const name = userData.fullName || 'Student';
            pushMessage({
                isAI: true,
                text: `Hey ${name}! Your learning assistant is ready. Ask me anything about ${userData.careerInterest || 'your goals'} — I can create study plans, suggest projects, and explain concepts step-by-step.`
            });
        } catch (err) {
            console.log(err, '[[[[[[[[[[[[[[[[[[[[[[[[[[[[------');

            alert('Something went wrong while initializing the profile. Check the backend or console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        const trimmed = inputMessage.trim();
        if (!trimmed || isLoading) return;

        pushMessage({ text: trimmed, isAI: false });
        setInputMessage('');
        setIsLoading(true);

        try {
            const body = {
                message: trimmed,
                profile: initializedProfile || userData
            };

            const res = await fetch('http://localhost:8888/api/ai/personalized-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const txt = await res.text();
                console.error('personalized-chat failed:', txt);
                throw new Error('Chat API error');
            }

            const data = await res.json();
            const replyText = (typeof data.reply === 'string') ? data.reply : (data.reply?.text || JSON.stringify(data.reply));
            pushMessage({ text: replyText, isAI: true });

        } catch (err) {
            console.error(err);
            pushMessage({ text: "Sorry — I couldn't reach the assistant. Please try again later.", isAI: true });
        } finally {
            setIsLoading(false);
        }
    };

    const askQuickQuestion = async (question) => {
        setInputMessage(question);
        setTimeout(() => {
            handleSendMessage();
        }, 100);
    };

    return (
        <>
            <Header />

            {showInfoPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl h-[95vh] overflow-y-auto p-8 border border-purple-500/30 max-w-2xl w-full mx-4 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">AI</span>
                            </div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                                Welcome to Your AI Learning Assistant
                            </h2>
                            <p className="text-gray-300 text-lg">Help me understand you better to provide personalized guidance</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white text-sm font-semibold mb-3">Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={userData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white text-sm font-semibold mb-3">Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={userData.age}
                                            onChange={handleInputChange}
                                            className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                                            placeholder="Your age"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-semibold mb-3">Currently Pursuing</label>
                                    <input
                                        type="text"
                                        name="currentlyPursuing"
                                        value={userData.currentlyPursuing}
                                        onChange={handleInputChange}
                                        className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                                        placeholder="e.g., Computer Science Degree"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-semibold mb-3">Career Goal *</label>
                                    <input
                                        type="text"
                                        name="careerInterest"
                                        value={userData.careerInterest}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                                        placeholder="e.g., Full Stack Developer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-semibold mb-3">Strong Subjects</label>
                                    <input
                                        type="text"
                                        name="strongSubjects"
                                        value={userData.strongSubjects}
                                        onChange={handleInputChange}
                                        className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                                        placeholder="e.g., Mathematics, Programming"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-semibold mb-3">Areas of Improvement</label>
                                    <input
                                        type="text"
                                        name="areasOfImprovement"
                                        value={userData.areasOfImprovement}
                                        onChange={handleInputChange}
                                        className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                                        placeholder="e.g., Algorithms, System Design"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-semibold mb-3">Learning Preferences</label>
                                    <input
                                        type="text"
                                        name="learningPreferences"
                                        value={userData.learningPreferences}
                                        onChange={handleInputChange}
                                        className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                                        placeholder="e.g., Project-based learning, Video tutorials"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-semibold mb-3">Weekly Study Time Available</label>
                                    <input
                                        type="text"
                                        name="weeklyStudyTime"
                                        value={userData.weeklyStudyTime}
                                        onChange={handleInputChange}
                                        className="bg-gray-750 border-2 border-gray-600 rounded-2xl p-4 text-black w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                                        placeholder="e.g., 10-15 hours per week"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center mt-8">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Setting up your assistant...
                                        </>
                                    ) : (
                                        'Start Learning Journey'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                                                <div className="text-white font-semibold">{userData.fullName || 'Student'}</div>
                                                <div className="text-gray-400 text-sm">{userData.currentlyPursuing || 'Computer Science'}</div>
                                            </div>
                                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold">{userData.fullName ? userData.fullName[0].toUpperCase() : 'S'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    {messages.length === 0 ? (
                                        <div className="text-center text-gray-500 h-full flex items-center justify-center">
                                            <div>
                                                <div className="text-6xl mb-4">🤖</div>
                                                <p className="text-xl">Start a conversation with your AI assistant!</p>
                                                <p className="text-gray-400 mt-2">Ask about learning plans, resources, or any questions you have.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        messages.map((message) => (
                                            <div key={message.id} className={`flex gap-4 ${message.isAI ? '' : 'justify-end'}`}>
                                                {message.isAI && (
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-white font-bold">AI</span>
                                                    </div>
                                                )}
                                                <div className={`rounded-2xl p-6 border max-w-3xl ${message.isAI
                                                    ? 'bg-gray-750 border-gray-600'
                                                    : 'bg-blue-600 border-blue-500'
                                                    }`}>
                                                    <div className="text-white whitespace-pre-wrap"><ReactMarkDown>{message.text}</ReactMarkDown></div>
                                                    <div className={`text-xs mt-2 ${message.isAI ? 'text-gray-400' : 'text-blue-200'}`}>
                                                        {new Date(message.timestamp).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                                {!message.isAI && (
                                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-white font-bold">{userData.fullName ? userData.fullName[0].toUpperCase() : 'U'}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                    {isLoading && (
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold">AI</span>
                                            </div>
                                            <div className="bg-gray-750 rounded-2xl p-6 border border-gray-600 max-w-3xl">
                                                <div className="flex space-x-2">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {messages.length > 0 && (
                                    <div className="px-6 pb-4">
                                        <div className="text-center">
                                            <div className="text-gray-400 text-sm mb-3">Try asking:</div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {quickQuestions.map((question, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => askQuickQuestion(question)}
                                                        className="bg-gray-750 text-gray-300 px-4 py-2 rounded-lg text-sm border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-colors duration-200"
                                                    >
                                                        {question}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="p-6 border-t border-gray-700">
                                    <div className="flex gap-4">
                                        <div className="flex-1 relative">
                                            <textarea
                                                value={inputMessage}
                                                onChange={(e) => setInputMessage(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Type your message here..."
                                                className="w-full bg-gray-750 border border-gray-600 rounded-2xl p-4 pr-12 text-black resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
                                                rows="2"
                                            />
                                        </div>
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={!inputMessage.trim() || isLoading}
                                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                'Send'
                                            )}
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
    );
};

export default PersonalAIAssistant;
