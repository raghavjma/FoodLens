# FoodLens - AI-Powered Personalized Diet Planner

A full-stack MERN application that uses AI to recognize food from user uploaded images, estimates calories and portion sizes, and provides a weekly diet dashboard with diet recommendations via similarity matching.

## Architecture

- **Frontend**: React + Vite + Tailwind CSS v4 (Glassmorphism & animated UI)
- **Backend**: Node.js + Express
- **Machine Learning**: Integrated Hugging Face Inference API (`nateraw/food` Vision Model)
- **Nutrition**: Custom macro/calorie heuristic pipeline (extensible to Edamam API).

## How to Run Locally

### 1. Start the Backend Server
```bash
cd server
npm install # if not already installed
npm run dev
```
The server will start on `http://localhost:5000`. 
Optional: You can create a `.env` in the `server` folder with `HF_API_KEY=your_hugging_face_key` to remove rate limits, but it falls back gracefully without it.

### 2. Start the Frontend Application
In a new terminal:
```bash
cd client
npm install # if not already installed
npm run dev
```
The UI will be available at `http://localhost:5173`.

## Features
- **Upload Food Photo**: Drag and drop or select an image of your meal.
- **AI Classification**: Identifies the primary food item.
- **Nutrition Estimation**: Instantly calculates estimated portions and macros.
- **Weekly Dashboard**: Provides health insights and similar diet recommendations based on your habits.