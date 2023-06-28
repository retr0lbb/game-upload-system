const Game = require('../model/classes/game.class');
const fs = require("fs");
const path = require('path');
const express = require("express");
const multer = require('multer');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'model', 'gamesBd'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.send("Olá mundo!");
});

app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "index.html"));
});

app.post('/post', upload.single('fileGame'), (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const descriptions = req.body.descriptions;
  const file = req.file;

  const game = new Game(name, price, descriptions, file);
  game.insertGame();

  res.send("Jogo postado com sucesso!");
});

app.listen(PORT, () => {
  console.log("App rodando na porta 3000");
});