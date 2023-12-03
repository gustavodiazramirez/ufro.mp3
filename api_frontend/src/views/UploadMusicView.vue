<template>
  <div class="music-uploader-container">
    <div class="music-uploader">
      <h2>Subir Música</h2>

      <form @submit.prevent="uploadMusic" class="music-form" enctype="multipart/form-data">
        <div class="form-group">
          <label for="audio">Archivo de Audio:</label>
          <input type="file" id="audio" name="audio" required>
        </div>
        <div class="form-group">
          <label for="title">Título:</label>
          <input type="text" id="title" v-model="title" required>
        </div>
        <div class="form-group">
          <label for="description">Descripción:</label>
          <textarea id="description" v-model="description" required></textarea>
        </div>
        <div class="form-group">
          <button type="submit">Subir Música</button>
        </div>
      </form>

      <!-- Mostrar mensaje de éxito o error -->
      <div v-if="uploadMessage">
        <p>{{ uploadMessage }}</p>
        <router-link to="/">Ir al Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import { Howl } from 'howler';

export default {
  data() {
    return {
      title: '',
      description: '',
      audioUrl: '',
      uploadMessage: null,
      dropzoneInitialized: false,
    };
  },
  updated() {
    // Verifica si el elemento #dropzone está en el DOM y si Dropzone aún no se ha inicializado
    if (document.getElementById('dropzone') && !this.dropzoneInitialized) {
      // Configuración de Dropzone
      const myDropzone = new Dropzone('#dropzone', {
        url: 'https://6dfa-181-172-90-126.ngrok.io/upload',
        acceptedFiles: 'audio/*',
        addRemoveLinks: true,
        init: function () {
          this.on('complete', function (file) {
            const response = JSON.parse(file.xhr.response);
            if (response.message === 'Archivo subido con éxito') {
              this.uploadMessage = response.message;
            } else {
              this.uploadMessage = 'Error al subir el archivo';
            }
            const audioUrl = response.audioUrl;
            const sound = new Howl({ src: [audioUrl] });
            sound.play();
          });
        },
      });

      // Marca Dropzone como inicializado
      this.dropzoneInitialized = true;
    }
  },
  methods: {
    async uploadMusic() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('audio', document.getElementById('audio').files[0]);

      try {
        const response = await fetch('https://6dfa-181-172-90-126.ngrok.io/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (response.ok) {
          this.audioUrl = data.audioUrl;
          this.title = data.title;  // Agrega esta línea para obtener el título
          this.description = data.description;  // Agrega esta línea para obtener la descripción
          alert('Archivo subido con éxito');
          // Aquí puedes redirigir al usuario a la página principal o a donde desees.
          // Por ejemplo:
          this.$router.push('/');
        } else {
          alert('Error al subir el archivo. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error interno del servidor. Por favor, inténtalo de nuevo.');
      }
    },
  },
};
</script>

 
<style scoped>
.music-uploader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.music-uploader {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.dropzone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.music-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .music-uploader {
    max-width: 100%;
  }
}
</style>