import React from 'react'

const QuizPage = () => {
    return (
        <div className="h-[90vh] overflow-y-auto bg-dark-navy py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-4">Mathematics Advanced Quiz</h1>
                            <p className="text-xl text-gray-300 mb-3">Comprehensive mathematics quiz covering algebra, geometry, and calculus</p>
                            <p className="text-lg text-gray-400">Created by: Shivam</p>
                        </div>
                        <div className="text-right ml-8">
                            <div className="bg-purple-600 text-white px-6 py-3 rounded-xl mb-3 inline-block">
                                <span className="font-bold text-2xl">59:45</span>
                                <span className="text-lg ml-2">remaining</span>
                            </div>
                            <div className="text-gray-300 text-lg">
                                Question 1 of 10
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/*  Sidebar */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                            <h3 className="text-white font-bold text-xl mb-6">Questions</h3>
                            <div className="grid grid-cols-5 gap-3 mb-8">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <div
                                        key={num}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-semibold ${
                                            num === 1
                                                ? 'bg-purple-600 text-white'
                                                : num <= 3
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-700 text-gray-300'
                                        }`}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t border-gray-700 pt-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                                    <span className="text-gray-300 text-base">Current Question</span>
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                                    <span className="text-gray-300 text-base">Answered</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-gray-700 rounded"></div>
                                    <span className="text-gray-300 text-base">Unanswered</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-purple-500 text-white px-4 py-2 rounded-xl text-base font-semibold">
                                    Question 1
                                </span>
                                <span className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl text-base font-semibold">
                                    5 points
                                </span>
                                <span className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl text-base font-semibold">
                                    Multiple Choice
                                </span>
                            </div>

                            <h2 className="text-2xl text-white font-semibold mb-8 leading-relaxed">
                                What is the derivative of f(x) = 3x² + 2x - 5?
                            </h2>

                            <div className="space-y-4 mb-8">
                                <div className="p-5 rounded-xl border-2 border-purple-500 bg-purple-500 bg-opacity-10">
                                    <div className="flex items-center">
                                        <div className="w-7 h-7 rounded-full border-2 mr-5 border-purple-500 bg-purple-500"></div>
                                        <span className="text-white text-xl">6x + 2</span>
                                    </div>
                                </div>
                                
                                <div className="p-5 rounded-xl border-2 border-gray-600 bg-gray-750 hover:border-gray-500 cursor-pointer">
                                    <div className="flex items-center">
                                        <div className="w-7 h-7 rounded-full border-2 mr-5 border-gray-500"></div>
                                        <span className="text-white text-xl">3x + 2</span>
                                    </div>
                                </div>
                                
                                <div className="p-5 rounded-xl border-2 border-gray-600 bg-gray-750 hover:border-gray-500 cursor-pointer">
                                    <div className="flex items-center">
                                        <div className="w-7 h-7 rounded-full border-2 mr-5 border-gray-500"></div>
                                        <span className="text-white text-xl">6x² + 2</span>
                                    </div>
                                </div>
                                
                                <div className="p-5 rounded-xl border-2 border-gray-600 bg-gray-750 hover:border-gray-500 cursor-pointer">
                                    <div className="flex items-center">
                                        <div className="w-7 h-7 rounded-full border-2 mr-5 border-gray-500"></div>
                                        <span className="text-white text-xl">3x² + 2</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-8 border-t border-gray-700">
                                <button className="px-8 py-4 bg-gray-700 text-gray-400 rounded-xl font-semibold text-lg cursor-not-allowed">
                                    ← Previous
                                </button>

                                <button className="px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 font-semibold text-lg">
                                    Next Question →
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">Q4</span>
                                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm font-semibold">Multiple Select</span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-4">Which of the following are prime numbers?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border border-gray-500 rounded"></div>
                                        <span className="text-gray-300 text-base">17</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border border-gray-500 rounded"></div>
                                        <span className="text-gray-300 text-base">21</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border border-gray-500 rounded"></div>
                                        <span className="text-gray-300 text-base">29</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">Q5</span>
                                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm font-semibold">True/False</span>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-4">The area of a circle is calculated using πr²</h3>
                                <div className="flex gap-3">
                                    <div className="flex-1 p-3 bg-gray-750 rounded-lg text-center text-gray-300 text-base">True</div>
                                    <div className="flex-1 p-3 bg-gray-750 rounded-lg text-center text-gray-300 text-base">False</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizPage 