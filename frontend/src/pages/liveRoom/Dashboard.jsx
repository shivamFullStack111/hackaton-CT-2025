import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Trophy,
  Star,
  Target,
  ChevronRight,
  Sparkles,
  Zap,
  Brain,
  Code2,
  BookOpen,
  Share2,
  Filter,
  Bell,
  Settings,
  Plus,
  Crown,
  Activity,
  Globe,
  MoreVertical,
  FileText,
  Palette,
} from "lucide-react";
import ResponsiveContainer from "../../components/ResponsiveContainer";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 24,
    activeSessions: 3,
    totalParticipants: 156,
    completionRate: 85,
    averageRating: 4.8,
    totalHours: 127,
  });

  // Mock user data
  const user = {
    name: "John Doe",
    role: "Teacher",
    avatar: "/avatar.png",
    joinDate: "2024-01-15",
    level: "Pro",
    streak: 42,
  };

  // Recent sessions data
  const recentSessions = [
    {
      id: 1,
      title: "Advanced JavaScript Patterns",
      category: "Programming",
      participants: 24,
      duration: "2h 30m",
      date: "2024-01-20",
      status: "completed",
      rating: 4.9,
      thumbnail: "/js-session.png",
    },
    {
      id: 2,
      title: "React Hooks Masterclass",
      category: "Web Development",
      participants: 18,
      duration: "1h 45m",
      date: "2024-01-18",
      status: "ongoing",
      rating: 4.7,
      thumbnail: "/react-session.png",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      category: "Computer Science",
      participants: 32,
      duration: "3h 15m",
      date: "2024-01-15",
      status: "completed",
      rating: 4.8,
      thumbnail: "/dsa-session.png",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      category: "Design",
      participants: 12,
      duration: "2h",
      date: "2024-01-12",
      status: "upcoming",
      rating: null,
      thumbnail: "/design-session.png",
    },
  ];

  // Upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      title: "Node.js Backend Development",
      time: "10:00 AM",
      date: "Tomorrow",
      participants: 8,
      type: "live",
    },
    {
      id: 2,
      title: "Python Data Analysis",
      time: "2:00 PM",
      date: "Jan 25",
      participants: 15,
      type: "workshop",
    },
    {
      id: 3,
      title: "System Design Interview Prep",
      time: "4:30 PM",
      date: "Jan 26",
      participants: 20,
      type: "masterclass",
    },
  ];

  // Top participants
  const topParticipants = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "/avatar1.png",
      sessions: 24,
      rating: 4.9,
      streak: 15,
      badges: ["🏆", "⭐", "🚀"],
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "/avatar2.png",
      sessions: 18,
      rating: 4.7,
      streak: 8,
      badges: ["⭐", "🎯"],
    },
    {
      id: 3,
      name: "Carol Davis",
      avatar: "/avatar3.png",
      sessions: 32,
      rating: 4.8,
      streak: 21,
      badges: ["🏆", "⭐", "🚀", "👑"],
    },
    {
      id: 4,
      name: "David Wilson",
      avatar: "/avatar4.png",
      sessions: 15,
      rating: 4.6,
      streak: 5,
      badges: ["⭐", "🎯"],
    },
  ];

  // Quick actions
  const quickActions = [
    {
      icon: Plus,
      label: "New Session",
      color: "bg-gradient-to-r from-teal to-purple-600",
      path: "/create-session",
    },
    {
      icon: Users,
      label: "Invite People",
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      path: "/invite",
    },
    {
      icon: Calendar,
      label: "Schedule",
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
      path: "/schedule",
    },
    {
      icon: FileText,
      label: "Reports",
      color: "bg-gradient-to-r from-green-600 to-green-700",
      path: "/reports",
    },
  ];

  // Categories
  const categories = [
    { name: "Programming", icon: Code2, count: 12, color: "bg-blue-600" },
    { name: "Design", icon: Palette, count: 8, color: "bg-pink-600" },
    { name: "Data Science", icon: Brain, count: 6, color: "bg-teal" },
    { name: "Business", icon: TrendingUp, count: 4, color: "bg-green-600" },
    { name: "Marketing", icon: Share2, count: 3, color: "bg-yellow-600" },
    { name: "Language", icon: Globe, count: 5, color: "bg-purple-600" },
  ];

  // Stats cards data
  const statCards = [
    {
      title: "Total Sessions",
      value: stats.totalSessions,
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "from-blue-600 to-blue-700",
    },
    {
      title: "Active Sessions",
      value: stats.activeSessions,
      change: "+3",
      trend: "up",
      icon: Activity,
      color: "from-green-600 to-green-700",
    },
    {
      title: "Participants",
      value: stats.totalParticipants,
      change: "+24%",
      trend: "up",
      icon: Users,
      color: "from-purple-600 to-purple-700",
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate}%`,
      change: "+5%",
      trend: "up",
      icon: Target,
      color: "from-teal to-teal-dark",
    },
  ];

  // Loading simulation
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="h-screen overflow-y-auto scrollbar">
      <ResponsiveContainer className={"bg-gray-900"}>
        {/* Dashboard Header */}
        <div className="w-full py-8 ">
          <div className="flex justify-between items-start">
            <div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-white flex items-center gap-3"
              >
                <Sparkles className="text-teal" />
                Dashboard Overview
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <p className="text-gray-300 font-semibold mt-2">
                  Welcome back, {user.name}! 👋
                </p>
                <p className="text-gray-300 font-semibold mt-1">
                  Here's what's happening with your sessions today.
                </p>
              </motion.div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 px-4 rounded-lg bg-dark-navy text-white font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <div className="relative">
                <button className="p-2 px-4 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full absolute -top-1 -right-1">
                    3
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* User Stats Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 bg-dark-navy border border-gray-800 rounded-2xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-teal flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Crown className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">{user.role}</span>
                    <span className="px-2 py-1 bg-teal/20 text-teal text-xs rounded-full">
                      Level {user.level}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {stats.totalSessions}
                  </div>
                  <div className="text-sm text-gray-400">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal">
                    {stats.averageRating}
                  </div>
                  <div className="text-sm text-gray-400">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {user.streak}
                  </div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="flex items-center justify-end gap-4">
                  <Link
                    to={"/create-session"}
                    className="p-3 px-6 rounded-lg bg-gradient-to-r from-teal to-purple-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Start New Session
                  </Link>
                  <Link
                    to={"/join-session"}
                    className="p-3 px-6 rounded-lg bg-dark-navy border border-gray-700 text-white font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Join Session
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Left Column - Stats & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {statCards.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark-navy border border-gray-800 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-3xl font-bold text-white">
                          {stat.value}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            stat.trend === "up"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.color}`}
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-dark-navy border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Quick Actions
                </h3>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.path} className="group">
                    <div
                      className={`${action.color} rounded-xl p-4 text-center transition-all group-hover:scale-105`}
                    >
                      <action.icon className="h-6 w-6 text-white mx-auto mb-2" />
                      <span className="text-white text-sm font-medium">
                        {action.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-dark-navy border border-gray-800 rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-teal" />
                    Recent Sessions
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white">
                      <Filter className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Session
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Category
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Participants
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Duration
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Status
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSessions.map((session) => (
                      <tr
                        key={session.id}
                        className="border-b border-gray-800 hover:bg-gray-800/50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {session.title}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {session.date}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                            {session.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-white">
                              {session.participants}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-white">
                              {session.duration}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              session.status === "completed"
                                ? "bg-green-900 text-green-300"
                                : session.status === "ongoing"
                                ? "bg-blue-900 text-blue-300"
                                : "bg-yellow-900 text-yellow-300"
                            }`}
                          >
                            {session.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {session.rating ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-white">
                                {session.rating}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-dark-navy border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-teal" />
                  Upcoming Sessions
                </h3>
                <button className="text-teal text-sm font-medium hover:text-teal/80">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 bg-gray-800/30 rounded-xl border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">
                        {session.title}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          session.type === "live"
                            ? "bg-red-900 text-red-300"
                            : session.type === "workshop"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-purple-900 text-purple-300"
                        }`}
                      >
                        {session.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {session.date} • {session.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {session.participants}
                      </div>
                    </div>
                    <button className="w-full mt-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium">
                      Join Session
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Participants */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-dark-navy border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Top Participants
                </h3>
                <button className="text-teal text-sm font-medium hover:text-teal/80">
                  See All
                </button>
              </div>

              <div className="space-y-4">
                {topParticipants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-teal flex items-center justify-center">
                          <span className="text-white font-bold">
                            {participant.name.charAt(0)}
                          </span>
                        </div>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1">
                            <Award className="h-4 w-4 text-yellow-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {participant.name}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {participant.badges.map((badge, i) => (
                            <span key={i}>{badge}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">
                        {participant.sessions}
                      </div>
                      <div className="text-xs text-gray-400">sessions</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-dark-navy border border-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Categories</h3>

              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{category.count}</span>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Performance Chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-dark-navy border border-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-teal" />
                Performance
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Session Completion</span>
                    <span className="text-white font-bold">85%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal to-teal-dark"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">
                      Participant Engagement
                    </span>
                    <span className="text-white font-bold">92%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-700"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Average Rating</span>
                    <span className="text-white font-bold">4.8/5.0</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-600 to-yellow-700"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
