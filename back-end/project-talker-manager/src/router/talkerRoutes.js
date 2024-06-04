const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateQRate,
  validateWatchedDate,
  validateRatePatch,
} = require('../middlewares/validateTalker');
const { getSearch } = require('../utils/searchUtil');
const talkerDB = require('../db/talkerDB');

const talkerPath = path.resolve(__dirname, '../talker.json');

const router = express.Router();

const readFile = async (_req, _res) => {
  try {
    const talkerJson = await fs.readFile(talkerPath);
    return JSON.parse(talkerJson);
  } catch (err) {
    console.err(`Arquivo nao pode ser lido: ${err}`);
  }
};

router.get('/db', async (req, res) => {
  const [result] = await talkerDB.findAll();
  const talkers = result.map((talk) => ({
      id: talk.id,
      name: talk.name,
      age: talk.age,
      talk: { rate: talk.talk_rate,
      watchedAt: talk.talk_watched_at },
    }));
  return res.status(200).json(talkers);
});

router.get('/search',
  validateToken,
  validateQRate,
  validateWatchedDate, async (req, res) => {
  const { q: query, rate, date } = req.query;
  let talkers = await readFile();
  if (query === undefined && rate === undefined && date === undefined) {
    return res.status(200).json([]);
  }
  talkers = getSearch(query, rate, date, talkers);
  return res.status(200).json(talkers);
});

router.get('/', async (_req, res) => {
  try {
    const palestrantes = await readFile();
    res.status(200).json(palestrantes);
  } catch (_err) {
    return [];
  }
});

router.patch('/rate/:id',
  validateToken,
  validateRatePatch, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const talkers = await readFile();
  const numberRate = Number(rate);
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[talkerIndex].talk.rate = numberRate;
  await fs.writeFile(talkerPath, JSON.stringify(talkers, null, 2));
  return res.status(204).json();
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerById = talkers.find((talker) => talker.id === Number(id));
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkerById);
});

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate, async (req, res) => {
    const talkers = await readFile();
    const newTalker = req.body;
    newTalker.id = talkers.length + 1;
    const updateTalkers = JSON.stringify([...talkers, newTalker]);
    await fs.writeFile(talkerPath, updateTalkers);
    res.status(201).json(newTalker);
});

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate, async (req, res) => {
  const { id } = req.params;
  const newTalker = req.body;
  const talkers = await readFile();
  const findTalker = talkers.find((person) => person.id === Number(id));
  if (!findTalker) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  const removeTalker = talkers.filter((talker) => talker.id !== Number(id));
  newTalker.id = Number(id);
  const updateTalkers = JSON.stringify([...removeTalker, newTalker]);
  await fs.writeFile(talkerPath, updateTalkers);
  return res.status(200).json(newTalker);
});

router.delete('/:id',
  validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const removeTalker = talkers.filter((talker) => talker.id !== Number(id));
  const updateTalkers = JSON.stringify([...removeTalker]);
  await fs.writeFile(talkerPath, updateTalkers);
  res.status(204).end();
});

module.exports = router;