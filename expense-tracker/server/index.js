const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mock database
let entries = [];

// Get all entries
app.get('/api/entries', (req, res) => {
  res.json(entries);
});

// Add new entry
app.post('/api/entries', (req, res) => {
  const newEntry = {
    ...req.body,
    id: Date.now(),
    timestamp: new Date(req.body.date).getTime() || Date.now()
  };
  entries.push(newEntry);
  res.status(201).json(newEntry);
});

// Delete entry
app.delete('/api/entries/:id', (req, res) => {
  entries = entries.filter(entry => entry.id !== parseInt(req.params.id));
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));