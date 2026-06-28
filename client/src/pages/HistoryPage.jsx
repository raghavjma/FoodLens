import { useState, useEffect } from "react";
import api from "../lib/axios";

const HistoryPage = () => {
  const [groupedLogs, setGroupedLogs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await api.get("/logs/all");
        
        // 1. Debug: Log the exact response to your browser console
        console.log("Raw backend response:", response.data);

        // 2. Safely extract the array, regardless of how the backend wraps it
        let logsArray = [];
        if (Array.isArray(response.data)) {
          // Case A: Backend returned a direct array (expected)
          logsArray = response.data; 
        } else if (response.data && Array.isArray(response.data.data)) {
          // Case B: Backend wrapped it in { success: true, data: [...] }
          logsArray = response.data.data; 
        } else if (response.data && Array.isArray(response.data.logs)) {
          // Case C: Backend wrapped it in { logs: [...] }
          logsArray = response.data.logs; 
        } else {
          // If none of the above match, fail gracefully instead of crashing
          throw new Error("Backend did not return an array of logs.");
        }
        
        // 3. Pass the safely extracted array to your grouping function
        const grouped = groupLogsByDate(logsArray);
        setGroupedLogs(grouped);
        
      } catch (err) {
        console.error("History fetch error:", err);
        setError("Could not load your history. Please try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Helper: Format date strings into human-readable labels
  const formatDateLabel = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper: Extract just the time (e.g., "08:30 PM")
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper: Reduce the flat array into a grouped object
  const groupLogsByDate = (logs) => {
    return logs.reduce((acc, log) => {
      const dateLabel = formatDateLabel(log.consumedAt);
      if (!acc[dateLabel]) {
        acc[dateLabel] = [];
      }
      acc[dateLabel].push(log);
      return acc;
    }, {});
  };

  // Loading State (Skeleton Loaders)
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-6 max-w-2xl mx-auto w-full font-sans animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 mt-4"></div>
        {[1, 2, 3].map((section) => (
          <div key={section} className="mb-8">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2].map((card) => (
                <div key={card} className="h-20 bg-white rounded-xl shadow-sm border border-gray-100"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  const dateGroups = Object.entries(groupedLogs);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-6 pb-24 max-w-2xl mx-auto w-full font-sans">
      <header className="mb-6 mt-4">
        <h1 className="text-3xl font-bold text-gray-800">Meal History</h1>
        <p className="text-gray-500 mt-1">Review your past scans and nutrition.</p>
      </header>

      {/* Empty State */}
      {dateGroups.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mt-4 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No History Yet</h2>
          <p className="text-gray-500 mb-6">
            Your scanned meals will appear here. Head over to the Scan tab to log your first meal!
          </p>
        </div>
      ) : (
        /* History Feed */
        <div className="space-y-6 relative">
          {dateGroups.map(([dateLabel, dayLogs]) => (
            <section key={dateLabel} className="relative">
              
              {/* Sticky Date Header */}
              <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm py-2 mb-3">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  {dateLabel}
                </h2>
              </div>

              {/* Day's Log Cards */}
              <div className="space-y-3">
                {dayLogs.map((log) => (
                  <div
                    key={log._id}
                    className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      {/* Optional Image Thumbnail Avatar */}
                      <div className="w-12 h-12 flex-shrink-0 bg-blue-50 rounded-lg overflow-hidden flex items-center justify-center">
                        {log.imageUrl ? (
                          <img src={log.imageUrl} alt={log.detectedFood} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl">🍽️</span>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-800 capitalize text-lg leading-tight">
                          {log.detectedFood}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatTime(log.consumedAt)}
                        </p>
                      </div>
                    </div>

                    {/* Calories Badge */}
                    <div className="flex-shrink-0 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                      <span className="font-bold text-green-700 whitespace-nowrap">
                        {log.estimatedCalories} kcal
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;