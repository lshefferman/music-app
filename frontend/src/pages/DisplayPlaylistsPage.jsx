import React, { useEffect } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { FileMusic, PlusCircleIcon } from "lucide-react";
import PlaylistCard from "../components/PlaylistCard";
import AddPlaylistModal from "../components/AddPlaylistModal";

function DisplayPlaylistsPage() {
  const { playlists, loading, error, fetchPlaylists } = usePlaylistStore();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add-playlist-modal").showModal()
          }
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add Playlist
        </button>
      </div>

      <AddPlaylistModal />

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {playlists.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <FileMusic className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No playlists found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first playlist
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}
    </main>
  );
}

export default DisplayPlaylistsPage;
