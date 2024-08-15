<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="mt-5" style="padding: 10px">
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
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="white"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="actualizar(item.idactividades, item.idasigactivi)"
                      small
                      class="mr-2"
                    >
                      mdi-eye
                    </v-icon>
                  </template>
                  <span>Visualizar</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>

        <!-- Tabla personas que estan realizando la actividad-->
        <template>
          <div class="pa-4 text-center">
            <v-dialog v-model="statusres" persistent max-width="500px">
              <v-card style="padding: 15px">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="statusres = false">
                    <v-icon style="font-size: 30px"
                      >mdi-close theme--dark red--text</v-icon
                    ></v-btn
                  >
                </v-card-actions>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-data-table
                  :headers="headers2"
                  :items="responsables"
                  :search="search2"
                  :footer-props="{
                    'items-per-page-options': [10, 20, 30, 40, 50],
                  }"
                  :items-per-page="10"
                >
                </v-data-table>
              </v-card>
            </v-dialog>
          </div>
        </template>
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
      search2: "",
      actividades: [],
      responsables: [],
      statusres: false,
      headers: [
        { text: "Id de\nasignación", value: "idasigactivi", align:"start",  class: "multi-line-header" },
        { text: "Fecha de inicio", value: "fechainicio" },
        { text: "Empresa", value: "empresa" },
        { text: "Actividad", value: "actividad" },
        { text: "Tiempo\ntranscurrido", value: "timeControl", align:"start",  class: "multi-line-header" },
        {
          text: "Estatus",
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],

      headers2: [
        { text: "Id de la\nactividad", value: "idactividades", align:"center",  class: "multi-line-header", },
        { text: "Responsable", value: "responsables" },
        { text: "Tiempo\ntranscurrido\nen minutos", value: "timestandar", align:"start",  class: "multi-line-header", },
        { text: "Estatus", value: "status", class: "multi-line-header", },
      ],
    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
    /* Mostrar Actividad */
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/actividiarias", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.actividades = datos.respuesta.respuesta;
          //console.log(this.actividades);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar las actividades de los responsables */

    async actualizar(idactividad, idasigactivi) {
      //console.log(idactividad);
      //console.log(idasigactivi);
      try {
        const res = await fetch(
          `http://localhost:3001/Statusresponsables?idactividad=${idactividad}&idasigactivi=${idasigactivi}`
        );
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.responsables = datos.respuesta.respuesta;
          //console.log(this.responsables);
          this.statusres = true;
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
.multi-line-header {
  white-space: pre-line;
}
</style>
