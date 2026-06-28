import { useState, useEffect } from "react";
import api from "../lib/axios";
import { useAuthStore } from "../store/authStore";

const Dashboard = () => {
  // Global auth state
  const { user } = useAuthStore();
  
  // Local component state
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch today's logs on mount
  useEffect(() => {
    const fetchTodayLogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Uses configured axios instance
        const response = await api.get("/logs/today"); 
        setLogs(response.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Could not load your daily logs. Please try refreshing.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayLogs();
  }, []);

  // Calorie Calculations
  const totalCalories = logs.reduce((sum, log) => sum + (log.estimatedCalories || 0), 0);
  const calorieTarget = user?.dailyCalorieTarget || 2200; // Fallback to 2200 if missing
  
  // Math for the SVG Progress Ring
  const progressPercentage = Math.min((totalCalories / calorieTarget) * 100, 100);
  const isOverTarget = totalCalories > calorieTarget;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  // Helper to format the time beautifully
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans p-4 md:p-6 pb-24 max-w-2xl mx-auto w-full">
      <header className="mb-6 mt-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Hello, {user?.name?.split(' ')[0] || 'User'}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here is your daily summary.</p>
      </header>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* TOP SECTION: Daily Progress Widget */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 w-full text-left">Calorie Goal</h2>
        
        <div className="relative flex items-center justify-center">
          {/* SVG Progress Ring */}
          <svg className="w-48 h-48 transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="14"
              fill="transparent"
              className="text-gray-100"
            />
            {/* Progress Track */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${
                isOverTarget ? "text-red-500" : "text-blue-600"
              }`}
            />
          </svg>
          
          {/* Centered Text inside the Ring */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`text-3xl font-bold tracking-tight ${isOverTarget ? "text-red-600" : "text-gray-800"}`}>
              {totalCalories}
            </span>
            <hr className="w-12 border-gray-200 my-1" />
            <span className="text-sm font-medium text-gray-500">
              / {calorieTarget} kcal
            </span>
          </div>
        </div>

        {isOverTarget && (
          <p className="mt-4 text-sm text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full">
            You are {totalCalories - calorieTarget} kcal over your target.
          </p>
        )}
      </section>

      {/* BOTTOM SECTION: Feed */}
      <section className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Logs</h2>
        
        {logs.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-gray-100 border-dashed p-8 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h3 className="text-gray-800 font-medium mb-1">No meals logged yet</h3>
            <p className="text-sm text-gray-500 mb-4">Tap the scan button to analyze your first meal of the day.</p>
          </div>
        ) : (
          /* Log List */
          <div className="space-y-3">
            {logs.map((log) => (
              <div 
                key={log._id} 
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center text-xl">
                    {/* Placeholder emoji based on first letter, or can use imageUrl if we have one later */}
                    🍽️
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 capitalize">
                      {log.detectedFood}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {formatTime(log.consumedAt)}
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                  <span className="font-bold text-blue-700">
                    {log.estimatedCalories} kcal
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;