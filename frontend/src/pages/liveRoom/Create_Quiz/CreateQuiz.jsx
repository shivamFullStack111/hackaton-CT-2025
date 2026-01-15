import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import {
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Save,
  Copy,
  Clock,
  FileText,
  Code,
  CheckSquare,
  Type,
  Zap,
  ChevronDown,
  ChevronUp,
  Settings,
  Eye,
  Share2,
  Download,
  Layers,
  Hash,
  AlertCircle,
} from "lucide-react";
import ResponsiveContainer from "../../../components/ResponsiveContainer";

const CreateQuiz = ({ roomData }) => {
  const [quizData, setQuizData] = useState({
    difficulty:"Beginner"
  });
  const [total_questions, settotal_questions] = useState(10);
  const [quizRequirements, setquizRequirements] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    type: "mcq",
    question: "",
    marks: 5,
    options: [
      { id: "a", text: "", isCorrect: false },
      { id: "b", text: "", isCorrect: false },
      { id: "c", text: "", isCorrect: false },
      { id: "d", text: "", isCorrect: false },
    ],
    explanation: "",
    codeTemplate: "",
    expectedAnswer: "",
    testCases: [],
  });

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState([
    "q1",
    "q2",
    "q3",
    "q4",
  ]);
  const questionTypes = [
    {
      id: "mcq",
      name: "Multiple Choice",
      icon: CheckSquare,
      color: "bg-purple-600",
    },
    { id: "true-false", name: "True/False", icon: Type, color: "bg-teal" },
    {
      id: "code",
      name: "Code Implementation",
      icon: Code,
      color: "bg-blue-600",
    },
    {
      id: "short-answer",
      name: "Short Answer",
      icon: FileText,
      color: "bg-yellow-600",
    },
    {
      id: "fill-blanks",
      name: "Fill in Blanks",
      icon: Edit2,
      color: "bg-green-600",
    },
    // { id: "matching", name: "Matching", icon: Layers, color: "bg-pink-600" },
  ];

  const handleGenerateWithAi = async () => {
    if (!quizRequirements) return toast.error("Quiz Requirement is Required");
    if (total_questions < 5) return toast.error("Total Questions must be 5");

    setIsGeneratingAI(true);

    try {
      const payload = {
        difficulty: quizData?.difficulty || "Beginner",
        quizRequirements: quizRequirements,
        total_questions: total_questions,
      };
      const res = await axios.post(
        "http://localhost:8888/api/ai/generate-quiz",
        payload
      );
      console.log(res.data?.message?.questions);
      setQuizData({
        title: res.data?.message?.title,
        description: res.data?.message?.description,
        timeLimit: res.data?.message?.timeLimit,
        totalMarks: res.data?.message?.totalMarks,
        difficulty: res.data?.message?.difficulty,
        topic: res.data?.message?.topic,
        status: "draft",
        questions: res?.data?.message?.questions,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const toggleQuestionExpand = (questionId) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionId)
        ? prev?.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question.trim()) return;

    const questionToAdd = {
      id: `q${quizData?.questions?.length + 1}`,
      ...newQuestion,
    };

    setQuizData((prev) => ({
      ...prev,
      questions: [...(prev.questions||[]), questionToAdd],
    }));

    // Reset new question form
    setNewQuestion({
      type: "mcq",
      question: "",
      marks: 5,
      options: [
        { id: "a", text: "", isCorrect: false },
        { id: "b", text: "", isCorrect: false },
        { id: "c", text: "", isCorrect: false },
        { id: "d", text: "", isCorrect: false },
      ],
      explanation: "",
      codeTemplate: "",
      expectedAnswer: "",
      testCases: [],
    });
  };

  const handleDeleteQuestion = (questionId) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions?.filter((q) => q.id !== questionId),
    }));
  };

  const handleUpdateQuestion = (questionId, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions?.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    }));
  };

  const handleUpdateOption = (questionId, optionId, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions?.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options?.map((opt) =>
              opt.id === optionId ? { ...opt, [field]: value } : opt
            ),
          };
        }
        return q;
      }),
    }));
  };

  const handleAddOption = (questionId) => {
    const question = quizData.questions?.find((q) => q.id === questionId);
    if (!question || question.options?.length >= 6) return;

    const newOptionId = String.fromCharCode(97 + question.options?.length); // a, b, c, etc.

    handleUpdateQuestion(questionId, "options", [
      ...question.options,
      { id: newOptionId, text: "", isCorrect: false },
    ]);
  };

  const handleRemoveOption = (questionId, optionId) => {
    const question = quizData?.questions?.find((q) => q.id === questionId);
    if (!question || question?.options?.length <= 2) return;

    handleUpdateQuestion(
      questionId,
      "options",
      question?.options?.filter((opt) => opt.id !== optionId)
    );
  };

  const handleSetCorrectAnswer = (questionId, optionId) => {
    const question = quizData?.questions?.find((q) => q.id === questionId);
    if (!question) return;

    const updatedOptions = question?.options?.map((opt) => ({
      ...opt,
      isCorrect: opt.id === optionId,
    }));

    handleUpdateQuestion(questionId, "options", updatedOptions);
  };

  // const handleGenerateWithAI = () => {
  //   setIsGeneratingAI(true);

  //   // Simulate AI generation
  //   setTimeout(() => {
  //     const aiGeneratedQuestion = {
  //       id: `q${quizData.questions?.length + 1}`,
  //       type: "mcq",
  //       question:
  //         'Based on today\'s session, what is the output of `console.log(2 + "2")` in JavaScript?',
  //       marks: 5,
  //       options: [
  //         { id: "a", text: "22", isCorrect: true },
  //         { id: "b", text: "4", isCorrect: false },
  //         { id: "c", text: "NaN", isCorrect: false },
  //         { id: "d", text: "TypeError", isCorrect: false },
  //       ],
  //       explanation:
  //         "In JavaScript, the + operator performs string concatenation when one operand is a string.",
  //     };

  //     setQuizData((prev) => ({
  //       ...prev,
  //       questions: [...prev.questions, aiGeneratedQuestion],
  //     }));
  //     setIsGeneratingAI(false);
  //   }, 2000);
  // };

  // const handleSaveQuiz = () => {
  //   console.log("Saving quiz:", quizData);
  //   // Implement save logic here
  // };

  const handlePublishQuiz = async () => {
    if (quizData?.timeLimit < 30) return toast.error("Time limit must be greater or equal to 30 seconds");
    if (!quizData?.title) return toast.error("Title is Required");
    if (!quizData?.description) return toast.error("Description is Required");
    if (!quizData?.difficulty) return toast.error("Difficulty Level is Required");
    if (!quizData?.topic) return toast.error("Topic is Required");
    if (!quizData?.questions || quizData?.questions.length<5) return toast.error("Number of question must be greater then or equal to 5");


    try {
      const totalMarkss = getTotalMarks();
      const res = await axios.post("http://localhost:8888/api/quiz/create", {
        ...quizData,
        sessionId: roomData?._id,
        totalMarks: totalMarkss,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setQuizData({
          title: "",
          description: "",
          timeLimit: 0,
          // totalMarks: null,
          difficulty: "Beginner",
          topic: "",
          status: "draft",
          questions: [],
        });
            setQuizData((prev) => ({ ...prev, status: "published" }));

      } else {
        toast.error(res?.data?.message);
      }

      console.log(res?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const calculateTotalMarks = () => {
    return quizData?.questions?.reduce((total, q) => total + q.marks, 0);
  };

  const getTotalMarks = () => {
    const totalMarks = quizData?.questions?.reduce(
      (total, val) => (total += val.marks),
      0
    );
    return totalMarks;
  };

  return (
    <ResponsiveContainer>
      <div className="w-full h-[90vh] bg-gray-900 scrollbar px-5 overflow-y-scroll   z-10">
        {/* Header */}
        <div className="w-full overflow-y-auto my-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-4xl font-bold text-white flex items-center gap-3">
                <Sparkles className="text-teal" />
                AI Quiz Generator
              </div>
              <p className="text-gray-300 font-semibold mt-2">
                Create and customize quizzes using AI based on your session
                content
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* <button
                onClick={handleSaveQuiz}
                className="p-2 px-6 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition-colors flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Quiz
              </button> */}
              <button
                onClick={handlePublishQuiz}
                className="p-2 px-6 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Publish Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Left Column - Quiz Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quiz Info Card */}
            <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Quiz Information
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    quizData?.status === "draft"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-green-900 text-green-300"
                  }`}
                >
                  {quizData?.status === "draft" ? "Draft" : "Published"}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={quizData?.title}
                    onChange={(e) =>
                      setQuizData({ ...quizData, title: e.target.value })
                    }
                    className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    placeholder="Enter quiz title"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={quizData?.description}
                    onChange={(e) =>
                      setQuizData({
                        ...quizData,
                        description: e.target.value,
                      })
                    }
                    className="w-full h-24 p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                    placeholder="Describe what this quiz covers"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block  text-gray-400 text-sm font-semibold mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Time Limit (seconds)
                    </label>
                    <input
                      type="number"
                      value={quizData?.timeLimit}
                      onChange={(e) =>
                        setQuizData({
                          ...quizData,
                          timeLimit: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      min="1"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-gray-400 text-sm font-semibold mb-2">
                      <Hash className="inline h-4 w-4 mr-1" />
                      Total Marks
                    </label>
                    <input
                      type="number"
                      value={calculateTotalMarks()}
                      readOnly
                      className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-semibold mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={quizData?.difficulty || "Beginner"}
                      onChange={(e) =>
                        setQuizData({
                          ...quizData,
                          difficulty: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-semibold mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={quizData?.topic}
                      onChange={(e) =>
                        setQuizData({ ...quizData, topic: e.target.value })
                      }
                      className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      placeholder="e.g., JavaScript, Python, etc."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Questions ({quizData?.questions?.length})
                </h3>
                {/* <button
                  onClick={handleGenerateWithAI}
                  disabled={isGeneratingAI}
                  className="p-2 px-4 rounded-lg bg-gradient-to-r from-teal to-purple-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingAI ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </button> */}
              </div>

              <div className="space-y-4">
                {quizData?.questions?.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden"
                  >
                    {/* Question Header */}
                    <div
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition-colors"
                      onClick={() => toggleQuestionExpand(question.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-lg ${
                            questionTypes?.find((t) => t.id === question.type)
                              ?.color
                          }`}
                        >
                          {React.createElement(
                            questionTypes?.find((t) => t.id === question.type)
                              ?.icon,
                            {
                              className: "h-5 w-5 text-white",
                            }
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">
                              Q{index + 1}:
                            </span>
                            <span className="text-gray-300 line-clamp-1">
                              {question.question}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-400">
                              {
                                questionTypes?.find(
                                  (t) => t.id === question.type
                                )?.name
                              }
                            </span>
                            <span className="text-sm text-teal font-semibold">
                              {question.marks} marks
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuestion(question.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        {expandedQuestions?.includes(question.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Question Content */}
                    {expandedQuestions.includes(question.id) && (
                      <div className="p-6 border-t border-gray-700 space-y-4">
                        {/* Question Text */}
                        <div>
                          <label className="block text-gray-400 text-sm font-semibold mb-2">
                            Question Text
                          </label>
                          <textarea
                            value={question.question}
                            onChange={(e) =>
                              handleUpdateQuestion(
                                question.id,
                                "question",
                                e.target.value
                              )
                            }
                            className="w-full h-20 p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                          />
                        </div>

                        {/* Marks */}
                        <div className="flex items-center gap-4">
                          <div className="w-32">
                            <label className="block text-gray-400 text-sm font-semibold mb-2">
                              Marks
                            </label>
                            <input
                              type="number"
                              value={question.marks}
                              onChange={(e) =>
                                handleUpdateQuestion(
                                  question.id,
                                  "marks",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full p-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                              min="1"
                            />
                          </div>

                          {/* Question Type */}
                          <div className="flex-1">
                            <label className="block text-gray-400 text-sm font-semibold mb-2">
                              Question Type
                            </label>
                            <select
                              value={question.type}
                              onChange={(e) =>
                                handleUpdateQuestion(
                                  question.id,
                                  "type",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                            >
                              {questionTypes?.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Options for MCQ/True-False */}
                        {(question.type === "mcq" ||
                          question.type === "true-false") && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <label className="block text-gray-400 text-sm font-semibold">
                                Options
                              </label>
                              {question.type === "mcq" &&
                                question.options?.length < 6 && (
                                  <button
                                    onClick={() => handleAddOption(question.id)}
                                    className="text-sm text-teal hover:text-teal-light flex items-center gap-1"
                                  >
                                    <Plus className="h-3 w-3" />
                                    Add Option
                                  </button>
                                )}
                            </div>
                            <div className="space-y-2">
                              {question.options?.map((option, optIndex) => (
                                <div
                                  key={option.id}
                                  className="flex items-center gap-3"
                                >
                                  <button
                                    onClick={() =>
                                      handleSetCorrectAnswer(
                                        question.id,
                                        option.id
                                      )
                                    }
                                    className={`p-2 rounded-lg flex-shrink-0 ${
                                      option.isCorrect
                                        ? "bg-teal text-white"
                                        : "bg-gray-900 text-gray-400 hover:bg-gray-700"
                                    }`}
                                  >
                                    {String.fromCharCode(65 + optIndex)}
                                  </button>
                                  <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) =>
                                      handleUpdateOption(
                                        question.id,
                                        option.id,
                                        "text",
                                        e.target.value
                                      )
                                    }
                                    className="flex-1 p-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                                    placeholder={`Option ${String.fromCharCode(
                                      65 + optIndex
                                    )}`}
                                  />
                                  <button
                                    onClick={() =>
                                      handleRemoveOption(question.id, option.id)
                                    }
                                    disabled={question.options?.length <= 2}
                                    className="p-2 text-gray-400 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Code Template for Code Questions */}
                        {question.type === "code" && (
                          <div>
                            <label className="block text-gray-400 text-sm font-semibold mb-2">
                              Code Template
                            </label>
                            <textarea
                              value={question.codeTemplate || ""}
                              onChange={(e) =>
                                handleUpdateQuestion(
                                  question.id,
                                  "codeTemplate",
                                  e.target.value
                                )
                              }
                              className="w-full h-32 font-mono text-sm p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                              placeholder="Provide the code template for students..."
                            />
                          </div>
                        )}

                        {/* Expected Answer for Short Answer */}
                        {question.type === "short-answer" && (
                          <div>
                            <label className="block text-gray-400 text-sm font-semibold mb-2">
                              Expected Answer
                            </label>
                            <textarea
                              value={question.expectedAnswer || ""}
                              onChange={(e) =>
                                handleUpdateQuestion(
                                  question.id,
                                  "expectedAnswer",
                                  e.target.value
                                )
                              }
                              className="w-full h-24 p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                              placeholder="Provide the expected answer..."
                            />
                          </div>
                        )}

                        {/* Explanation */}
                        <div>
                          <label className="block text-gray-400 text-sm font-semibold mb-2">
                            Explanation (Optional)
                          </label>
                          <textarea
                            value={question.explanation || ""}
                            onChange={(e) =>
                              handleUpdateQuestion(
                                question.id,
                                "explanation",
                                e.target.value
                              )
                            }
                            className="w-full h-20 p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                            placeholder="Provide explanation for the answer..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Question Form */}
              <div className="mt-8 p-6 bg-gray-800 border border-dashed border-gray-600 rounded-xl">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-teal" />
                  Add New Question
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-semibold mb-2">
                      Question Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {questionTypes?.map((type) => (
                        <button
                          key={type.id}
                          onClick={() =>
                            setNewQuestion({ ...newQuestion, type: type.id })
                          }
                          className={`p-3 rounded-lg border ${
                            newQuestion.type === type.id
                              ? "border-teal bg-teal bg-opacity-10 text-teal"
                              : "border-gray-700 text-gray-400 hover:border-gray-600"
                          }`}
                        >
                          <type.icon className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-xs">{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-semibold mb-2">
                      Question Text
                    </label>
                    <textarea
                      value={newQuestion.question}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          question: e.target.value,
                        })
                      }
                      className="w-full h-24 p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                      placeholder="Enter your question here..."
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <label className="block text-gray-400 text-sm font-semibold mb-2">
                        Marks
                      </label>
                      <input
                        type="number"
                        value={newQuestion.marks}
                        onChange={(e) =>
                          setNewQuestion({
                            ...newQuestion,
                            marks: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full p-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                        min="1"
                      />
                    </div>

                    <div className="flex-1">
                      <button
                        onClick={handleAddQuestion}
                        disabled={!newQuestion.question.trim()}
                        className="w-full p-3 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="inline h-4 w-4 mr-2" />
                        Add Question to Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Session Context & Stats */}
          <div className="space-y-6">
            {/* Session Context Card */}
            <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-teal" />
                Requirements
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-300 font-semibold mb-2">
                    Write about topics, you want in quiz
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Paste or write the topics you want the quiz to cover. The AI
                    will understand your instructions and generate questions
                    based on the selected difficulty level.
                  </p>
                </div>

                <div>
                  <textarea
                    placeholder="Enter the topics and instructions for the quiz (e.g., concepts to cover, question type, difficulty)."
                    value={quizRequirements}
                    onChange={(e) => setquizRequirements(e.target.value)}
                    rows={5}
                    className="bg-gray-900 text-gray-300 text-md p-3 w-full rounded-lg border border-gray-700"
                  ></textarea>
                </div>

                {/* <button className="w-full p-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Quiz from Session
                </button> */}
                {/* <div className="flex "> */}
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={quizData?.difficulty || "Beginner"}
                    onChange={(e) =>
                      setQuizData({
                        ...quizData,
                        difficulty: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Total Questions
                  </label>
                  <input
                    value={total_questions}
                    type="number"
                    placeholder="Number of questions you want"
                    onChange={(e) => settotal_questions(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  ></input>
                </div>
                {/* </div> */}

                <button
                  onClick={handleGenerateWithAi}
                  disabled={isGeneratingAI}
                  className="p-2 px-4 w-full flex justify-center rounded-lg bg-gradient-to-r from-teal to-purple-600 text-white font-semibold hover:shadow-lg transition-all  items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingAI ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quiz Statistics */}
            <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Quiz Statistics
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <div className="text-3xl font-bold text-teal">
                      {quizData?.questions?.length || 0}
                    </div>
                    <div className="text-sm text-gray-400">Total Questions</div>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <div className="text-3xl font-bold text-teal">
                      {getTotalMarks() || 0}
                    </div>
                    <div className="text-sm text-gray-400">Total Marks</div>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-3xl font-bold text-teal">
                    {Math.floor(quizData?.timeLimit / 60) || 0}:
                    {quizData?.timeLimit > 0
                      ? (quizData?.timeLimit % 60).toString().padStart(2, "0")
                      : 0}{" "}
                    min
                  </div>
                  <div className="text-sm text-gray-400">
                    Estimated Duration
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-300 font-semibold mb-3">
                    Question Types Distribution
                  </h4>
                  <div className="space-y-2">
                    {questionTypes?.map((type) => {
                      const count = quizData?.questions?.filter(
                        (q) => q.type === type.id
                      )?.length;
                      if (count === 0) return null;

                      return (
                        <div
                          key={type.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-400">
                              {type.name}
                            </span>
                          </div>
                          <span className="text-teal font-semibold">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Quick Actions
                </h3>

                <div className="space-y-3">
                  <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center gap-3">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span>Preview Quiz</span>
                  </button>

                  <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center gap-3">
                    <Copy className="h-4 w-4 text-gray-400" />
                    <span>Duplicate Quiz</span>
                  </button>

                  <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center gap-3">
                    <Download className="h-4 w-4 text-gray-400" />
                    <span>Export as PDF</span>
                  </button>

                  <button className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors flex items-center gap-3">
                    <Settings className="h-4 w-4 text-gray-400" />
                    <span>Quiz Settings</span>
                  </button>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default CreateQuiz;
