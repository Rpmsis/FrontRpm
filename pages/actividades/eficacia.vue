<template>
  <v-container>
    <v-card class="mt-5">
      <v-row>
        <v-col cols="12" md="12" sm="12" xs="12">
          <v-data-iterator
            :items="porcard"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            :search="searchcard"
            :sort-by="['fecha']"
            :sort-desc="true"
            hide-default-footer
          >
            <template v-slot:header>
              <v-toolbar dark color="black darken-3" class="mb-1">
                <v-row>
                  <v-col cols="12" md="4">
                    <div>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Fecha inicio"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          :active-picker.sync="activePicker"
                          :max="
                            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                              .toISOString()
                              .substring(0, 10)
                          "
                          min="1950-01-01"
                          @change="save"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                  </v-col>
                  <!-- <v-col cols="12" md="4" sm="12">
                    <v-select
                      flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Empresa"
                      clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="8" sm="12">
                    <v-select
                      flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Responsables"
                    ></v-select>
                  </v-col> -->
                </v-row>
              </v-toolbar>
            </template>

            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.idasigactivi"
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
                            {{ item.timeControl }}
                          </v-col>
                          <v-col cols="4" md="4" sm="4" xs="4">
                            <v-icon meddium left v-if="$vuetify.breakpoint.smAndUp">
                              mdi-weight-kilogram
                            </v-icon>
                            {{ item.kgControl }}
                          </v-col>
                          <v-col cols="4" md="4" sm="4" xs="4">
                            <v-icon meddium left v-if="$vuetify.breakpoint.smAndUp">
                              mdi-finance
                            </v-icon>
                            {{ item.eficienciasig }}
                          </v-col>
                        </v-row>
                      </v-card-title>

                      <!-- Subtítulo de tiempo transcurrido -->
                      <v-card-subtitle
                        class="text-center"
                        style="font-size: 14px; color: white"
                      >
                        {{ item.empresa }}
                      </v-card-subtitle>

                      <!-- Información restante -->
                      <v-card-text
                        class="align-center"
                        style="font-size: 16px; color: #757575; text-align: center"
                      >
                        <v-card-title :class="textos" class="subheading font-weight-bold">
                          <v-icon large v-if="$vuetify.breakpoint.smAndUp">
                            mdi-pound-box-outline</v-icon
                          >
                          {{ item.idasigactivi }}
                          <v-spacer></v-spacer>
                          <strong>{{ item.fecha }}</strong>
                        </v-card-title>

                        <div
                          class="text-subtitle-1"
                          style="font-size: 18px; font-weight: bold"
                        >
                          {{ item.actividad }}
                        </div>
                        <div
                          class="text-subtitle-1"
                          style="font-weight: 500; color: #4caf50; text-align: right"
                        >
                          <v-badge
                            :content="item.numpersonas"
                            :value="item.numpersonas"
                            color="green"
                            overlap
                          >
                            <v-icon large>mdi-account-group </v-icon>
                          </v-badge>
                        </div>
                        <v-list style="max-height: 100px; overflow-y: auto" two-line>
                          <v-list-item
                            v-for="(sujeto, index) in item.asignados || []"
                            :key="index"
                          >
                            <v-list-item-icon v-if="$vuetify.breakpoint.smAndUp">
                              <v-icon color="indigo"> mdi-account </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
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
                      <v-card-text
                        v-if="item.kgactividad !== 0 && item.kgControl === 0"
                        style="text-align: center; background-color: red"
                      >
                        <div
                          class="text-subtitle-1"
                          style="font-size: 18px; font-weight: bold"
                        >
                          Valida los kilos faltantes!!!
                        </div>
                      </v-card-text>
                      <!-- Detalles sobre disponibilidad y personal -->
                    </v-card>
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
      //Datos de la tabla por card
      porcard: [],
      itemsPerPageArray: [4, 6, 8, 12, 20],
      searchcard: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "id",

      //FECHAS
      activePicker: null,
      date: null,
      menu: false,
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
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
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

    async mostrar() {
      try {
        const res = await fetch("http://localhost:3005/Eficacia", {
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
          this.porcard = datos.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
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
    save(date) {
      this.$refs.menu.save(date);
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
</style>
