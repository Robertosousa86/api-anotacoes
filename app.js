const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

const notes = [];

app.get('/', (req, res) => {
  res.send('Hello API!');
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { title, description } = req.body;

  if (!title)
    return res.status(400).json({ message: 'Informe o campo título.' });

  if (!description)
    return res.status(400).json({ message: 'Informe o campo descrição.' });

  notes.push({ title, description });

  res.send({ message: 'Anotação salva com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`App listen at http://localhost:${PORT}`);
});
