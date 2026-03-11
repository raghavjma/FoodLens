import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, TrendingUp, Zap, LayoutGrid, Loader2 } from 'lucide-react';

const WeeklyDashboard = ({ recentMeals = [] }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch recommendations when recentMeals changes
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/food/recommendations', {
          recentMeals,
          dailyCalorieTarget: 2000,
        });
        if (response.data.success) {
          setRecommendations(response.data.data.recommendations);
          setInsights(response.data.data.insights);
        }
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [recentMeals.length]); // Re-fetch when new meals are added

  const totalWeeklyCalories = insights?.totalWeeklyCalories || 0;
  const weeklyTarget = insights?.weeklyTarget || 14000;
  const dailyAverage = insights?.dailyAverage || 0;
  const dietProfile = insights?.dietProfile || 'Balanced';
  const insightText = insights?.insightText || 'Upload meals to get personalized health insights.';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-8 duration-700">
      
      <div className="flex items-center gap-3 mb-8">
        <LayoutGrid className="w-8 h-8 text-primary-500" />
        <h2 className="text-3xl font-extrabold text-slate-800">Your Weekly Diet Plan</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {/* Health Insights Card */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 flex flex-col md:flex-row gap-8 transition-transform hover:-translate-y-1">
          
          <div className="flex-1">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-800">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Health Insights
            </h3>
            <p className="text-slate-600 mb-6 font-medium leading-relaxed">
              {insightText}
            </p>

            {/* Macro averages */}
            {insights?.avgMacros && (
              <div className="flex gap-4 mb-6">
                <div className="text-center bg-rose-50 rounded-xl px-4 py-2">
                  <p className="text-lg font-bold text-rose-600">{insights.avgMacros.protein}g</p>
                  <p className="text-xs font-semibold text-rose-400">Avg Protein</p>
                </div>
                <div className="text-center bg-amber-50 rounded-xl px-4 py-2">
                  <p className="text-lg font-bold text-amber-600">{insights.avgMacros.carbs}g</p>
                  <p className="text-xs font-semibold text-amber-400">Avg Carbs</p>
                </div>
                <div className="text-center bg-yellow-50 rounded-xl px-4 py-2">
                  <p className="text-lg font-bold text-yellow-600">{insights.avgMacros.fat}g</p>
                  <p className="text-xs font-semibold text-yellow-400">Avg Fat</p>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="text-slate-700">Weekly Calorie Goal</span>
                  <span className="text-slate-500">{totalWeeklyCalories.toLocaleString()} / {weeklyTarget.toLocaleString()} kcal</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (totalWeeklyCalories / weeklyTarget) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
              <Zap className="w-10 h-10 text-amber-500" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Diet Profile</p>
            <p className="text-lg font-extrabold text-indigo-600 mb-3">{dietProfile}</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mt-2">Daily Average</p>
            <p className="text-4xl font-black text-slate-800 tracking-tight">{dailyAverage} <span className="text-xl text-slate-500 font-medium">kcal</span></p>
          </div>
        </div>

        {/* AI Diet Recommendations */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-white shadow-xl shadow-indigo-100/50 flex flex-col">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-2 text-indigo-900">
            <Target className="w-5 h-5 text-indigo-600" /> AI Recommendations
          </h3>
          <p className="text-xs font-medium text-indigo-600 mb-5">Meals matched via cosine similarity on your macro profile:</p>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 flex flex-col border border-white/50 shadow-sm transition-all hover:bg-white hover:shadow-md cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-800 leading-tight text-sm">{rec.title}</span>
                    <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md ml-2 whitespace-nowrap">{rec.match}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-medium text-slate-500 mt-2">
                    <span>{rec.cal} kcal</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full">{rec.tag}</span>
                  </div>
                  {rec.macronutrients && (
                    <div className="flex gap-3 mt-2 text-xs text-slate-400">
                      <span>P: {rec.macronutrients.protein}g</span>
                      <span>C: {rec.macronutrients.carbs}g</span>
                      <span>F: {rec.macronutrients.fat}g</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyDashboard;
