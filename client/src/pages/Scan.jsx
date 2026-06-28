import { useState, useRef } from "react";
import api from "../lib/axios";

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // states for the saving process
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null); 
  
  const fileInputRef = useRef(null);

  // Reusable function to handle file state
  const processSelectedFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setScanResult(null); // Reset previous results
      setError(null);
      setSaveMessage(null); // Reset save state
    } else {
      setError("Please select a valid image file.");
    }
  };

  // Handle manual file input selection
  const handleImageChange = (e) => {
    processSelectedFile(e.target.files[0]);
  };

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // Trigger file input dialog
  const openCameraOrFiles = () => {
    fileInputRef.current.click();
  };

  // Send image to the Express backend for scanning
  const handleScan = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setError(null);
    setSaveMessage(null);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await api.post("/scans/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setScanResult(response.data.data);
    } catch (err) {
      console.error("Scan error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to analyze image. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Save the identified food and calories to the user's daily log
  const handleSaveToLog = async () => {
    if (!scanResult) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      // Map the nested AI response data to match Log model requirements
      const logData = {
        detectedFood: scanResult.recognition.label,
        estimatedCalories: scanResult.nutrition.calories,
        // imageUrl is optional in our schema, so we can omit it here unless we implement a cloud upload step prior to this.
      };

      await api.post("/logs/", logData);

      setSaveMessage({ type: "success", text: "Successfully saved to your daily log!" });
    } catch (err) {
      console.error("Save log error:", err);
      setSaveMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to save to log." 
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Cleanup object URL to prevent memory leaks
  const handleClear = () => {
    setSelectedImage(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setScanResult(null);
    setError(null);
    setSaveMessage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full font-sans">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Scan Your Meal</h2>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Drag-and-Drop / Upload / Preview Zone */}
      <div 
        onClick={openCameraOrFiles}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full h-64 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer overflow-hidden mb-4 transition-colors ${
          isDragging 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <svg className="w-10 h-10 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="font-medium text-sm">Tap to Camera / Upload</span>
            <span className="text-xs mt-1">or drag and drop an image here</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full">
        {previewUrl && (
          <button
            onClick={handleClear}
            disabled={isProcessing}
            className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            Clear
          </button>
        )}
        <button
          onClick={handleScan}
          disabled={!selectedImage || isProcessing}
          className="flex-2 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {isProcessing ? "Analyzing Image..." : "Analyze Food"}
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg w-full text-center">
          {error}
        </div>
      )}

      {/* AI Result Card */}
      {scanResult && !isProcessing && (
        <div className="mt-6 w-full p-5 bg-white shadow-md rounded-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 capitalize">
                {scanResult.recognition.label}
              </h3>
              <p className="text-sm text-gray-500">
                Confidence: {scanResult.recognition.confidence}%
              </p>
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <span className="font-bold text-blue-700">
                {scanResult.nutrition.calories} kcal
              </span>
            </div>
          </div>
          
          {/* Save Status Message */}
          {saveMessage && (
            <div className={`mb-3 text-sm text-center font-medium ${saveMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
              {saveMessage.text}
            </div>
          )}

          {/* Save Button */}
          <button 
            onClick={handleSaveToLog}
            disabled={isSaving || saveMessage?.type === "success"}
            className="w-full py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:active:scale-100 transition-all"
          >
            {isSaving 
              ? "Saving..." 
              : saveMessage?.type === "success" 
                ? "Saved!" 
                : "Save to Daily Log"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Scan;