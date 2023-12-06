const fs = require('fs');
const path = require('path');
const songService = require('../services/songService');

exports.upload = async (req, res) => {
  try {
    const { title, description } = req.body;
    const audioFile = req.files['audio'][0].filename;
    const imageFile = req.files['image'][0].filename;

    const result = await songService.uploadSong(title, description, audioFile, imageFile);

    res.json({
      message: 'Archivo subido con éxito',
      ...result,
    });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
exports.deleteAllSongs = async (req, res) => {
  try {
    const songs = await songService.getAllSongs();
    for (const song of songs) {
      const audioPath = path.join(__dirname, '../uploads', song.audioUrl);
      const imagePath = path.join(__dirname, '../uploads', song.imageUrl);
      
      fs.unlinkSync(audioPath);
      fs.unlinkSync(imagePath);
    }

    // Eliminar canciones de la base de datos
    const result = await songService.deleteAllSongs();
    
    res.json({ message: result });
  } catch (error) {
    console.error('Error al eliminar todas las canciones de la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.getAllSongs = async (req, res) => {
  try {
    const songs = await songService.getAllSongs();
    res.json(songs);
  } catch (error) {
    console.error('Error al obtener las canciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
