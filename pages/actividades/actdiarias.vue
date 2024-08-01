<template>
    <v-app>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card class="mt-5" style="padding:10px">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                ></v-text-field>
                <v-data-table
                    :headers="headers"
                    :items="actividades"
                    :search="search"
                    :footer-props="{
                    'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                    :items-per-page="10"
                    :sort-by="['fechainicio']"
                    :sort-desc="true"
                >
                </v-data-table>
            </v-card>
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
        alerta: false,
        Mensaje: "",
        Titulo: "",
        search: "",
        actividades:[],
        headers: [
          { text: "Id de asignación", value: "idasigactivi" },
          { text: "Fecha de inicio", value: "fechainicio" },
          { text: "Empresa", value: "empresa" },
          { text: "Actividad", value: "actividad" },
          { text: "Estatus", value: "status" },
        ],
      };
    },
    mounted() {
      this.mostrar();
    },
  
    computed: {
    },
    methods: {
      /* Mostrar Actividad */
      async mostrar() {
        try {
          const res = await fetch("http://localhost:3001/actividiarias");
          const datos = await res.json();
          if (res.status == 404) {
            console.error("Error al obtener los datos:", error);
          } else {
            this.actividades = datos.respuesta.respuesta;
            console.log(this.actividades);
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
    padding: 0px 50px 0px 50px;
  }
  .btnEnviar {
    margin-top: 30px;
    margin-bottom: 50px;
    width: 30%;
    font-size: 20px !important;
  }
</style>
  