const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE canciones (id INTEGER PRIMARY KEY, title TEXT, description TEXT, audioUrl TEXT, imageUrl TEXT)');
});

exports.insertSong = (title, description, audioUrl, imageUrl) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO canciones (title, description, audioUrl, imageUrl) VALUES (?, ?, ?, ?)',
      [title, description, audioUrl, imageUrl], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
  });
};

exports.deleteSong = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM canciones WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.deleteAllSongs = () => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM canciones', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.getAllSongs = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM canciones', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.getSongById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM canciones WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};
