<template>
  <div class="song-card">
    <div class="song-info">
      <div class="song-image">
        <img :src="getImageUrl(song.imageUrl)" alt="Song Image" />
      </div>
      <div class="song-details">
        <h3 class="song-title">{{ song.title }}</h3>
        <p class="song-description">{{ song.description }}</p>
        <audio :src="getAudioUrl(song.audioUrl)" controls class="audio-player"></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getAudioUrl(filename) {
      return `http://localhost:3000/uploads/${filename}`;
    },

    getImageUrl(filename) {
      return `http://localhost:3000/uploads/${filename}`;
    },
  },
};
</script>

<style scoped>
.song-card {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column; /* Cambiado a columna para centrar verticalmente */
  align-items: center; /* Centra horizontalmente */
  margin: 20px auto; /* Margen superior e inferior, y centrado horizontal */
}

.song-card:hover {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
}

.song-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  text-align: left;
}

.song-info {
  display: flex;
  text-align: left;

}

.song-image {
  width: 20%; 
}

.song-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-details {
  flex: 1;
  padding: 15px;
}

.song-description {
  color: #000000;
}

.audio-player {
  width: 550px;
}

@media screen and (max-width: 600px) {
  .audio-player {
    margin-top: 4%; /* Ajusta la distancia desde la parte superior en dispositivos móviles */
  }


  .song-image {
    width: 50%;
    border-radius: 8px 8px 0 0;
  }
}
</style>
