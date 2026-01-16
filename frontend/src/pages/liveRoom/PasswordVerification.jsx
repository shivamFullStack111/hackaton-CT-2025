import React, { useState } from "react";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { Toaster } from "react-hot-toast";

const PasswordVerification = ({ 
  roomData, 
  password, 
  setPassword, 
  verifyPassword, 
  isLoading 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    
    try {
      await verifyPassword();
    } catch (err) {
      setError("Verification failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <Toaster/>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Private Room Access
          </h1>
          <p className="text-gray-400">
            This room is protected by a password
          </p>
          {roomData?.name && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">{roomData.name}</span>
            </div>
          )}
        </div>

        {/* Password Card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 shadow-xl">
          <div className="mb-6">
            <div className="flex items-center gap-3 text-gray-300 mb-2">
              <Lock className="w-5 h-5" />
              <span className="font-medium">Enter Room Password</span>
            </div>
            <p className="text-sm text-gray-400">
              The host has set a password to join this session. Please enter it below to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter the room password"
                  disabled={isLoading}
                  autoFocus
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Join Session</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-900/30 rounded-lg">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium mb-1">
                  Secure Connection
                </p>
                <p className="text-xs text-gray-400">
                  Your connection is encrypted end-to-end. Passwords are verified securely and never stored.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact the session host for password assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordVerification;