import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

const PhotoUpload = ({ onAnalyze, isAnalyzing }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6 transition-all duration-300 hover:shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
          Snap Your Meal
        </h2>
        <p className="text-slate-500 text-sm mt-1">AI will analyze your food and estimate calories instantly.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <label 
            htmlFor="photo-upload" 
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200
              ${previewUrl ? 'border-primary-400 bg-primary-50/30' : 'border-slate-300 hover:border-primary-500 hover:bg-slate-50'}`}
          >
            {previewUrl ? (
              <div className="relative w-full h-full p-2">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <p className="text-white font-medium flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" /> Change Photo
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                <Upload className="w-10 h-10 mb-3 text-primary-500" />
                <p className="mb-2 text-sm font-semibold">Click to upload photo</p>
                <p className="text-xs text-slate-400">PNG, JPG or WEBP (MAX. 5MB)</p>
              </div>
            )}
            <input 
              id="photo-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!selectedFile || isAnalyzing}
          className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2
            ${!selectedFile || isAnalyzing 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-primary-500/30'}
          `}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Meal'
          )}
        </button>
      </form>
    </div>
  );
};

export default PhotoUpload;
