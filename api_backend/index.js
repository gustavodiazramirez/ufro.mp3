const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://192.168.1.141:8080', 'http://localhost:8080', 'http://192.168.1.97:8080'], // Agrega la IP de tu dispositivo móvil
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE canciones (id INTEGER PRIMARY KEY, title TEXT, description TEXT, audioUrl TEXT)');
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

app.post('/upload', upload.single('audio'), (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const audioFile = req.file.filename;

    db.run('INSERT INTO canciones (title, description, audioUrl) VALUES (?, ?, ?)',
      [title, description, audioFile], async function (err) {
        if (err) {
          console.error('Error al insertar en la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
        }

        res.json({
          message: 'Archivo subido con éxito',
          audioUrl: `http://tu-direccion-ip-local:${PORT}/uploads/${audioFile}`,
          songId: this.lastID,
          title: title,
          description: description
        });
      });

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.delete('/songs', (req, res) => {
  // Elimina todas las canciones de la base de datos
  db.run('DELETE FROM canciones', (err) => {
    if (err) {
      console.error('Error al eliminar todas las canciones de la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Elimina todos los archivos de la carpeta 'uploads'
    const uploadsPath = path.join(__dirname, 'uploads');
    fs.readdirSync(uploadsPath).forEach(file => {
      const filePath = path.join(uploadsPath, file);
      fs.unlinkSync(filePath);
    });

    res.json({ message: 'Todas las canciones y archivos eliminados con éxito' });
  });
});

app.get('/songs', (req, res) => {
  db.all('SELECT * FROM canciones', (err, rows) => {
    if (err) {
      console.error('Error al obtener las canciones:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    res.json(rows);
  });
});

app.use('/uploads', express.static('uploads'));

const server = app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
