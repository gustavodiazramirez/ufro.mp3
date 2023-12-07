const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const corsMiddleware = require('./middlewares/corsMiddleware.js');
const songController = require('./controllers/songController.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE canciones (id INTEGER PRIMARY KEY, title TEXT, description TEXT, audioUrl TEXT, imageUrl TEXT)');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), songController.upload);

app.delete('/songs/:id', songController.deleteSong); // Ruta para eliminar una canción específica
app.delete('/songs', songController.deleteAllSongs);

app.get('/songs', songController.getAllSongs);

app.use('/uploads', express.static('uploads'));

const server = app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
