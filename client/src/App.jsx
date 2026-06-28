import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";

import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/LoadingSpinner";
import Layout from "./components/Layout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Scan from "./pages/Scan";
import HistoryPage from "./pages/HistoryPage";
import GoalsPage from "./pages/GoalsPage";
import ProfilePage from "./pages/ProfilePage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth, user } = useAuthStore();
  const location = useLocation(); // gets current url path

  if (isCheckingAuth) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" state={{from: location}} replace />;

  // If the user is authenticated but email is not verified, redirect to email verification page
  if(!user.isVerified) return <Navigate to="/verify-email" replace />;

  return children;
};

// Guard to prevent logged-in users from seeing login/signup pages
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, isCheckingAuth, user } = useAuthStore();

  if (isCheckingAuth) return <LoadingSpinner />;
  if (isAuthenticated && user.isVerified) return <Navigate to="/dashboard" replace />;

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) return <LoadingSpinner />

  return (
    <Routes>
      {/* root route */}
      <Route
        path="/"
        element={
          isAuthenticated && user?.isVerified ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <HomePage /> // Notice: No <Layout> wrapper here so the public page is standalone
          )
        }
      />
      {/* Public Routes (Only for non-logged-in users) */}
      <Route
        path="/signup"
        element={
          <RedirectAuthenticatedUser>
            <SignupPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/verify-email"
        element={
          <RedirectAuthenticatedUser>
            <EmailVerificationPage />
          </RedirectAuthenticatedUser>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>
        }
      />

      <Route
        path="/reset-password/:token"
        element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>
        }
      />

      {/* Protected Routes (Onlyfor logged-in users) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/scan"
        element={
          <ProtectedRoute>
            <Layout>
              <Scan />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <Layout>
              <HistoryPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <Layout>
              <GoalsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      {/* Catch-all route for undefined paths */}
      <Route path="*" 
      element={
        <Navigate to="/" replace />} 
      />
    </Routes>
  );
};

export default App;
