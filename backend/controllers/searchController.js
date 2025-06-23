import { searchService } from "../models/searchModel.js";
import getSpotifyAccessToken from "../services/spotify.js";

// Standard response
const handleResponse = (res, _status, message, data = null) => {
  res.status(_status).json({
    _status,
    message,
    data,
  });
};

export const searchTrack = async (req, res, next) => {
  const query = req.query.q;
  const token = await getSpotifyAccessToken();

  try {
    const newTrack = await searchService(query, token);
    handleResponse(res, 200, "Track fecthed successfully", newTrack);
  } catch (err) {
    next(err);
  }
};
