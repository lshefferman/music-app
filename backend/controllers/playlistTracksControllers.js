import {
  createPlaylistTrackService,
  getPlaylistTrackService,
  deletePlaylistTrackService,
} from "../models/playlistTracksModel.js";

// Standard response
const handleResponse = (res, _status, message, data = null) => {
  res.status(_status).json({
    _status,
    message,
    data,
  });
};

export const createPlaylistTrack = async (req, res, next) => {
  const { playlistId } = req.params;
  const { trackId, position } = req.body;
  const userId = req.user.id;

  try {
    const newPlaylistTrack = await createPlaylistTrackService(
      playlistId,
      trackId,
      userId,
      position
    );
    handleResponse(
      res,
      201,
      "Playlist track created successfully",
      newPlaylistTrack
    );
  } catch (err) {
    next(err);
  }
};

export const getPlaylistTracks = async (req, res, next) => {
  const { playlistId } = req.params;

  try {
    const playlistTracks = await getPlaylistTrackService(playlistId);
    handleResponse(
      res,
      200,
      "Playlist tracks fetched successfully",
      playlistTracks
    );
  } catch (err) {
    next(err);
  }
};

export const deletePlaylistTrack = async (req, res, next) => {
  const { playlistId, trackId } = req.params;
  const userId = req.user.id;

  try {
    const deletedPlaylistTrack = await deletePlaylistTrackService(
      playlistId,
      trackId
    );
    if (!deletedPlaylistTrack) {
      return handleResponse(res, 404, "Track not found in this playlist");
    }
    handleResponse(
      res,
      200,
      "Playlist track deleted successfully",
      deletedPlaylistTrack
    );
  } catch (err) {
    next(err);
  }
};
