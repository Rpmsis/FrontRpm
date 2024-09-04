<template>
  <v-container>
    <v-dialog v-model="carga" width="500">
      <v-card>
        <v-card-text class="text-h6 text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            indeterminate
            color="purple"
          ></v-progress-circular>
          <h3>Cargando por favor espere..</h3>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h4">
          {{ Titulo }}
        </v-card-title>

        <v-card-text class="text-h6 text-center">
          {{ Mensaje }}
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="reset()"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1 class="text-center">Subir foto</h1>
    <v-card class="mx-auto" tile>
      <v-form ref="form" @submit.prevent="Enviar_Ticket">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <center>
              <img
                v-if="imagePreview1"
                :width="200"
                :height="200"
                aspect-ratio="16/9"
                cover
                :src="imagePreview1"
                alt="Vista previa de la imagen"
              />
            </center>
            <v-file-input
              counter
              show-size
              label="Adjuntar datos"
              v-model="Solicitud.archivo"
              @change="updateImagePreview"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <center>
              <img
                v-if="imagePreview2"
                :width="200"
                :height="200"
                aspect-ratio="16/9"
                cover
                :src="imagePreview2"
                alt="Vista previa de la imagen"
              />
            </center>
            <v-file-input
              counter
              show-size
              label="Adjuntar datos"
              v-model="Solicitud.archivo2"
              @change="updateImagePreview2"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <center>
              <img
                v-if="imagePreview3"
                :width="200"
                :height="200"
                aspect-ratio="16/9"
                cover
                :src="imagePreview3"
                alt="Vista previa de la imagen"
              />
            </center>
            <v-file-input
              counter
              show-size
              label="Adjuntar datos"
              v-model="Solicitud.archivo3"
              @change="updateImagePreview3"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <center>
              <img
                v-if="imagePreview4"
                :width="200"
                :height="200"
                aspect-ratio="16/9"
                cover
                :src="imagePreview4"
                alt="Vista previa de la imagen"
              />
            </center>
            <v-file-input
              counter
              show-size
              label="Adjuntar datos"
              v-model="Solicitud.archivo4"
              @change="updateImagePreview4"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-btn color="success" class="mr-4" type="submit" block> Enviar </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: "barra",
  data() {
    return {
      dialog: false,
      Titulo: "",
      Mensaje: "",
      carga: false,
      imagePreview1: null,
      imagePreview2: null,
      imagePreview3: null,
      imagePreview4: null,
      Solicitud: {
        nombre1:"Probando datos1",
        archivo: null,
        archivo2: null,
        archivo3: null,
        archivo4: null,
        nombre2:"Probando datos2",
      },
    };
  },
  methods: {
    updateImagePreview() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview1 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview1 = null;
      }
    },
    updateImagePreview2() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo2;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview2 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview2 = null;
      }
    },
    updateImagePreview3() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo3;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview3 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview3 = null;
      }
    },
    updateImagePreview4() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo4;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview4 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview4 = null;
      }
    },
    async Enviar_Ticket() {
      const formulario = new FormData();
      formulario.append("archivo", this.Solicitud.archivo);
      formulario.append("archivo2", this.Solicitud.archivo2);
      formulario.append("archivo3", this.Solicitud.archivo3);
      formulario.append("archivo4", this.Solicitud.archivo4);
      formulario.append("dato1", this.Solicitud.nombre1);
      formulario.append("dato2", this.Solicitud.nombre2);
      const res = await fetch("http://localhost:3001/insertarComida", {
        method: "POST",
        headers: {
          token: localStorage.token,
        },
        body: formulario,
      });
      const datos = await res.json();
      if (res.status == 404) {
        /* this.Titulo = datos.mensaje;
        this.Mensaje = datos.ticket; */
      } else {
        /* this.Titulo = datos.mensaje;
        this.Mensaje = datos.ticket; */
      }
    },
  },
  reset() {
    this.dialog = false;
    this.Solicitud.archivo = null;
    this.imagePreview1 = null;
  },
};
</script>
