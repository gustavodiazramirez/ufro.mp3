<template>
  <div class="song-card">
    <div class="song-info">
      <div class="song-image">
        <img :src="getImageUrl(song.imageUrl)" alt="Song Image" />
      </div>
      <div class="song-details">
        <button @click="confirmDelete" class="delete-button">Eliminar</button>
        <h3 class="song-title">{{ song.title }}</h3>
        <p class="song-description">{{ song.description }}</p>
        <audio :src="getAudioUrl(song.audioUrl)" controls class="audio-player"></audio>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>¿Estás seguro de que quieres eliminar esta canción?</p>
        <button @click="deleteSong" class="confirm-button">Sí</button>
        <button @click="cancelDelete" class="cancel-button">Cancelar</button>
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
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    getAudioUrl(filename) {
      return `http://localhost:3000/uploads/${filename}`;
    },

    getImageUrl(filename) {
      return `http://localhost:3000/uploads/${filename}`;
    },

    confirmDelete() {
      // Mostrar el modal de confirmación
      this.showModal = true;
    },

    cancelDelete() {
      // Ocultar el modal de confirmación
      this.showModal = false;
    },

    async deleteSong() {
      try {
        await fetch(`http://localhost:3000/songs/${this.song.id}`, {
          method: 'DELETE',
        });

        // Después de eliminar la canción, actualiza la lista local
        this.$emit('songDeleted', this.song.id);

        // Ocultar el modal de confirmación después de eliminar
        this.showModal = false;

        // Recargar la página
        location.reload();
      } catch (error) {
        console.error('Error al eliminar la canción:', error);
      }
    },

  },
};
</script>

<style scoped>
.delete-button {
  background-color: #ff4b5c;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  float: right;
}

.song-card {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  /* Cambiado a columna para centrar verticalmente */
  /* Centra horizontalmente */
  margin: 20px auto;
  /* Margen superior e inferior, y centrado horizontal */
}

.song-card:hover {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  /* Ajusta el ancho máximo según tus necesidades */
  max-height: 300px;
  /* Ajusta el alto máximo según tus necesidades */
}


.confirm-button,
.cancel-button {
  background-color: #ff4b5c;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px;
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
    margin-top: 4%;
    /* Ajusta la distancia desde la parte superior en dispositivos móviles */
  }


  .song-image {
    width: 50%;
    border-radius: 8px 8px 0 0;
  }
}</style>
