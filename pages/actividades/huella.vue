<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row>
            <v-col cols="12" md="6">
              <v-btn @click="takePicture" color="red">Tomar Foto</v-btn>
              <video ref="video" width="100%" height="50%" autoplay></video>
            </v-col>
            <v-col cols="12" md="6">
              <canvas ref="canvas" style="display: none"></canvas>
              <img v-if="photo" :src="photo" alt="Foto Capturada" width="100%" height="100%"/>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

/* Fijoo */
<script>
export default {
  layout: "barra",
  data() {
    return {
      photo: null,
    };
  },
  mounted() {
    if (process.client) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.startCamera();
      } else {
        console.error(
          "No se puede acceder a la cámara: navigator.mediaDevices.getUserMedia no está disponible."
        );
      }
    }
    console.log(navigator.mediaDevices);
  },

  computed: {},
  methods: {
    // Iniciar la cámara
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.$refs.video.srcObject = stream;

        // Verificar que la cámara esté lista
        this.$refs.video.onloadedmetadata = () => {
          this.$refs.video.play();
        };
      } catch (err) {
        console.error("Error al acceder a la cámara", err);
      }
    },

    // Tomar una foto
    takePicture() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      const video = this.$refs.video;

      // Establecer las dimensiones del canvas
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Dibujar el fotograma del video en el canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Obtener la imagen como base64
      this.photo = canvas.toDataURL();
      console.log("foto obtenida= ",this.photo);

      // Opcionalmente, puedes enviar la imagen al servidor aquí
      // this.uploadPhoto(this.photo);
    },
  },
};
</script>

<style>
.layout.wrap {
  justify-content: center;
}
.v-card__title {
  justify-content: center !important;
  font-size: 30px !important;
}
.row {
  padding: 0px 10px 0px 10px;
}
.btnEnviar {
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}
.btn-success {
  background-color: green;
  color: white;
}

.btn-warning {
  background-color: orange;
  color: white;
}

.btn-error {
  background-color: red;
  color: white;
}
</style>
