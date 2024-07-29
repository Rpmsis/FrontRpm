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
        :items="datosproveedores"
        :search="search"
        :footer-props="{
          'items-per-page-options': [ 10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
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
      search: "",
      datosproveedores: [],
      headers: [
        { text: "Id del activo ", value: "foliorpm" },
        { text: "Nombre completo", value: "nombre" },
        { text: "Email", value: "email" },
        { text: "Móvil", value: "movil" },
        { text: "Télefono", value: "tel" },
        { text: "Razón social", value: "rsocial" },
        { text: "RFC", value: "rfc" },
        { text: "Código postal", value: "cpostal" },
      ],
    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar los datos de la tabla*/
    async mostrar() {
      try {
        const res = await fetch("http://192.168.1.91:3001/proveedores");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.datosproveedores = datos.respuesta.respuesta;
          console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
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
  margin-top: 5px;
  margin-bottom: 5px;
  width: 30%;
  font-size: 20px !important;
}
</style>
