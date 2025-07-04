import React from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import {
  AlignJustify,
  ImageIcon,
  Music3,
  PlusCircleIcon,
  User2Icon,
} from "lucide-react";

function AddPlaylistModal() {
  const { addPlaylist, formData, setFormData, loading } = usePlaylistStore();

  return (
    <dialog id="add-playlist-modal" className="modal">
      <div className="modal-box">
        {/* Close button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            X
          </button>
        </form>

        {/* Modal header*/}
        <h3 className="font-bold text-xl mb-8">Create a new playlist</h3>

        <form onSubmit={addPlaylist} className="space-y-6">
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
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Playlist description input */}
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
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Playlist image */}
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
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Make Collaborative checkbox */}
            <div className="form-control flex items-center space-x-3 mt-4">
              <input
                type="checkbox"
                id="is_collaborative"
                checked={formData.is_collaborative}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_collaborative: e.target.checked,
                  })
                }
                className="checkbox checkbox-primary"
              />
              <label
                htmlFor="is_collaborative"
                className="label-text text-base font-medium"
              >
                Make Collaborative
              </label>
            </div>
          </div>

          {/* Modal actions */}
          <div className="modal-action">
            <button method="dialog" className="btn btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.name ||
                !formData.description ||
                !formData.image ||
                loading
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Playlist
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddPlaylistModal;
