<template>
  <v-container>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <center>
            <img
              v-if="imagePreview"
              :width="200"
              aspect-ratio="16/9"
              cover
              :src="imagePreview"
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
          <v-btn block outlined class="btnEnviar" type="submit" color="success">
            Guardar
          </v-btn>
        </v-col>
        <br />
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      imagePreview: null, // Añadir esta propiedad
      Solicitud: {
        archivo: null,
        archivoBase64: null,
        nombre: "",
      },
    };
  },
  methods: {
    updateImagePreview() {
      console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
          this.Solicitud.archivoBase64 = e.target.result.split(",")[1];
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview = null;
        this.Solicitud.archivoBase64 = null;
      }
    },
    async submitForm() {
      this.Solicitud.nombre= this.Solicitud.archivo.name;
      if (!this.Solicitud.archivoBase64) {
        alert("Por favor, selecciona un archivo.");
        return;
      } else {
        const res = await fetch("http://localhost:3001/insertarComida", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.Solicitud),
        });
        const datos = await res.json();
        if (res.status === 500) {
          console.log(datos.mensaje)
        } else {
          console.log(datos.mensaje)
          this.Solicitud.archivo="";
          this.archivo= null;
          this.archivoBase64= null;
          this.imagePreview= null;
        }
      }
    },
  },
};
</script>
