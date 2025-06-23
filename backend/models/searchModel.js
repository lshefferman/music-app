import fetch from "node-fetch";
import pool from "../config/db.js";

export const searchService = async (query, token) => {
  const spotifyRes = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=10`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await spotifyRes.json();
  const tracks = [];

  for (const item of data.tracks.items) {
    const {
      id: spotifyId,
      name: title,
      artists,
      album,
      external_ids,
      duration_ms,
    } = item;
    const isrc = external_ids?.isrc || null;
    const artist = artists[0]?.name;
    const coverUrl = album.images[0]?.url;

    // Check if track is already in DB
    const existing = await pool.query("SELECT * FROM tracks WHERE isrc = $1", [
      isrc,
    ]);

    let trackId;
    if (existing.rows.length > 0) {
      trackId = existing.rows[0].id;
    } else {
      const insertRes = await pool.query(
        `INSERT INTO tracks (isrc, title, artist, album, spotify_id, duration_ms, cover_url)
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [isrc, title, artist, album.name, spotifyId, duration_ms, coverUrl]
      );
      trackId = insertRes.rows[0].id;
    }

    tracks.push({ id: trackId, title, artist, album: album.name, coverUrl });
  }

  return tracks;
};
