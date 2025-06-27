import { create } from "zustand";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import { useUserStore } from "./useUserStore";

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
  },

  setFormData: (formData) => set({ formData }),

  resetForm: () =>
    set({
      formData: { name: "", description: "", image: "" },
    }),

  addPlaylist: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      const user = useUserStore.getState().user;

      if (!user) throw new Error("User not logged in");

      const payload = {
        ...formData,
        creatorId: user.id,
      };

      await api.post(`/playlists`, payload);
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
      const res = await api.get(`/playlists`);
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
      await api.delete(`/playlists/${id}`);
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
      const res = await api.get(`/playlists/${id}`);
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
      const res = await api.get(`/playlists/${id}/tracks`);
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
      const user = useUserStore.getState().user;
      if (!user) throw new Error("User not logged in");

      const payload = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        creatorId: user.id,
      };

      console.log("🔁 updatePlaylist called with:", {
        payload,
      });

      const res = await api.patch(`/playlists/${id}`, payload);
      const updatedPlaylist = res.data.data;
      console.log("Updated:", updatedPlaylist);

      const { currentPlaylist } = get();
      if (currentPlaylist && currentPlaylist.id === id) {
        set({ currentPlaylist: updatedPlaylist });
      }

      await get().fetchPlaylists();

      await get().fetchPlaylistInfo(id);
      get().resetForm();

      toast.success("Playlist updated successfully");
      document.getElementById("edit-playlist-modal")?.close();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
