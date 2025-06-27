import React from "react";
import SearchBar from "../components/SearchBar";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const { playlists, fetchPlaylists } = usePlaylistStore();

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to SoundSpot</h1>

      {/* Search */}
      <SearchBar />

      {/* Featured playlists */}
      <section className="mt-10">
        <Link to={"/playlist"}>
          <h2 className="text-2xl font-semibold mb-4 hover:underline hover:text-primary transition">
            Your Playlists
          </h2>
        </Link>
        <div className="grid grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="card p-4 bg-base-200 rounded shadow"
            >
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-bold">{playlist.name}</h3>
              <p className="text-gray-500 text-sm">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
