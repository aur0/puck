CREATE TABLE images (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Original image URLs
  original_url TEXT NOT NULL,
  original_medium_url TEXT,
  original_thumbnail_url TEXT,

  -- WebP image URLs
  webp_url TEXT NOT NULL,
  webp_medium_url TEXT,
  webp_thumbnail_url TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
