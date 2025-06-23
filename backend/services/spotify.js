import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

async function getSpotifyAccessToken() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Spotify token fetch failed: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

export default getSpotifyAccessToken;
