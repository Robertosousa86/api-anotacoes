const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('www'));
app.use(express.json());

const PORT = 3000;

const notes = [];

app.get('/', (req, res) => {
  res.send('Hello API!');
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.get('/notes/:id', (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ message: 'Informe o campo id.' });

  const note = notes.find((n) => n.id === id);

  if (!note)
    return res
      .status(404)
      .json({ message: 'Nenhuma anotação encontrada com esse id.' });

  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { title, description } = req.body;

  if (!title)
    return res.status(400).json({ message: 'Informe o campo título.' });

  if (!description)
    return res.status(400).json({ message: 'Informe o campo descrição.' });

  notes.push({ id: uuidv4(), title, description });

  res.send({ message: 'Anotação salva com sucesso!' });
});

app.put('/notes', (req, res) => {
  const { id, title, description } = req.body;

  if (!id) return res.status(400).json({ message: 'Informe o campo id.' });

  const note = notes.find((n) => n.id === id);

  if (!note)
    return res
      .status(404)
      .json({ message: 'Nenhuma anotação encontrada com esse id.' });

  if (!title)
    return res.status(400).json({ message: 'Informe o campo título.' });

  if (!description)
    return res.status(400).json({ message: 'Informe o campo descrição.' });

  for (noteObjects of notes) {
    if (noteObjects.id === id) {
      noteObjects.title = title;
      noteObjects.description = description;
    }
  }

  res.send({ message: 'Anotação alterada com sucesso!' });
});

app.delete('/notes', (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'Informe o campo id.' });

  const note = notes.find((n) => n.id === id);

  if (!note)
    return res
      .status(404)
      .json({ message: 'Nenhuma anotação encontrada com esse id.' });

  for (index in notes) {
    if (notes[index].id === id) notes.splice(index, 1);
  }

  res.send({ message: 'Anotação excluída com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`App listen at http://localhost:${PORT}`);
});
