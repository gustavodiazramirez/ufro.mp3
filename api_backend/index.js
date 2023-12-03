const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const ngrok = require('ngrok');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://192.168.1.141:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

// Conexión a la base de datos SQLite
const db = new sqlite3.Database(':memory:');

// Crea la tabla para almacenar las canciones
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
          audioUrl: `http://localhost:${PORT}/uploads/${audioFile}`,
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

// Nuevo endpoint para eliminar todas las canciones
app.delete('/songs', (req, res) => {
  // Elimina todas las canciones de la base de datos
  db.run('DELETE FROM canciones', (err) => {
    if (err) {
      console.error('Error al eliminar todas las canciones:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    res.json({ message: 'Todas las canciones eliminadas con éxito' });
  });
});

app.use('/uploads', express.static('uploads'));

// Endpoint para obtener todas las canciones
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

// Configuración para escuchar en todas las interfaces de red
const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Servidor en http://0.0.0.0:${PORT}`);

  // Inicia Ngrok después de que el servidor se inicia
  try {
    const ngrokUrl = await ngrok.connect(PORT);
    console.log(`Ngrok URL: ${ngrokUrl}`);
  } catch (error) {
    console.error('Error al iniciar Ngrok:', error);
  }
});

// Manejar la terminación del servidor y Ngrok al salir
process.on('SIGTERM', () => {
  server.close();
  ngrok.kill();
});
