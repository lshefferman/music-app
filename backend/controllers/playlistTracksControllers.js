import { createPlaylistTrackService } from "../models/playlistTracksModel.js";

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
  const { trackId, position, userId } = req.body;
  // const userId = req.user.id; // from auth middleware when added

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
