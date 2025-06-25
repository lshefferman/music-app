-- users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT NOW()
)

-- playlists
CREATE TABLE IF NOT EXISTS playlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT, 
    image TEXT,
    creator_id UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT true,
    is_collaborative BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
)

-- playlist_collaborators
CREATE TABLE IF NOT EXISTS playlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pplaylist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'editor', -- could be 'owner', 'editor', 'viewer'
    added_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (playlist_id, user_id)
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
  added_by UUID REFERENCES users(id),
  position INT,
  added_at TIMESTAMP DEFAULT now()
);