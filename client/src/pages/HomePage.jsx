import React from 'react';
import { Link } from 'react-router-dom'; // Prevents full page reloads
import { Sparkles, Flame, Cloud, ArrowRight } from 'lucide-react';

const featuresData = [
  {
    title: 'AI Image Recognition',
    description: 'Simply snap a photo of your meal. Our advanced models instantly identify the food items on your plate.',
    icon: <Sparkles className="w-8 h-8 text-blue-600" />,
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Instant Calorie Estimation',
    description: 'Get highly accurate macronutrient breakdowns and calorie counts without manually searching databases.',
    icon: <Flame className="w-8 h-8 text-orange-500" />,
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Secure Cloud Sync',
    description: 'Your nutrition history is securely backed up and synchronized across all your devices in real-time.',
    icon: <Cloud className="w-8 h-8 text-indigo-500" />,
    bgColor: 'bg-indigo-50'
  }
];

// --- Sub-Components ---

const Hero = () => (
  <header className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 md:pt-40 md:pb-32 max-w-4xl mx-auto">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
      <Sparkles className="w-4 h-4" />
      <span>Smarter Nutrition Tracking</span>
    </div>
    
    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
      Understand your food with <span className="text-blue-600">Food Lens</span>
    </h1>
    
    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
      Ditch the manual logging. Track your daily macros, hit your calorie targets, and monitor your progress just by taking photos of your meals.
    </p>
    
    <Link 
      to="/signup" 
      className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
    >
      Get Started for Free
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </header>
);

const FeatureGrid = ({ features }) => (
  <section className="bg-white py-24 px-6 border-t border-gray-100 w-full flex-grow">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Everything you need to stay on top of your dietary goals, streamlined into one intelligent application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center p-8 rounded-3xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${feature.bgColor}`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main Page Component ---

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Hero />
      <FeatureGrid features={featuresData} />
    </div>
  );
};

export default HomePage;