<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row justify="center">
            <v-col cols="12" md="4" sm="6" xs="12">
              <v-card
                class="mx-auto mt-5"
                max-width="344"
                outlined
                elevation="24"
                color="white"
              >
                <v-list-item three-line>
                  <v-list-item-content style="color: black">
                    <div class="text-overline mb-4">EFICACIA</div>
                    <v-list-item-title class="text-h5 mb-1">
                      ASIGNADAS
                    </v-list-item-title>
                    <v-list-item-subtitle style="color: black">
                      Porcentaje de actividades TERMINADAS en el día.
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar
                    style="font-size: 25px"
                    tile
                    size="100"
                    color="orange"
                  >
                    {{ terminadas }}/{{ asignaciones }}
                  </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                  <v-progress-linear v-model="promedioasig" height="25" color="orange">
                    <strong>{{ Math.ceil(promedioasig) }}%</strong>
                  </v-progress-linear>
                </v-card-actions>
              </v-card>
              <v-card
                color="white"
                class="mx-auto mt-5"
                max-width="344"
                outlined
                elevation="24"
              >
                <v-list-item three-line>
                  <v-list-item-content style="color: black">
                    <div class="text-overline mb-4">EFICIENCIA</div>
                    <v-list-item-title class="text-h5 mb-1">
                      TERMINADAS
                    </v-list-item-title>
                    <v-list-item-subtitle style="color: black">
                      Porcentaje de eficiencia de las actividades terminadas.
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar
                    style="font-size: 25px"
                    tile
                    size="80"
                    color="primary"
                  >
                    {{ promedio }}%
                  </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                  <v-progress-linear v-model="promedioasig" height="25" color="white">
                    <strong>{{ Math.ceil(promedioasig) }}%</strong>
                  </v-progress-linear>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="6" xs="12">
              <v-card
                class="mx-auto mt-5 scroll-container"
                outlined
                elevation="8"
                color="white"
                style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)"
              >
                <v-row>
                  <v-col cols="12" md="4" v-for="(respu, index) in naves" :key="index">
                    <v-card
                      max-width="400"
                      outlined
                      elevation="4"
                      color="black"
                      style="
                        border-radius: 15px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      "
                    >
                      <!-- Titulo con la ubicación, en grande y elegante -->
                      <v-card-title
                        class="text-center py-6"
                        style="
                          background: linear-gradient(
                            135deg,
                            rgb(92 83 102),
                            rgb(90 111 147)
                          );
                          color: white;
                          border-radius: 15px 15px 0 0;
                        "
                      >
                        <v-icon left>mdi-clock-time-four</v-icon>
                        {{ respu.hrtranscurrido }}:{{ respu.mintranscurrido }}
                      </v-card-title>

                      <!-- Subtítulo de tiempo transcurrido -->
                      <v-card-subtitle
                        class="text-center"
                        style="font-size: 14px; color: white"
                      >
                        {{ respu.ubicacion }}
                      </v-card-subtitle>

                      <!-- Detalles sobre disponibilidad y personal -->
                      <v-card-text>
                        <div class="d-flex align-center" style="justify-content: center">
                          <div
                            class="text-subtitle-1"
                            style="font-weight: 500; color: #4caf50"
                          >
                            <v-badge
                              :content="respu.personas"
                              :value="respu.personas"
                              color="green"
                              overlap
                            >
                              <v-icon large>mdi-account-group </v-icon>
                            </v-badge>
                          </div>
                        </div>
                        <div class="d-flex align-center" style="justify-content: center">
                          <div
                            class="text-subtitle-1"
                            style="font-weight: 500; color: #4caf50; text-align: center"
                          >
                            <strong>Disponible:</strong>
                            {{ respu.horareal }}:{{ respu.minreal }}H/h
                          </div>
                        </div>
                      </v-card-text>

                      <v-divider></v-divider>

                      <!-- Información restante -->
                      <v-card-text
                        class="my-4 align-center"
                        style="font-size: 16px; color: #757575; text-align: center"
                      >
                        <strong>Restante:</strong>
                        <div
                          class="text-subtitle-1"
                          style="font-size: 18px; font-weight: bold"
                        >
                          <v-icon left>mdi-clock-time-four</v-icon>
                          {{ respu.hrrestante }}:{{ respu.minrestante }}
                        </div>
                      </v-card-text>

                      <v-divider></v-divider>

                      <!-- Barra de progreso con un estilo más elegante -->
                      <v-card-actions>
                        <v-progress-linear
                          v-model="respu.porcentaje"
                          height="15"
                          color="blue"
                          :style="{ borderRadius: '6px' }"
                          disabled="true"
                        >
                          <strong> {{ Math.ceil(respu.porcentaje) }}% </strong>
                        </v-progress-linear>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-data-iterator
                :items="porcard"
                :items-per-page.sync="itemsPerPage"
                :page.sync="page"
                :search="searchcard"
                :sort-by="sortBy.toLowerCase()"
                :sort-desc="sortDesc"
                hide-default-footer
              >
                <template v-slot:header>
                  <v-toolbar dark color="black darken-3" class="mb-1">
                    <v-row>
                      <v-col cols="12" md="4" sm="12">
                        <v-select
                          v-model="datosenviar.empresa"
                          flat
                          solo-inverted
                          hide-details
                          :items="sucursales"
                          prepend-inner-icon="mdi-magnify"
                          label="Empresa"
                          @change="(datosenviar.nombre=''),mostrarFiltrados()"
                          clearable
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="8" sm="12">
                        <v-select
                          v-model="datosenviar.nombre"
                          flat
                          solo-inverted
                          hide-details
                          :items="trabajadores"
                          prepend-inner-icon="mdi-magnify"
                          label="Responsables"
                          @change="mostrarFiltrados()"
                          clearable
                          @clear="datosenviar.nombre = ''"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-toolbar>
                </template>

                <template v-slot:default="props">
                  <v-row>
                    <v-col
                      v-for="item in props.items"
                      :key="item.Id"
                      cols="12"
                      sm="6"
                      md="6"
                      lg="6"
                    >
                      <v-card style="border-radius: 15px 15px 0 0">
                        <v-card
                          outlined
                          elevation="4"
                          color="black"
                          style="
                            border-radius: 15px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                          "
                        >
                          <!-- Titulo con la ubicación, en grande y elegante -->
                          <v-card-title
                            class="text-center py-6"
                            style="
                              background: linear-gradient(
                                135deg,
                                rgb(92 83 102),
                                rgb(90 111 147)
                              );
                              color: white;
                              border-radius: 15px 15px 0 0;
                            "
                          >
                            <v-row :class="titulosdatos" no-gutters justify="center">
                              <v-col cols="4" md="4" sm="4" xs="4">
                                <v-icon meddium left v-if="$vuetify.breakpoint.smAndUp"
                                  >mdi-clock-time-four</v-icon
                                >
                                {{ item.TiempoTranscurrido }}
                              </v-col>
                              <v-col cols="4" md="4" sm="4" xs="4">
                                <v-icon meddium left v-if="$vuetify.breakpoint.smAndUp">
                                  mdi-weight-kilogram
                                </v-icon>
                                {{ item.KgRealizados }}
                              </v-col>
                              <v-col cols="4" md="4" sm="4" xs="4">
                                <v-icon meddium left v-if="$vuetify.breakpoint.smAndUp">
                                  mdi-finance
                                </v-icon>
                                {{ item.Eficiencia }}
                              </v-col>
                            </v-row>
                          </v-card-title>

                          <!-- Subtítulo de tiempo transcurrido -->
                          <v-card-subtitle
                            class="text-center"
                            style="font-size: 14px; color: white"
                          >
                            {{ item.Empresa }}
                          </v-card-subtitle>

                          <!-- Información restante -->
                          <v-card-text
                            class="align-center"
                            style="font-size: 16px; color: #757575; text-align: center"
                          >
                            <v-card-title
                              :class="textos"
                              class="subheading font-weight-bold"
                            >
                              <v-icon large v-if="$vuetify.breakpoint.smAndUp">
                                mdi-pound-box-outline</v-icon
                              >
                              {{ item.Id }}
                              <v-spacer></v-spacer>
                              <strong>Actividad</strong>
                            </v-card-title>

                            <div
                              class="text-subtitle-1"
                              style="font-size: 18px; font-weight: bold"
                            >
                              {{ item.Actividad }}
                            </div>
                            <div
                              class="text-subtitle-1"
                              style="font-weight: 500; color: #4caf50; text-align: right"
                            >
                              <v-badge
                                :content="item.Responsables"
                                :value="item.Responsables"
                                color="green"
                                overlap
                              >
                                <v-icon large>mdi-account-group </v-icon>
                              </v-badge>
                            </div>
                            <v-list style="max-height: 200px; overflow-y: auto" two-line>
                              <v-list-item
                                v-for="(sujeto, index) in item.asignados || []"
                                :key="index"
                              >
                                <v-list-item-icon v-if="$vuetify.breakpoint.smAndUp">
                                  <v-icon color="indigo"> mdi-account </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content
                                  :style="
                                    sujeto.nombre === datosenviar.nombre
                                      ? 'background-color:#47231a'
                                      : 'background: rgb(30 27 27 / 98%)'
                                  "
                                >
                                  <v-list-item-title>
                                    <h3>{{ sujeto.nombre }}</h3>
                                  </v-list-item-title>
                                  <v-list-item-title>
                                    <h3 style="">
                                      <v-icon medium left> mdi-clock-time-four </v-icon>
                                      {{ sujeto.tiempo }}
                                    </h3>
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    <v-btn
                                      outlined
                                      small
                                      :color="colorestatus(sujeto.estatus)"
                                    >
                                      <h4>{{ sujeto.estatus }}</h4>
                                    </v-btn>
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-card-text>
                          <v-divider></v-divider>
                          <!-- Detalles sobre disponibilidad y personal -->
                          <v-card-text>
                            <v-card-title :class="textos">
                              <v-btn block :color="colorestatusbtn(item)">
                                {{ item.Estatus }}
                              </v-btn>
                            </v-card-title>
                          </v-card-text>
                        </v-card>
                        <v-divider></v-divider>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>

                <template v-slot:footer>
                  <v-row class="mt-2" align="center" justify="center">
                    <span class="grey--text">Items per page</span>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          dark
                          text
                          color="primary"
                          class="ml-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ itemsPerPage }}
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(number, index) in itemsPerPageArray"
                          :key="index"
                          @click="updateItemsPerPage(number)"
                        >
                          <v-list-item-title>{{ number }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-spacer></v-spacer>

                    <span class="mr-4 grey--text">
                      Page {{ page }} of {{ numberOfPages }}
                    </span>
                    <v-btn
                      fab
                      dark
                      color="#283037 !important; darken-3"
                      class="mr-1"
                      @click="formerPage"
                    >
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      dark
                      color="#283037 !important; darken-3"
                      class="ml-1"
                      @click="nextPage"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

/* Fijoo */
<script>
import io from "socket.io-client";
import ImageZoom from "~/components/ImageZoom.vue";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    ImageZoom,
    VueApexCharts,
  },
  layout: "barra",
  data() {
    return {
      personas: 0,

      terminadas: 0,
      asignaciones: 0,
      promedio: 0,
      promedioasig: 0,

      responsables: [],
      statusres: false,

      horastrans: 0,
      mintrans: 0,
      tiempodisponible: 0,
      porcentaje: 0,
      naves: [],

      //Datos de la tabla por card
      porcard: [],
      itemsPerPageArray: [4, 6, 8, 12, 20],
      searchcard: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 12,
      sortBy: "id",

      //datos de los select
      trabajadores: [],
      sucursales: [],

      //datos seleccionados
      datosenviar: {
        empresa: "",
        nombre: "",
      },
      datolimpio: "",
    };
  },
  mounted() {
    this.socket = io("http://localhost:3004");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
      this.mostrarFiltrados();
    });
    this.mostrar();
    this.mostrarGlobal();
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.porcard.length / this.itemsPerPage);
    },

    //Cambiar estilos
    titulosdatos() {
      return this.$vuetify.breakpoint.sm ? "esverdad" : "noesverdad";
    },
    textos() {
      return this.$vuetify.breakpoint.xs ? "esverdadtxt" : "noesverdadtxt";
    },
  },

  methods: {
    //Metodos de los card
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },

    /* Muestra todas las actividades de día */
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
          if (this.datosenviar.nombre && this.datosenviar.empresa) {
            const asignaciones = datos.nuevoarray.filter((actividad) => {
              // Filtrar los asignados dentro de la actividad y verificar si el nombre coincide
              return actividad.asignados.some(
                (nom) => nom.nombre === this.datosenviar.nombre
              );
            });
            //console.log(asignaciones);
            this.porcard = asignaciones;
          } else {
            this.porcard = datos.nuevoarray;
            //console.log(this.porcard);
          }

          this.sucursales = datos.uniempresas;
          //console.log(datos);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar estaus global de las actividades */
    async mostrarGlobal() {
      if (this.datosenviar.empresa && this.datosenviar.nombre) {
        this.mostrarFiltrados();
      } else {
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
            this.naves = datos.hhombretotal;
            //console.log(this.naves);
            this.asignaciones = datos.deldiatotal;
            this.terminadas = datos.terminadastotal;
            this.promedio = datos.promediototal;
            this.promedioasig = datos.promedioasigtotal;
            //this.datosEficacia = datos.respuesta.respuesta;
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      }
    },

    async mostrarFiltrados() {
      if (this.datosenviar.empresa) {
        this.mostrar();
        //console.log(this.datosenviar);
        try {
          const res = await fetch(
            "http://localhost:3005/datoselect?empresa=" +
              this.datosenviar.empresa +
              "&&nombre=" +
              this.datosenviar.nombre,
            {
              method: "GET",
              headers: {
                token: localStorage.token,
              },
            }
          );
          const datos = await res.json();
          if (res.status == 404) {
            console.error("Error al obtener los datos:", error);
          } else {
            //console.log(datos);
            this.searchcard = this.datosenviar.empresa;
            this.trabajadores = datos.trabajadores;

            this.naves = datos.hhombretotal;
            this.asignaciones = datos.deldiatotal;
            this.terminadas = datos.terminadastotal;
            this.promedio = datos.promediototal;
            this.promedioasig = datos.promedioasigtotal;
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      } else {
        this.mostrar();
        this.mostrarGlobal();
        this.searchcard = "";
        this.datosenviar.empresa = "";
        this.datosenviar.nombre = "";
        this.trabajadores=[];
        //console.log(this.datosenviar);
      }
    },

    /* Mostrar los responsables por actividad */
    /* async mostresponsables(idasigactivi) {
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
          //this.name2 = datos.respuesta.respuesta.map((filtro) => [filtro.responsables]);

          const nombres3 = datos.respuesta.respuesta.map((filtro) => [
            filtro.responsables,
          ]);
          console.log(nombres3);
          this.statusres = true;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }, */

    /* Muestra las evidencias cargadas */
    /* async mostEvidencias(idasigactivi) {
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
    }, */

    /* Si esta TERMINADO lo pone de otro color */
    buscarkgfaltantes(item) {
      if (item.kg > 0 && item.kgControl === 0 && item.status === "TERMINADO") {
        return "highlight-row"; // Clase CSS para destacar la fila
      }
      return "";
    },

    colorestatusbtn(item) {
      //console.log("EstatusC: ", item.estatusC);
      if (item.Estatus === "INICIAR" || item.estatus === "INICIAR") {
        return "#09bfc5"; // Clase CSS para destacar la fila
      }
      if (item.Estatus === "EN PROCESO" || item.estatus === "EN PROCESO") {
        return "rgb(8,243,5)"; // Clase CSS para destacar la fila
      }
      if (item.Estatus === "EN PAUSA" || item.estatus === "EN PAUSA") {
        return "red"; // Clase CSS para destacar la fila
      }
      if (item.Estatus === "TERMINADO" || item.estatus === "TERMINADO") {
        return "#ddd000"; // Clase CSS para destacar la fila
      }
    },
    colorestatus(item) {
      //console.log("estatus: ", item);
      if (item === "INICIAR") {
        return "#09bfc5"; // Clase CSS para destacar la fila
      }
      if (item === "EN PROCESO") {
        return "rgb(8,243,5)"; // Clase CSS para destacar la fila
      }
      if (item === "EN PAUSA") {
        return "red"; // Clase CSS para destacar la fila
      }
      if (item === "TERMINADO") {
        return "#ddd000"; // Clase CSS para destacar la fila
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
.theme--dark.v-application .text--primary {
  color: #615c5c !important;
}

.scroll-container {
  max-height: 374px; /* Ajusta según sea necesario */
  overflow-y: auto; /* Habilita el desplazamiento vertical */
}
.theme--dark.v-list {
  background: rgb(30 27 27 / 98%);
}

.esverdad {
  font-size: 25px;
}

.noesverdad {
  font-size: 25px;
}

.esverdadtxt {
  font-size: 25px !important;
}

.noesverdadtxt {
  font-size: 25px;
}
</style>
