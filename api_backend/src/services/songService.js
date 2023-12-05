const db = require('../models/songModel');

exports.uploadSong = async (title, description, audioUrl, imageUrl) => {
  try {
    const songId = await db.insertSong(title, description, audioUrl, imageUrl);
    return {
      songId,
      title,
      description,
      audioUrl: `http://localhost:${process.env.PORT || 3000}/uploads/${audioUrl}`,
      imageUrl: `http://localhost:${process.env.PORT || 3000}/uploads/${imageUrl}`,
    };
  } catch (error) {
    throw new Error(`Error al subir la canción: ${error.message}`);
  }
};

exports.deleteAllSongs = async () => {
  try {
    await db.deleteAllSongs();
    return 'Todas las canciones y archivos eliminados con éxito';
  } catch (error) {
    throw new Error(`Error al eliminar todas las canciones: ${error.message}`);
  }
};

exports.getAllSongs = async () => {
  try {
    const songs = await db.getAllSongs();
    return songs;
  } catch (error) {
    throw new Error(`Error al obtener las canciones: ${error.message}`);
  }
};
