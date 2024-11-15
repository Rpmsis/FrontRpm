<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row>
            <v-col cols="12" md="3">
              <v-card
                class="mt-5"
                style="padding: 10px; text-align: center; font-size: 30px"
              >
                <v-card-title style="background-color: aliceblue; color: black">
                  ASIGNADAS:
                </v-card-title>
                <center>
                  <h1>
                    {{ asignaciones }}
                  </h1>
                </center>
              </v-card>
            </v-col>
            <v-col cols="12" md="3">
              <v-card
                class="mt-5"
                style="padding: 10px; text-align: center; font-size: 30px"
              >
                <v-card-title style="background-color: aliceblue; color: black">
                  PORCENTAJE:
                </v-card-title>

                <center>
                  <h1>{{ promedioasig }}%</h1>
                </center>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                class="mt-5"
                style="padding: 10px; text-align: center; font-size: 30px"
              >
                <v-card-title style="background-color: aliceblue; color: black">
                  PORCENTAJE DE EFICIENCIA :
                </v-card-title>
                <center>
                  <h1>{{ promedio }}%</h1>
                </center>
              </v-card>
            </v-col>
          </v-row>

          <v-card class="mt-10" style="padding: 10px">
            <v-slider
              label="ACTIVIDADES REALIZADAS:"
              v-model="slider1"
              model-value="30"
              readonly
              thumb-label="always"
              :thumb-size="40"
              :max="asignaciones"
            ></v-slider>
          </v-card>
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
              :item-class="buscarkgfaltantes"
            >
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="white"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="(actualizar(item.idasigactivi)),(mostEvidencias(item.idasigactivi))"
                      small
                      class="mr-2"
                    >
                      mdi-eye
                    </v-icon>
                  </template>
                  <span>Visualizar</span>
                </v-tooltip>
              </template>
              <template v-slot:item.concatenado2="{ item }">
                {{ `${item.eficienciasig}%` }}
              </template>
            </v-data-table>
          </v-card>
        </v-flex>

        <!-- Tabla personas que estan realizando la actividad-->
        <template>
          <div class="pa-4 text-center">
            <v-dialog v-model="statusres" persistent max-width="1200px">
              <v-row style="padding: 10px">
                <v-col cols="12" md="6">
                  <v-card>
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
                </v-col>
                <v-col cols="12" md="6">
                  <v-card class="mx-auto" max-width="500">
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

                    <v-virtual-scroll :items="items" height="300" item-height="200">
                      <template v-slot:default="{ item }"
                        ><v-row style="padding: 20px">
                          <v-col cols="12" md="6">
                            <h4 class="namecolor">{{ item.fullName }}</h4>
                            <h4>{{ item.fecha }}</h4>
                            <h4>{{ item.hora }}</h4>
                          </v-col>
                          <v-col cols="12" md="6">
                            <ImageZoom
                              style="margin: 15px; max-width: 100%; "
                              :thumbnail="item.imageUrl"
                              :fullImage="item.imageUrl"
                            />
                          </v-col>
                        </v-row>
                      </template>
                    </v-virtual-scroll>
                  </v-card>
                </v-col>
              </v-row>
            </v-dialog>
          </div>
        </template>
      </v-layout>
    </v-container>
  </v-app>
</template>

/* Fijoo */
<script>
import io from "socket.io-client";
import ImageZoom from "~/components/ImageZoom.vue";

export default {
  components: {
    ImageZoom,
  },
  layout: "barra",
  data() {
    return {
      slider1: 0,
      asignaciones: 0,
      promedio: 0,
      promedioasig: 0,

      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      search2: "",
      actividades: [],
      responsables: [],
      statusres: false,
      headers: [
        {
          text: "Id de\nasignación",
          value: "idasigactivi",
          align: "start",
          class: "multi-line-header",
        },
        { text: "Fecha de inicio", value: "fechainicio" },
        { text: "Empresa", value: "empresa" },
        { text: "Actividad", value: "actividad" },
        {
          text: "Tiempo\ntranscurrido",
          value: "timeControl",
          align: "start",
          class: "multi-line-header",
        },
        { text: "Kilogramos realizados", value: "kgControl" },
        { text: "Tiempo record", value: "timestandar" },
        { text: "Kilogramos record", value: "kg" },
        { text: "Eficiencia", value: "concatenado2" },
        { text: "Estatus", value: "status" },
        {
          text: "Detalles\ndel\nestatus",
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],

      headers2: [
        {
          text: "Id control",
          value: "idcontrolactivi",
          align: "center",
          class: "multi-line-header",
        },
        { text: "Responsable", value: "responsables" },
        {
          text: "Tiempo\ntranscurrido\nen minutos",
          value: "timestandar",
          align: "start",
          class: "multi-line-header",
        },
        { text: "Estatus", value: "status", class: "multi-line-header" },
      ],

      name2: [],
      evidencias: [],
    };
  },
  mounted() {
    this.socket = io("http://192.168.1.97:3004");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
      this.mostrarGlobal();
    });
    this.socket.on("newevidencia", (datos) => {
      console.log(datos);
      this.nuevaevidencia(datos);
    });
    this.mostrar();
    this.mostrarGlobal();
  },

  computed: {
    items() {
      return this.evidencias.map((evidencia) => {
        return {
          fullName: evidencia.responsable,
          imageUrl: `http://localhost:3005/evidenciasact/${evidencia.archivo}`,
          fecha: evidencia.fecha,
          hora: evidencia.hora,
        };
      });
    },
  },

  methods: {
    nuevaevidencia(datos) {
      this.actualizar(datos);
    },

    /* Mostrar Actividad */
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3005/actividiarias", {
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

    /* Mostrar estaus global de las actividades */
    async mostrarGlobal() {
      try {
        const res = await fetch("http://localhost:3005/globalstatus", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos);
          this.asignaciones = datos.deldiatotal;
          this.slider1 = datos.terminadastotal;
          this.promedio = datos.promediototal;
          this.promedioasig = datos.promedioasigtotal;
          //this.datosEficacia = datos.respuesta.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar las actividades de los responsables */
    async actualizar(idasigactivi) {
      //console.log(idactividad);
      //console.log(idasigactivi);
      try {
        const res = await fetch(
          `http://localhost:3005/Statusresponsables?idasigactivi=${idasigactivi}`
        );
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.responsables = datos.respuesta.respuesta;
          //console.log(this.responsables);
          this.name2 = datos.respuesta.respuesta.map((filtro) => [filtro.responsables]);

          const nombres3 = datos.respuesta.respuesta.map((filtro) => [
            filtro.responsables,
          ]);
          console.log(nombres3);
          //this.mostEvidencias(idasigactivi);
          this.statusres = true;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async mostEvidencias(idasigactivi) {
      //console.log(idactividad);
      //console.log(idasigactivi);
      try {
        const res = await fetch(
          `http://localhost:3005/evidencias?idasigactivi=${idasigactivi}`
        );
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.evidencias = datos.respuesta.respuesta;
          console.log(this.evidencias);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    buscarkgfaltantes(item) {
      if (item.kg > 0 && item.kgControl === 0 && item.status === "TERMINADO") {
        return "highlight-row"; // Clase CSS para destacar la fila
      }
      return "";
    },

    created() {
      this.mostrar();
      this.mostrarGlobal();
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

.btnEnviar {
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}
.multi-line-header {
  white-space: pre-line;
}
.highlight-row {
  background-color: rgb(133, 40, 12); /* Cambia el color según lo que prefieras */
}
.row {
  margin: 0px !important;
}
.namecolor {
  color: brown;
}
</style>
