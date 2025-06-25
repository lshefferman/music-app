import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:13333";

export const usePlaylistStore = create((set, get) => ({
  playlists: [],
  currentPlaylist: null,
  tracks: [],
  loading: false,
  loadingPlaylist: false,
  loadingTracks: false,
  error: null,

  formData: {
    name: "",
    description: "",
    image: "",
    creatorId: "",
  },

  setFormData: (formData) => set({ formData }),

  resetForm: () =>
    set({
      formData: { name: "", description: "", image: "", creatorId: "" },
    }),

  addPlaylist: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/playlists`, formData);
      await get().fetchPlaylists();
      get().resetForm();
      toast.success("Playlist added successfully");
      document.getElementById("add-playlist-modal")?.close();
    } catch (err) {
      console.error("Add playlist error:", err);
      set({ error: "Something went wrong" });
      toast.error("Failed to add playlist");
    } finally {
      set({ loading: false });
    }
  },

  fetchPlaylists: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${BASE_URL}/api/playlists`);
      set({ playlists: res.data.data, error: null });
    } catch (err) {
      console.error("Fetch playlists error:", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  deletePlaylist: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/playlists/${id}`);
      set((prev) => ({
        playlists: prev.playlists.filter((p) => p.id !== id),
      }));
      toast.success("Playlist deleted successfully");
    } catch (err) {
      console.error("Delete playlist error:", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchPlaylistInfo: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}/api/playlists/${id}`);
      set({ currentPlaylist: res.data.data });
    } catch (err) {
      console.error("Failed to fetch playlist", err);
      set({ error: "Failed to load playlist." });
    } finally {
      set({ loading: false });
    }
  },

  fetchPlaylistTracks: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${BASE_URL}/api/playlists/${id}/tracks`);
      set({ tracks: res.data.data || [], error: null });
    } catch (err) {
      console.error("Fetch tracks error:", err);
      set({ error: "Failed to fetch playlist tracks" });
    } finally {
      set({ loading: false });
    }
  },

  updatePlaylist: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const res = await axios.put(`${BASE_URL}/api/playlists/${id}`, formData);
      set({ currentPlaylist: res.data.data, error: null });
      toast.success("Playlist updated successfully");
    } catch (err) {
      console.error("Update playlist error:", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
