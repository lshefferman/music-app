import React, { useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useTrackStore } from "../store/useTrackStore";

function AddToPlaylistDropdown({ trackId }) {
  const playlists = usePlaylistStore((state) => state.playlists);
  const addTrackToPlaylist = useTrackStore((state) => state.addTrackToPlaylist);
  const [open, setOpen] = useState(false);

  const handleAdd = (playlistId) => {
    addTrackToPlaylist(playlistId, trackId);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn btn-sm btn-primary"
      >
        Add to Playlist
      </button>

      {open && (
        <ul className="absolute mt-2 bg-violet-500 border rounded shadow-md z-10 max-h-60 overflow-auto w-48">
          {playlists.length === 0 && <li className="p-2">No playlists</li>}
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleAdd(playlist.id)}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddToPlaylistDropdown;
