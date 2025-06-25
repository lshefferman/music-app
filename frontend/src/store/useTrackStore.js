import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:13333";

export const useTrackStore = create((set) => ({
  searchResults: [],
  loading: false,
  error: null,
  query: "",

  setQuery: (query) => set({ query }),

  resetQuery: () => set({ query: "" }),

  searchTracks: async (query) => {
    if (!query) {
      set({ searchResults: [], error: null });
      return;
    }
    set({ loading: true });
    try {
      const res = await axios.get(
        `${BASE_URL}/api/search?q=${encodeURIComponent(query)}`
      );
      set({ searchResults: res.data.data, error: null });
    } catch (err) {
      set({ error: "Failed to fetch tracks" });
    } finally {
      set({ loading: false });
    }
  },

  addTrackToPlaylist: async (playlistId, trackId) => {
    try {
      set({ loading: true });
      await axios.post(`${BASE_URL}/api/playlists/${playlistId}/tracks`, {
        trackId,
      });
      toast.success("Track added to playlist");
    } catch (err) {
      toast.error("Failed to add track to playlist");
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));
