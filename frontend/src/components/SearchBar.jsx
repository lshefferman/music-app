import React, { useState, useEffect } from "react";
import { useTrackStore } from "../store/useTrackStore";
import AddToPlaylistDropdown from "./AddToPlaylistDropdown";

function SearchBar() {
  const [query, setQuery] = useState("");
  const { searchTracks, searchResults, loading, error } = useTrackStore();

  useEffect(() => {
    if (query.trim() === "") {
      searchTracks("");
    } else {
      const timeout = setTimeout(() => {
        searchTracks(query);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [query, searchTracks]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search tracks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input input-bordered w-full max-w-lg"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {searchResults.map((track) => (
          <li key={track.id} className="flex justify-between items-center">
            <span>
              {track.title} — {track.artist}
            </span>
            <AddToPlaylistDropdown trackId={track.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
