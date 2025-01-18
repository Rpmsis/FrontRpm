<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row justify="center">
            <v-col cols="12" md="4">
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
                    <v-list-item-subtitle style="color: black"
                      >Porcentaje de actividades TERMINADAS en el
                      día.</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-avatar
                    style="font-size: 25px"
                    tile
                    size="100"
                    color="orange"
                  >
                    {{ slider1 }}/{{ asignaciones }}</v-list-item-avatar
                  >
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
                      Porcentaje de eficiencia de las actividades
                      terminadas.</v-list-item-subtitle
                    >
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
            <v-col cols="12" md="6">
              <v-card
                class="mx-auto mt-5 scroll-container"
                outlined
                elevation="8"
                color="white"
                style="border-radius: 20px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)"
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
                          background: linear-gradient(135deg, #6a11cb, #2575fc);
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

          <!-- <v-card class="mt-5" style="padding: 10px">
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
              :single-expand="singleExpand"
              :expanded.sync="expanded"
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
                      @click="
                        mostresponsables(item.idasigactivi),
                          mostEvidencias(item.idasigactivi)
                      "
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
          </v-card> -->

          <v-row>
            <v-col cols="12" md="12" sm="12">
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
                  <v-toolbar dark color="blue darken-3" class="mb-1">
                    <v-text-field
                      v-model="searchcard"
                      clearable
                      flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Search"
                    ></v-text-field>
                    <template v-if="$vuetify.breakpoint.mdAndUp">
                      <v-spacer></v-spacer>
                      <v-select
                        v-model="sortBy"
                        flat
                        solo-inverted
                        hide-details
                        :items="keys"
                        prepend-inner-icon="mdi-magnify"
                        label="Sort by"
                      ></v-select>
                      <v-spacer></v-spacer>
                      <v-btn-toggle v-model="sortDesc" mandatory>
                        <v-btn large depressed color="blue" :value="false">
                          <v-icon>mdi-arrow-up</v-icon>
                        </v-btn>
                        <v-btn large depressed color="blue" :value="true">
                          <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </template>
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
                      <v-card style="border-radius: 15px 15px 0 0;">
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
                              background: linear-gradient(135deg, rgb(92 83 102), rgb(90 111 147));
                              color: white;
                              border-radius: 15px 15px 0 0;
                            "
                          >
                            <v-row>
                              <v-col cols="12" md="4" sm="4">
                                <v-icon large left>mdi-clock-time-four</v-icon>
                                {{ item.TiempoTranscurrido }}
                              </v-col>
                              <v-col cols="12" md="4" sm="4">
                                <v-icon large left> mdi-weight-kilogram </v-icon>
                                {{ item.KgRealizados }}
                              </v-col>
                              <v-col cols="12" md="4" sm="4">
                                <v-icon large left> mdi-finance </v-icon>
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
                            <v-card-title class="subheading font-weight-bold">
                              <v-icon large> mdi-pound-box-outline</v-icon>
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
                                <v-list-item-icon>
                                  <v-icon color="indigo"> mdi-account </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                  <v-list-item-title>
                                    Nombre: {{ sujeto.nombre }}
                                  </v-list-item-title>
                                  <v-list-item-title style="color:#4caf50;">
                                    Tiempo: {{ sujeto.tiempo }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    Estatus: {{ sujeto.estatus }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-card-text>
                          <v-divider></v-divider>
                          <!-- Detalles sobre disponibilidad y personal -->
                          <v-card-text>
                            <v-card-title>
                              {{ item.Estatus }}
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
                      color="blue darken-3"
                      class="mr-1"
                      @click="formerPage"
                    >
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-col>
          </v-row>
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
                            <h4>{{ item.fullName }}</h4>
                            <h5>{{ item.fecha }}</h5>
                            <h5>{{ item.hora }}</h5>
                          </v-col>
                          <v-col cols="12" md="6">
                            <ImageZoom
                              style="margin: 15px; max-width: 100%"
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
      expanded: [],
      singleExpand: false,

      slider1: 0,
      asignaciones: 0,
      promedio: 0,
      promedioasig: 0,

      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      search2: "",

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
        { text: "Responsable de asignación", value: "responsable" },
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
      keys: [],
    };
  },
  mounted() {
    this.socket = io("http://localhost:3004");
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

    numberOfPages() {
      return Math.ceil(this.porcard.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Id");
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
          this.porcard = datos.nuevoarray;
          this.keys = Object.keys(datos.nuevoarray[0]);
          console.log(this.porcard);
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
          this.naves = datos.hhombretotal;
          //console.log(this.naves);
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

    /* Mostrar los responsables por actividad */
    async mostresponsables(idasigactivi) {
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

    /* Muestra las evidencias cargadas */
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

    /* Si esta TERMINADO lo pone de otro color */
    buscarkgfaltantes(item) {
      if (item.kg > 0 && item.kgControl === 0 && item.status === "TERMINADO") {
        return "highlight-row"; // Clase CSS para destacar la fila
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
  background: rgb(30 27 27 / 54%);
}
</style>
