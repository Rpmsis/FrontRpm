<template>
  <v-container>
    <v-card class="mt-5">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="consumibles"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="50"
        :sort-desc="true"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

/* Fijoo */
<script>
import ImageZoom from "~/components/ImageZoom.vue";
export default {
  components: {
    ImageZoom,
  },
  layout: "barra",
  data() {
    return {
      code: "123456789",
      alerta: false,
      Mensaje: "",
      Titulo: "",
      consumibles: [],
      search: "",
      codigo: false,
      headers: [
        { text: "Nombre completo del usuario", value: "NombreCompleto" },
        { text: "Id del usuario", value: "idCheck" },
      ],
    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar los datos de la tabla consumibles*/
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/Idusuario");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.consumibles = datos.respuesta.respuesta;
          //console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    limpiarFormulario() {},
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
  margin-top: 10px;
  margin-bottom: 10px;
  width: 30%;
  font-size: 20px !important;
}
.multi-line-header {
  white-space: pre-line;
}
/* .codigobarras{
  width: 50px !important;
  height: 50px !important;
} */

.vue-barcode-element{
  
  max-height: 100px !important;
}
</style>
