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
        :items="datosEficacia"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-by="['fechainicio']"
        :sort-desc="true"
        :item-class="buscarkgfaltantes"
      >
        <template v-slot:item.concatenado2="{ item }">
          {{ `${item.eficienciasig}%` }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

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
      search: "",
      datosEficacia: [],
      headers: [
        { text: "id de asignación", value: "idasigactivi" },
        { text: "Fecha de inicio", value: "fechainicio" },
        { text: "Actividad", value: "actividad" },
        { text: "Empresa", value: "empresa" },
        { text: "Número de personas", value: "numpersonas" },
        { text: "Tiempo realizado", value: "timeControl" },
        { text: "Kilogramos realizados", value: "kgControl" },
        { text: "Tiempo estandar", value: "timestandar" },
        { text: "Kilogramos record", value: "kg" },
        { text: "Eficiencia", value: "concatenado2" },
      ],
    };
  },

  mounted() {
    this.socket = io("http://192.168.1.97:3004");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
    });
    this.mostrar();
  },
  methods: {
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3005/Eficacia",{
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos.respuesta);
          this.datosEficacia = datos.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    buscarkgfaltantes(item) {
      if (item.kg > 0 && item.kgControl === 0 && item.status==="TERMINADO") {
        return "highlight-row"; 
      }
      return "";
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
.highlight-row {
  background-color: rgb(187, 0, 0); /* Cambia el color según lo que prefieras */
}
</style>
