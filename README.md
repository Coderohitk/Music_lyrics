# 🎵 LyricStream - Music Lyrics Finder

LyricStream is a web application that allows users to search for songs, view lyrics (when available) and save their favorite tracks. It integrates with the Spotify API for music metadata and the Lyrics.ovh API for lyrics.

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js (v18 or higher recommended)
- NPM

### 🔧 Installation

1. Clone the repository or unzip the project folder:
   ```bash
   git clone https://github.com/your-username/lyricstream.git
   cd lyricstream
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and paste the following:
```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

These are required for accessing Spotify's API. 

---

## 🛠 Technologies Used

- Node.js
- Express.js
- Pug (Template Engine)
- Spotify Web API
- Lyrics.ovh API (for lyrics)


---

## 🎯 Features

- 🔍 Search songs by title, artist, and genre
- 📃 View full song lyrics (when available)
- ⭐ Save and manage your favorite tracks
- 🎨 Clean, responsive UI with custom styles

---



Enjoy streaming and reading lyrics with **LyricStream** 🎶
