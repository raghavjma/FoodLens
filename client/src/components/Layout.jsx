import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Home, History, Camera, Target, User, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Layout = ({ children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout } = useAuthStore(); // Pull the logout action from Zustand
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Call Zustand logout function
    await logout(); // This will clear the auth state and localStorage
    navigate('/'); // explicitly route to Home page after logout, otherwise it would switch to the login page because of the auth check in the App.jsx
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* DESKTOP TOP NAVBAR (hidden on mobile) */}
      <nav className="hidden md:flex fixed top-0 w-full h-16 bg-white shadow-sm z-50 items-center justify-between px-8 text-gray-700">
        
        {/* Left logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600 cursor-pointer">
          <Camera className="w-6 h-6" />
          <span>Food Lens</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-8 font-medium">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/history" className="hover:text-blue-600 transition-colors">History</Link>
          <Link to="/goals" className="hover:text-blue-600 transition-colors">Goals</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link to="/scan" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Camera className="w-4 h-4" />
            New Scan
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors focus:outline-none"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50 overflow-hidden">
                <Link 
                  to="/profile" 
                  onClick={() => setIsProfileOpen(false)} // Close dropdown on click
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Profile Settings
                </Link>
                
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM TAB BAR (Hidden on desktop) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-50 rounded-t-2xl px-6 border-t border-gray-100">
        <div className="flex items-center justify-between h-16 relative">
          
          <Link to="/dashboard" className="flex flex-col items-center justify-center w-12 text-gray-400 hover:text-blue-600 transition-colors">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>

          <Link to="/history" className="flex flex-col items-center justify-center w-12 text-gray-400 hover:text-blue-600 transition-colors mr-6">
            <History className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">History</span>
          </Link>

          {/* Prominent Centered FAB: Scan */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <Link to="/scan" className="flex flex-col items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 border-4 border-gray-50 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200">
              <Camera className="w-7 h-7" />
            </Link>
          </div>

          <Link to="/goals" className="flex flex-col items-center justify-center w-12 text-gray-400 hover:text-blue-600 transition-colors ml-6">
            <Target className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Goals</span>
          </Link>

          <Link to="/profile" className="flex flex-col items-center justify-center w-12 text-gray-400 hover:text-blue-600 transition-colors">
            <User className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
          
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="pt-6 pb-28 md:pt-24 md:pb-8 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
        {children}
      </main>

    </div>
  );
};

export default Layout;