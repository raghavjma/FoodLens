import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out:", error);
      setIsLoggingOut(false);
    }
  };

  // Safely format the account creation date
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  // Get the first letter of the user's name for the avatar fallback
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 md:p-6 font-sans w-full">
      <div className="w-full max-w-md mt-6 md:mt-10">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            {/* Avatar */}
            <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-md">
              {userInitial}
            </div>
            
            {/* Verified Badge */}
            {user?.isVerified && (
              <div className="absolute bottom-0 right-0 bg-green-500 border-2 border-white text-white p-1.5 rounded-full shadow-sm" title="Verified Account">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            {user?.name || "User Name"}
          </h1>
          <p className="text-gray-500 mt-1">
            {user?.email || "user@example.com"}
          </p>
          
          {user?.isVerified && (
            <span className="mt-3 inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200 uppercase tracking-wide">
              Verified
            </span>
          )}
        </div>

        {/* Account Details Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider bg-gray-50 px-6 py-4 border-b border-gray-100">
            Account Details
          </h2>
          <div className="divide-y divide-gray-100">
            <div className="flex justify-between items-center px-6 py-4">
              <span className="text-gray-600 font-medium">Member Since</span>
              <span className="text-gray-900 font-semibold">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4">
              <span className="text-gray-600 font-medium">Daily Target</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-bold border border-blue-100">
                {user?.dailyCalorieTarget || "2200"} kcal
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full py-3.5 bg-red-500 text-white rounded-xl font-semibold text-lg hover:bg-red-600 active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2"
        >
          {isLoggingOut ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging Out...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Log Out
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default ProfilePage;