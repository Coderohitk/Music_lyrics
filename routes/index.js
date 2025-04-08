const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const favorites = [];

// Get Spotify access token
async function getSpotifyToken() {
  const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response.data.access_token;
}

// Get lyrics from lyrics.ovh (no scraping needed)
async function getLyrics(title, artist) {
  try {
    const res = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    return res.data.lyrics;
  } catch (error) {
    console.warn("Lyrics not found:", error.message);
    return null;
  }
}

router.get('/', (req, res) => {
  res.render('index', { title: 'LyricStream', results: null });
});

router.post('/search', async (req, res) => {
  const query = req.body.query;
  const genre = req.body.genre;
  try {
    const token = await getSpotifyToken();
    const spotifyRes = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: genre ? `genre:${genre} ${query}` : query, type: 'track', limit: 5 }
    });
    res.render('index', { title: 'Search Results', results: spotifyRes.data.tracks.items });
  } catch (err) {
    console.error("Spotify Search Error:", err.message);
    res.render('index', { title: 'Error', results: null });
  }
});

router.post('/song/:id', async (req, res) => {
  const { title, artist } = req.body;

  let lyrics = null;
  let preview_url = null;
  const id = req.params.id;

  try {
    lyrics = await getLyrics(title, artist);
  } catch (err) {
    console.warn("Lyrics fetch failed:", err.message);
  }

  try {
    const token = await getSpotifyToken();
    const songRes = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("🎧 Spotify song data:", songRes.data);
    preview_url = songRes.data.preview_url;
  } catch (err) {
    console.warn("Spotify track fetch failed:", err.message);
  }

  res.render('song', {
    title,
    song: { title, artist, preview_url, id },
    lyrics
  });
});

router.post('/favorite', (req, res) => {
  const { title, artist, preview_url } = req.body;
  if (!favorites.some(fav => fav.title === title && fav.artist === artist)) {
    favorites.push({ title, artist, preview_url });
  }
  res.redirect('/favorites');
});

router.get('/favorites', (req, res) => {
  res.render('favorites', { title: 'Your Favorites', favorites });
});

router.post('/remove-favorite', (req, res) => {
  const index = parseInt(req.body.index);
  if (!isNaN(index)) {
    favorites.splice(index, 1);
  }
  res.redirect('/favorites');
});

module.exports = router;