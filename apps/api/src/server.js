// Express server for Chords API
// Serves hard-coded songs data

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Hard-coded songs data
const songs = [
    {
        id: "you-are-my-sunshine",
        title: "You Are My Sunshine",
        artist: "Traditional",
        lyrics: "[C]You are my sunshine, my only sunshine\n[C]You make me happy when [G]skies are [C]gray\n[C]You'll never know dear, how [F]much I [C]love you\n[F]Please don't take my [C]sunshine [G]away"
    },
    {
        id: "stand-by-me",
        title: "Stand By Me",
        artist: "Ben E. King",
        lyrics: "[C]When the night has come\n[Am]And the land is dark\n[F]And the moon is the only [G]light we'll see\n[C]No I won't be afraid\n[Am]Oh, I won't be afraid\n[F]Just as long as you [G]stand, stand by [C]me"
    },
    {
        id: "hallelujah",
        title: "Hallelujah",
        artist: "Leonard Cohen",
        lyrics: "[C]I've heard there was a [Am]secret chord\n[F]That David played, and it [G]pleased the Lord\n[C]But you don't really [Am]care for music, do you?\n[F]Well it goes like [G]this\nThe [C]fourth, the [Am]fifth\nThe [F]minor fall, the [G]major lift\nThe [C]baffled king composing [Am]Hallelujah"
    },
    {
        id: "wonderwall",
        title: "Wonderwall",
        artist: "Oasis",
        lyrics: "[Em]Today is gonna be the [G]day\n[D]That they're gonna throw it [C]back to you\n[Em]By now you should've [G]somehow\n[D]Realized what you gotta [C]do\n[Em]I don't believe that [G]anybody\n[D]Feels the way I [C]do about you now"
    }
];

// Routes

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Chords API is running' });
});

// Get all songs
app.get('/songs', (req, res) => {
    res.json(songs);
});

// Get song by ID
app.get('/songs/:id', (req, res) => {
    const song = songs.find(s => s.id === req.params.id);
    if (!song) {
        return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
});

// Search songs
app.get('/search', (req, res) => {
    const query = req.query.q?.toLowerCase();
    if (!query) {
        return res.json(songs);
    }
    
    const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.lyrics.toLowerCase().includes(query)
    );
    
    res.json(filteredSongs);
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎵 Chords API server running on port ${PORT}`);
    console.log(`📚 Available songs: ${songs.length}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`🎼 Songs endpoint: http://localhost:${PORT}/songs`);
});
