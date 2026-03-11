import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">Welcome to FoodLens</h2>
      <p className="text-gray-600 mb-6">
        Analyze your food with AI. Upload an image to geet started!
      </p>
      <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
        Get Started
      </button>
      </div>
    </div>
  );
};

export default Home;