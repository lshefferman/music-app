import { EditIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { usePlaylistStore } from "../store/usePlaylistStore";

function PlaylistCard({ playlist }) {
  const { deletePlaylist } = usePlaylistStore();

  return (
    <div className="card card-side bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
      {/* Playlist Image */}
      <figure className="w-48 h-48 overflow-hidden rounded-l-xl">
        <img
          src={playlist.image || "https://via.placeholder.com/200"}
          alt={playlist.name}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Playlist Info */}
      <div className="card-body flex-1">
        <Link
          to={`/playlist/${playlist.id}`}
          className="card-title text-xl font-semibold hover:underline hover:text-primary transition"
        >
          {playlist.name}
        </Link>
        <p className="text-base text-gray-500">{playlist.description}</p>

        <div className="card-actions justify-end mt-auto">
          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => deletePlaylist(playlist.id)}
          >
            <Trash2Icon className="size-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCard;
