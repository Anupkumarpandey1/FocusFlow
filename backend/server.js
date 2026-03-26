const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running for FocusFlow!' });
});

// API Routes
app.use('/api/users', require('./src/routes/users'));
app.use('/api/tasks', require('./src/routes/tasks'));
app.use('/api/sessions', require('./src/routes/sessions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

  // Auto-ping to keep Render Free tier awake
  const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL; 
  if (RENDER_EXTERNAL_URL) {
    const protocol = RENDER_EXTERNAL_URL.startsWith('https') ? require('https') : require('http');
    setInterval(() => {
      protocol.get(`${RENDER_EXTERNAL_URL}/api/health`, (res) => {
        console.log(`Self-ping Status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error(`Self-ping Error: ${err.message}`);
      });
    }, 14 * 60 * 1000); // 14 minutes
    console.log(`Keep-alive ping scheduled for ${RENDER_EXTERNAL_URL}`);
  }
});
