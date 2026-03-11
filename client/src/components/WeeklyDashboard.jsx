import React from 'react';
import { Target, TrendingUp, Calendar, Zap, LayoutGrid } from 'lucide-react';

const WeeklyDashboard = ({ recentMeals = [] }) => {
  // Aggregate mock weekly data
  const totalWeeklyCalories = recentMeals.reduce((acc, meal) => acc + (meal.nutrition?.calories || 0), 0) + 12500;
  const targetCalories = 15000;
  
  const dailyAverage = Math.round(totalWeeklyCalories / 7);

  const mockRecommendations = [
    { title: "Keto-friendly Grilled Salmon", match: "94%", cal: 450, tag: "Low Carb" },
    { title: "Mediterranean Quinoa Bowl", match: "88%", cal: 380, tag: "High Protein" },
    { title: "Avocado Chicken Salad", match: "91%", cal: 410, tag: "Balanced" }
  ];

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
              Based on your recent meals, your diet aligns closely with a <span className="text-indigo-600 font-bold">Mediterranean</span> profile. You are consistently hitting your protein goals, but might want to reduce saturated fats towards the weekend.
            </p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="text-slate-700">Weekly Calorie Goal</span>
                  <span className="text-slate-500">{totalWeeklyCalories.toLocaleString()} / {targetCalories.toLocaleString()} kcal</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" 
                    style={{ width: `${Math.min(100, (totalWeeklyCalories / targetCalories) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
              <Zap className="w-10 h-10 text-amber-500" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mt-2">Daily Average</p>
            <p className="text-4xl font-black text-slate-800 tracking-tight">{dailyAverage} <span className="text-xl text-slate-500 font-medium">kcal</span></p>
          </div>
        </div>

        {/* Similar Diet Recommendations */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-white shadow-xl shadow-indigo-100/50 flex flex-col">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-indigo-900">
            <Target className="w-5 h-5 text-indigo-600" /> AI Recommendations
          </h3>
          <p className="text-sm font-medium text-indigo-700 mb-6">Meals matching your dietary similarity & goals:</p>
          
          <div className="space-y-4 flex-1">
            {mockRecommendations.map((rec, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 flex flex-col border border-white/50 shadow-sm transition-all hover:bg-white hover:shadow-md cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-slate-800 leading-tight">{rec.title}</span>
                  <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">{rec.match}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-500 mt-2">
                  <span>{rec.cal} kcal</span>
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{rec.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyDashboard;
