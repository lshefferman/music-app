-- playlists
CREATE TABLE IF NOT EXISTS playlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    description TEXT, 
    image TEXT,
    -- creator_id UUID REFERENCES users(id),
    creator_id INT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
)

-- tracks
CREATE TABLE IF NOT EXISTS tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  isrc TEXT UNIQUE,
  title TEXT,
  artist TEXT,
  album TEXT,
  spotify_id TEXT,
  -- apple_music_id TEXT,
  duration_ms INT,
  cover_url TEXT
);


-- playlist_tracks
CREATE TABLE IF NOT EXISTS playlist_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id),
  -- added_by UUID REFERENCES users(id),
  added_by INT,
  position INT,
  added_at TIMESTAMP DEFAULT now()
);