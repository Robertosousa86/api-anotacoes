const express = require('express');
const app = express();
const PORT = 3000;

const notes = [];

app.get('/', (req, res) => {
  res.send('Hello API!');
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.listen(PORT, () => {
  console.log(`App listen at http://localhost:${PORT}`);
});
