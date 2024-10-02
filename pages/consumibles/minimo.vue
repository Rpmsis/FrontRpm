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
import io from "socket.io-client";

export default {
  components: {
    ImageZoom,
  },
  layout: "barra",
  data() {
    return {
        search:"",

      consumibles: [],

      headers: [
        { text: "Id del activo", value: "folioActivo" },
        {
          text: "Fecha\ncreación",
          value: "fecha",
          align: "star",
          class: "multi-line-header",
        },
        { text: "Descripción", value: "descripcion" },
        { text: "Tipo", value: "tipo" },
        {
          text: "Unidad\nde\nmedida",
          value: "unidadmedida",
          align: "star",
          class: "multi-line-header",
        },
        { text: "Cantidad existente", value: "cantidad" },
        { text: "Minimo permitido", value: "minimo" },
      ],

    };
  },
  mounted() {
    this.fecha = this.fechaMinima;
    this.socket = io("http://192.168.1.180:3003");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
    });
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar los datos de la tabla consumibles*/
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/minimoconsumibles");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.consumibles = datos.limite;
          console.log(datos.limite);
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
  margin-top: 10px;
  margin-bottom: 10px;
  width: 30%;
  font-size: 20px !important;
}
.multi-line-header {
  white-space: pre-line;
}
</style>
