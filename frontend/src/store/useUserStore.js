import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:13333";

// Load user/token from localStorage initially
const savedUser = JSON.parse(localStorage.getItem("user"));
const savedToken = localStorage.getItem("token");

export const useUserStore = create((set) => ({
  user: savedUser || null,
  token: savedToken || null,
  loading: false,
  error: null,

  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
    toast.success("Logged out");
  },

  signupUser: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/api/user/signup`, formData);
      const { id, email, token } = res.data.data;

      const user = { id, email };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      set({ user, token });
      toast.success("Signed up successfully");
      return true;
    } catch (err) {
      const msg = err.response?.data?.error || "Signup failed";
      set({ error: msg });
      toast.error(msg);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/api/user/login`, formData);
      const { id, email, token } = res.data.data;

      const user = { id, email };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      set({ user, token });
      toast.success("Logged in successfully");
      return true;
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed";
      set({ error: msg });
      toast.error(msg);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
