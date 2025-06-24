import React, { useEffect } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import EditPlaylistModal from "../components/EditPlaylistModal";

function PlaylistPage() {
  const {
    currentPlaylist,
    tracks,
    loading,
    error,
    fetchPlaylistInfo,
    fetchPlaylistTracks,
    setFormData,
  } = usePlaylistStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPlaylistInfo(id).then(() => {
        const playlist = usePlaylistStore.getState().currentPlaylist;
        if (playlist) {
          setFormData({
            name: playlist.name,
            description: playlist.description,
            image: playlist.image,
            creatorId: playlist.creatorId,
          });
        }
      });
      fetchPlaylistTracks(id);
    }
  }, [id]);

  if (loading && !currentPlaylist) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  if (!currentPlaylist) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/playlist")}
        className="btn btn-ghost mb-4"
      >
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Playlists
      </button>

      {/* Playlist Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-40 h-40 bg-base-200 rounded-lg overflow-hidden">
          <img
            src={currentPlaylist.image}
            alt={currentPlaylist.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold">{currentPlaylist.name}</h2>
          <p className="text-gray-500 mt-2">{currentPlaylist.description}</p>

          {/* Edit Button */}
          <button
            onClick={() =>
              document.getElementById("edit-playlist-modal").showModal()
            }
            className="btn btn-outline btn-sm mt-4"
          >
            <PencilIcon className="size-4 mr-1" />
            Edit Playlist
          </button>
        </div>
      </div>

      {/* Tracks List with Album Art */}
      <div className="space-y-4">
        {tracks.length === 0 ? (
          <p className="text-gray-400 text-center">
            No tracks in this playlist yet.
          </p>
        ) : (
          tracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-4 bg-base-100 rounded shadow"
            >
              <img
                src={track.cover_url || "https://via.placeholder.com/80"}
                alt={track.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium">{track.title}</h3>
                <p className="text-sm text-gray-500">{track.artist}</p>
              </div>
              <span className="text-sm text-gray-400">#{index + 1}</span>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <EditPlaylistModal playlistId={currentPlaylist.id} />
    </div>
  );
}

export default PlaylistPage;
