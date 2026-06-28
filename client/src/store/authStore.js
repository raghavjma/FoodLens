import { create } from 'zustand';
import api from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/signup", { email, password, name });
      set({ 
        user: response.data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error signing up", 
        isLoading: false 
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", { email, password });
      set({
        isAuthenticated: true,
        user: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error logging in", 
        isLoading: false 
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/auth/logout");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: "Error logging out",
        isLoading: false 
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/verify-email", { code });
      set({
        user: response.data.user,
        isLoading: false
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error verifying email", 
        isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const reponse = await api.get("/auth/check-auth");
      set({
        user: reponse.data.user,
        isAuthenticated: true,
        isCheckingAuth: false
      });
    }
    catch (error) {
      set({
        user: null,
        error: null, // We don't want to show an error if the user is simply not authenticated
        isAuthenticated: false,
        isCheckingAuth: false
      });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/forgot-password", { email });
      set({ message: response.data.message, isLoading: false });
    }
    catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error sending password reset email"
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/reset-password/${token}", { password });
      set({
        message: response.data.message,
        isLoading: false,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password"
      });
      throw error;
    }
  },
}));

