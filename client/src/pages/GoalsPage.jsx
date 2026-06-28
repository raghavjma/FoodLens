import { useState, useEffect } from "react";
import api from "../lib/axios";
import { useAuthStore } from "../store/authStore";

const GoalsPage = () => {
  // Global auth state
  const { user, checkAuth } = useAuthStore();

  // Local component state
  const [targetInput, setTargetInput] = useState(user?.dailyCalorieTarget || 2200);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Sync the local input state if the global user object updates (e.g., on initial load)
  useEffect(() => {
    if (user?.dailyCalorieTarget) {
      setTargetInput(user.dailyCalorieTarget);
    }
  }, [user]);

  // Handle the form submission to update the target
  const handleUpdateTarget = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!targetInput || targetInput <= 0) {
      setErrorMessage("Please enter a valid calorie target.");
      setSuccessMessage(null);
      return;
    }

    setIsUpdating(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await api.put("/users/target", { 
        dailyCalorieTarget: Number(targetInput) 
      });

      // Refresh global user state immediately so the Dashboard reflects the change
      await checkAuth();

      setSuccessMessage("Your daily calorie target has been successfully updated!");
    } catch (err) {
      console.error("Update target error:", err);
      setErrorMessage(
        err.response?.data?.message || 
        "Failed to update your calorie target. Please try again."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-10">
        
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Nutritional Goals</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Adjust your daily targets to match your lifestyle.
          </p>
        </header>

        {/* Current Target Display */}
        <div className="flex flex-col items-center justify-center bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-1">
            Current Target
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-gray-900">
              {user?.dailyCalorieTarget || "..."}
            </span>
            <span className="text-lg font-medium text-gray-600">kcal</span>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdateTarget} className="space-y-6">
          <div>
            <label 
              htmlFor="calorieTarget" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Daily Calorie Target
            </label>
            <input
              id="calorieTarget"
              type="number"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g., 2000"
              min="500"
              max="10000"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:active:scale-100 transition-all"
          >
            {isUpdating ? "Updating Target..." : "Update Target"}
          </button>
        </form>

        {/* Status Messages */}
        {successMessage && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg text-center animate-in fade-in">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center animate-in fade-in">
            {errorMessage}
          </div>
        )}

      </div>
    </div>
  );
};

export default GoalsPage;