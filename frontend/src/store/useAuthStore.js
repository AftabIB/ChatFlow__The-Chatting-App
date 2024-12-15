import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  //upload the image on cloudinary
updateProfile: async (data) => {
  set({ isUpdatingProfile: true });

  try {
    const res = await axiosInstance.post("/auth/update-profile", data);
    set({ authUser: res.data });
    toast.success("Profile updated successfully!");
  } catch (error) {
    console.log("Error in update profile: ", error);
    toast.error(
      error.response?.data?.message || "An error occurred while updating the profile."
    );
  } finally {
    set({ isUpdatingProfile: false });
  }
},

}));
