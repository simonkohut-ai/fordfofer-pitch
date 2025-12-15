const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json({ limit: '1mb' }));

// Simple health check
app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'chiara-mcp', status: 'healthy' });
});

// MCP endpoint echo/mock
app.post('/mcp', (req, res) => {
  console.log('[MCP] incoming request:', req.body);
  res.json({
    success: true,
    service: 'chiara-mcp',
    message: 'Chiara MCP mock bezi',
    received: req.body || {}
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Chiara MCP server running on http://localhost:${port}/mcp`);
});


