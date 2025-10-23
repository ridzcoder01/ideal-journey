// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const pairRouter = require('./routes/pair');

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.use('/code', pairRouter);

// Default 404 fallback for unknown routes
app.use((req, res) => res.status(404).send('404: Not Found'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NEBULA-MD Pair Server running at http://localhost:${PORT}`);
});