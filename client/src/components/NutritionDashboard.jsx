import React from 'react';
import { Flame, Beef, Wheat, Droplets, CheckCircle2 } from 'lucide-react';

const NutritionDashboard = ({ data }) => {
  if (!data) return null;

  const { recognition, nutrition } = data;

  const macros = [
    { label: 'Protein', value: `${nutrition.macronutrients.protein}g`, icon: Beef, color: 'text-rose-500', bg: 'bg-rose-100' },
    { label: 'Carbs', value: `${nutrition.macronutrients.carbs}g`, icon: Wheat, color: 'text-amber-500', bg: 'bg-amber-100' },
    { label: 'Fat', value: `${nutrition.macronutrients.fat}g`, icon: Droplets, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  ];

  return (
    <div className="w-full max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6 overflow-hidden">
        
        {/* Header - Recognition */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">AI Identified</h3>
            <p className="text-2xl font-bold text-slate-800 capitalize mt-1">{recognition.label}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-1 text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              {recognition.confidence}% Match
            </span>
          </div>
        </div>

        {/* Calories Highlight */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <div className="text-4xl font-extrabold text-slate-800">
              {nutrition.calories} <span className="text-xl font-medium text-slate-400">kcal</span>
            </div>
            <p className="text-sm text-slate-500 font-medium tracking-wide">Estimated for {nutrition.portionGrams}g portion</p>
          </div>
        </div>

        {/* Macros Grid */}
        <h4 className="text-sm font-bold text-slate-800 mb-3 ml-1">Macros Breakdown</h4>
        <div className="grid grid-cols-3 gap-3">
          {macros.map((macro, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-transform hover:scale-105">
              <div className={`w-10 h-10 rounded-full ${macro.bg} ${macro.color} flex items-center justify-center mb-2`}>
                <macro.icon className="w-5 h-5" />
              </div>
              <p className="text-lg font-bold text-slate-800">{macro.value}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase">{macro.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NutritionDashboard;
