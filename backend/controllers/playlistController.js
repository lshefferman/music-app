import { addCollaboratorService } from "../models/collaboratorModel.js";
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

export const createPlaylist = async (req, res, next) => {
  const { name, description, image, isCollaborative } = req.body;
  const creatorId = req.user.id;

  try {
    const newPlaylist = await createPlaylistService(
      name,
      description,
      image,
      isCollaborative,
      creatorId
    );

    await addCollaboratorService(playlist.id, creatorId, "owner");

    handleResponse(res, 201, "Playlist created successfully", newPlaylist);
  } catch (err) {
    next(err);
  }
};

export const getPlaylists = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const playlists = await getPlaylistsService(userId);
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
  const { name, description, image } = req.body;
  try {
    const updatedPlaylist = await editPlaylistService(
      req.params.id,
      name,
      description,
      image
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
