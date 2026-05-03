const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/plugins', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'plugins.json'), 'utf8');
    const plugins = JSON.parse(data);
    res.json(plugins);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load plugins data' });
  }
});

app.get('/api/plugins/top', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'plugins.json'), 'utf8');
    const plugins = JSON.parse(data);
    res.json(plugins.plugins);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load top plugins' });
  }
});

app.get('/api/plugins/meta', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'plugins.json'), 'utf8');
    const plugins = JSON.parse(data);
    res.json(plugins.meta);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load meta data' });
  }
});

app.get('/api/ecosystem', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'plugins.json'), 'utf8');
    const plugins = JSON.parse(data);
    res.json(plugins.ecosystem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load ecosystem data' });
  }
});

// Catch-all for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 OpenCode Plugins App running at http://localhost:${PORT}`);
});
