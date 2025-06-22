import {
  createPlaylistService,
  deletePlaylistService,
  editPlaylistService,
  getPlaylistByIdService,
  getPlaylistsService,
} from "../models/playlistModel.js";

// Standard response
const handleResponse = (res, _status, message, data = null) => {
  res.status(_status).json({
    _status,
    message,
    data,
  });
};

// update for playlist model
export const createPlaylist = async (req, res, next) => {
  const { name, description, creatorId } = req.body;

  try {
    const newPlaylist = await createPlaylistService(
      name,
      description,
      creatorId
    );
    handleResponse(res, 201, "Playlist created successfully", newPlaylist);
  } catch (err) {
    next(err);
  }
};

export const getPlaylists = async (req, res, next) => {
  try {
    const playlists = await getPlaylistsService();
    handleResponse(res, 200, "Playlists fetched successfully", playlists);
  } catch (err) {
    next(err);
  }
};

export const getPlaylist = async (req, res, next) => {
  try {
    const playlist = await getPlaylistByIdService(req.params.id);
    if (!playlist) return handleResponse(res, 404, "Playlist not found");
    handleResponse(res, 200, "Playlist fetched successfully", playlist);
  } catch (err) {
    next(err);
  }
};

export const editPlaylist = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const updatedPlaylist = await editPlaylistService(
      req.params.id,
      name,
      description
    );
    if (!updatedPlaylist) return handleResponse(res, 404, "Playlist not found");
    handleResponse(res, 200, "Playlist updated successfully", updatedPlaylist);
  } catch (err) {
    next(err);
  }
};

export const deletePlaylist = async (req, res, next) => {
  try {
    const deletedPlaylist = await deletePlaylistService(req.params.id);
    if (!deletedPlaylist) return handleResponse(res, 404, "Playlist not found");
    handleResponse(res, 200, "Playlist updated successfully", deletedPlaylist);
  } catch (err) {
    next(err);
  }
};
