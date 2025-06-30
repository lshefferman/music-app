import React from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import {
  AlignJustify,
  ImageIcon,
  Music3,
  PencilIcon,
  User2Icon,
} from "lucide-react";

function EditPlaylistModal({ playlistId }) {
  const { formData, setFormData, updatePlaylist, loading } = usePlaylistStore();

  return (
    <dialog id="edit-playlist-modal" className="modal">
      <div className="modal-box">
        {/* Close button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            X
          </button>
        </form>

        {/* Modal header */}
        <h3 className="font-bold text-xl mb-8">Edit playlist</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePlaylist(playlistId);
          }}
          className="space-y-6"
        >
          <div className="grid gap-6">
            {/* Playlist name input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Playlist Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Music3 className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter playlist name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Description
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <AlignJustify className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter playlist description"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Image URL
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary"
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Is collaborative button */}
            <input
              type="checkbox"
              checked={formData.is_collaborative}
              onChange={(e) =>
                setFormData({ ...formData, is_collaborative: e.target.checked })
              }
            />
            <label>Make Collaborative</label>
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button method="dialog" className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary min-w-[120px]">
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PencilIcon className="size-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default EditPlaylistModal;
