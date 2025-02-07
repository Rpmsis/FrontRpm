<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row class="mt-5">
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
                <template v-slot:default="props">
                  <v-row style="border: solid black 1px">
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
                              <strong>{{ item.fecha }}</strong>
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
                              <v-row no-gutters justify="center" align="center">
                                <v-col cols="2" md="2" sm="2" xs="2">
                                  <v-switch
                                    v-model="item.individualestatus"
                                    color="red"
                                    flat
                                    @click="actAsignacionestatus(item)"
                                    x-large
                                    :disabled="
                                      item.individualestatus === true || item.kg > 0
                                    "
                                  ></v-switch>
                                </v-col>
                                <v-col cols="4" md="4" sm="4" xs="4">
                                  <v-text-field
                                    v-if="item.individualestatus === false"
                                    v-model="item.kg"
                                    type="number"
                                    min="1"
                                    label="Global kg"
                                    filled
                                    clearable
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="2"
                                  md="2"
                                  sm="2"
                                  xs="2"
                                  v-if="item.individualestatus === false"
                                >
                                  <center>
                                    <v-btn
                                      outlined
                                      color="green"
                                      fab
                                      @click="actAsignacionkgglobal(item)"
                                      v-if="item.kg > 0"
                                    >
                                      <v-icon> mdi-check-decagram </v-icon>
                                    </v-btn>
                                  </center>
                                </v-col>
                                <v-col cols="2" md="2" sm="2" xs="2">
                                  <v-badge
                                    :content="item.Responsables"
                                    :value="item.Responsables"
                                    color="green"
                                    overlap
                                  >
                                    <v-icon large>mdi-account-group </v-icon>
                                  </v-badge>
                                </v-col>
                              </v-row>
                            </div>
                            <v-list style="max-height: 200px; overflow-y: auto" two-line>
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
                                    <h3>
                                      <v-icon medium left> mdi-clock-time-four </v-icon>
                                      {{ sujeto.tiempo }}
                                    </h3>
                                    <h3>
                                      <v-icon medium left> mdi-weight-kilogram </v-icon>
                                      {{ sujeto.KgRealizados }}
                                    </h3>
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    <v-btn
                                      outlined
                                      small
                                      :color="colorestatus(sujeto.estatus)"
                                      style="margin: 10px"
                                    >
                                      <h4>{{ sujeto.estatus }}</h4>
                                    </v-btn>
                                    <v-row
                                      justify="center"
                                      v-if="
                                        item.individualestatus === true &&
                                        sujeto.KgRealizados === 0
                                      "
                                    >
                                      <v-col cols="6" sm="6" md="6">
                                        <v-text-field
                                          v-model="sujeto.kg"
                                          type="number"
                                          min="1"
                                          label="KILOGRAMOS"
                                          filled
                                          clearable
                                        ></v-text-field>
                                      </v-col>
                                      <v-col
                                        cols="2"
                                        md="2"
                                        v-if="sujeto.kg > 0 && sujeto.kg"
                                      >
                                        <center>
                                          <v-btn
                                            style="position: relative; right: 35%"
                                            outlined
                                            color="green"
                                            fab
                                            @click="actAsignacionkg(sujeto, item)"
                                            ><v-icon> mdi-check-decagram </v-icon></v-btn
                                          >
                                        </center>
                                      </v-col>
                                    </v-row>
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

        <!-- Formulario de actualización de kilometros-->
        <div class="pa-4 text-center">
          <v-dialog v-model="formkg" persistent max-width="500px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(formkg = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="actAsignacionkg">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="datokg.kg"
                      type="number"
                      min="1"
                      clear-icon="mdi-close-circle"
                      label="KILOGRAMOS"
                      style="border: white"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <center>
                      <v-btn
                        block
                        style="margin-top: 10px; margin-bottom: 10px"
                        outlined
                        color="green"
                        elevation="16"
                        type="submit"
                        >Actualizar</v-btn
                      >
                    </center>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-dialog>
        </div>

        <v-dialog v-model="alerta" max-width="500">
          <v-card>
            <v-card-title class="text-h4">
              {{ Titulo }}
            </v-card-title>
            <v-card-text class="text-h6 text-center">
              {{ Mensaje }}
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="alerta = false"> Cerrar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-app>
</template>

/* Fijoo */
<script>
import io from "socket.io-client";

export default {
  layout: "barra",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      actividades: [],
      formkg: false,

      datokg: {
        idasigactivi: "",
        kg: "",
        kgcontrol: "",
        idcontrolactivi: "",
        condicionglobal: "",
      },

      //Datos de la tabla por card
      porcard: [],
      itemsPerPageArray: [4, 6, 8, 12, 20],
      searchcard: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 12,
      sortBy: "id",
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
    /* Mostrar Actividad */
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3005/EficienciaKg", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //this.actividades = datos.respuesta;
          //console.log(datos);
          this.porcard = datos.nuevoarray.map((dato) => {
            return {
              Id: dato.Id,
              fecha: dato.fecha,
              Empresa: dato.Empresa,
              Actividad: dato.Actividad,
              TiempoTranscurrido: dato.TiempoTranscurrido,
              KgRealizados: dato.KgRealizados,
              Eficiencia: dato.Eficiencia,
              Estatus: dato.Estatus,
              Responsables: dato.Responsables,
              asignados: dato.asignados,
              individualestatus: dato.individualestatus === "true" ? true : false,
              kg: dato.kg,
            };
          });
          console.log(this.porcard);
          //console.log(this.actividades);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar el formulario de kg*/
    async actualizar(idasigactivi) {
      //console.log("idasigactivi: ", idasigactivi);
      this.datokg.idasigactivi = idasigactivi;
      this.formkg = true;
    },

    async actAsignacionkg(control, asignacion) {
      this.datokg.idcontrolactivi = control.idcontrol;
      this.datokg.kgcontrol = control.kg;
      this.datokg.idasigactivi = asignacion.Id;
      this.datokg.kg = asignacion.kg;
      const res = await fetch("http://localhost:3005/actualizarAsignacionkg", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datokg),
      });
      const datos = await res.json();
      //console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
        this.mostrar();
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.mostrar();
      }
    },

    async actAsignacionkgglobal(asignacion) {
      this.datokg.idasigactivi = asignacion.Id;
      this.datokg.kg = asignacion.kg;
      const res = await fetch("http://localhost:3005/actualizarAsignacionkg", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datokg),
      });
      const datos = await res.json();
      //console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
        this.mostrar();
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.mensaje;
        this.Mensaje = "";

        this.mostrar();
      }
    },

    async actAsignacionestatus(item) {
      this.datokg.idasigactivi = item.Id;
      this.datokg.condicionglobal = item.individualestatus;
      //console.log(this.datokg.motivo);
      const res = await fetch("http://localhost:3005/editestatusasig", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datokg),
      });
      const datos = await res.json();
      //console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
        this.mostrar();
      } else {
        this.mostrar();
      }
    },

    limpiarFormulario() {
      this.datokg.kg = "";
    },

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
    colorestatusbtn(item) {
      //console.log("EstatusC: ", item.estatusC);
      if (item.Estatus === "INICIAR") {
        return "#09bfc5";
      }
      if (item.Estatus === "EN PROCESO") {
        return "rgb(8,243,5)";
      }
      if (item.Estatus === "EN PAUSA") {
        return "red";
      }
      if (item.Estatus === "TERMINADO") {
        return "#ddd000";
      }
    },
    colorestatus(item) {
      //console.log("estatus: ", item);
      if (item === "INICIAR") {
        return "#09bfc5";
      }
      if (item === "EN PROCESO") {
        return "rgb(8,243,5)";
      }
      if (item === "EN PAUSA") {
        return "red";
      }
      if (item === "TERMINADO") {
        return "#ddd000";
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
.theme--dark.v-list {
  background: rgb(30 27 27 / 98%);
}
</style>
