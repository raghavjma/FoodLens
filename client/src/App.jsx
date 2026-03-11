import React, { useState } from 'react';
import axios from 'axios';
import { Utensils } from 'lucide-react';
import PhotoUpload from './components/PhotoUpload';
import NutritionDashboard from './components/NutritionDashboard';
import WeeklyDashboard from './components/WeeklyDashboard';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const [recentMeals, setRecentMeals] = useState([]);

  const handleResetWeek = () => {
    setRecentMeals([]);
    setResultData(null);
    setError(null);
  };

  const handleAnalyze = async (file) => {
    setIsAnalyzing(true);
    setError(null);
    setResultData(null);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post('http://localhost:5000/api/food/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setResultData(response.data.data);
        setRecentMeals(prev => [response.data.data, ...prev]);
      } else {
        setError(response.data.message || 'Failed to analyze meal.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while communicating with the server.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-green-50/50 to-slate-100 flex flex-col font-sans">
      
      {/* Navbar */}
      <nav className="bg-white/70 backdrop-blur-lg border-b border-white/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                <Utensils className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-800">
                Food<span className="text-primary-600">Lens</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4">
            AI-Powered Personalized Diet Planner
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Upload a photo of your meal to instantly identify the food, estimate portion sizes, and get a detailed macro breakdown.
          </p>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-8 mb-16">
          <div className="w-full lg:w-1/2 flex justify-end">
            <PhotoUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start min-h-[300px]">
             {error && (
               <div className="w-full max-w-md bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm font-medium animate-in fade-in">
                 {error}
               </div>
             )}
             {resultData && <NutritionDashboard data={resultData} />}
             {!resultData && !error && !isAnalyzing && (
               <div className="w-full max-w-md h-full flex flex-col items-center justify-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-2xl">
                  <Utensils className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-center font-medium">Upload a photo to see nutrition analysis here</p>
               </div>
             )}
             {isAnalyzing && (
                <div className="w-full max-w-md h-64 flex flex-col items-center justify-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-t-4 border-primary-500 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-r-4 border-primary-300 animate-spin animation-delay-150"></div>
                  </div>
                  <p className="mt-6 text-lg font-semibold text-primary-600 animate-pulse">Running AI Vision Models...</p>
                </div>
             )}
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="w-full border-t border-slate-200/60 pt-8">
          <WeeklyDashboard recentMeals={recentMeals} onReset={handleResetWeek} />
        </div>

      </main>
    </div>
  );
}

export default App;
