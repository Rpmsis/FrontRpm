<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row align="center">
            <v-col cols="12" sm="6" md="6">
              <v-card class="mx-auto mt-5" outlined elevation="24" color="black">
                <v-card-title>
                  <v-text-field
                    v-model="Nombre"
                    type="password"
                    append-icon="mdi-magnify"
                    label="Buscar supervisor"
                    @input="Buscar"
                  ></v-text-field>
                </v-card-title>
                <v-form @submit.prevent="submitForm" v-if="datos === true">
                  <v-row align="center" justify="center">
                    <v-col cols="12" md="12" sm="12">
                      <v-select
                        v-model="datoNuevo.responsables"
                        :items="operadores"
                        item-value="id"
                        item-text="text"
                        label="RESPONSABLE"
                        filled
                        :menu-props="{ top: true, offsetY: true, maxHeight: '150px' }"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-select
                        v-model="datoNuevo.idactividades"
                        :items="actividad"
                        item-value="id"
                        item-text="text"
                        label="ACTIVIDAD"
                        filled
                        :menu-props="{ top: true, offsetY: true, maxHeight: '150px' }"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-btn class="ma-2" type="submit" color="success" large block>
                        <v-icon> mdi-calendar-check-outline </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="6" xs="12" v-if="datos === true">
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
          </v-row>
          <v-row v-if="datos === true">
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
                  <v-toolbar color="black darken-3">
                    <v-row>
                      <v-col cols="12" md="12" sm="12">
                        <v-select
                          v-model="trabajador"
                          :items="trabajadores"
                          flat
                          solo-inverted
                          hide-details
                          prepend-inner-icon="mdi-magnify"
                          label="Empleado"
                          clearable
                          @change="mostrarFiltrados()"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-toolbar>
                </template>

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
                                <v-icon meddium left v-if="$vuetify.breakpoint.mdAndUp"
                                  >mdi-clock-time-four</v-icon
                                >
                                {{ item.TiempoTranscurrido }}
                              </v-col>
                              <v-col cols="4" md="4" sm="4" xs="4">
                                <v-div v-if="item.kgactividades > 0">
                                  <v-icon meddium left v-if="$vuetify.breakpoint.mdAndUp">
                                    mdi-weight-kilogram
                                  </v-icon>
                                  {{ item.KgRealizados }}
                                </v-div>
                              </v-col>
                              <v-col cols="4" md="4" sm="4" xs="4">
                                <v-icon meddium left v-if="$vuetify.breakpoint.mdAndUp">
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
                                    v-if="
                                      item.Estatus === 'TERMINADO' &&
                                      item.kgactividades > 0
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
                                <v-list-item-icon v-if="$vuetify.breakpoint.mdAndUp">
                                  <v-icon color="indigo"> mdi-account </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content
                                  :style="
                                    sujeto.nombre === trabajador
                                      ? 'background-color:#47231a'
                                      : 'background: rgb(30 27 27 / 98%)'
                                  "
                                >
                                  <v-list-item-title>
                                    <h3>{{ sujeto.nombre }}</h3>
                                  </v-list-item-title>
                                  <v-list-item-title>
                                    <v-row
                                      :class="titulosdatos"
                                      no-gutters
                                      justify="center"
                                    >
                                      <v-col cols="4" md="4" sm="4" xs="4">
                                        <v-icon
                                          meddium
                                          left
                                          v-if="$vuetify.breakpoint.mdAndUp"
                                          >mdi-clock-time-four</v-icon
                                        >
                                        {{ sujeto.tiempo }}
                                      </v-col>
                                      <v-col cols="4" md="4" sm="4" xs="4">
                                        <v-div v-if="item.kgactividades > 0">
                                          <v-icon
                                            meddium
                                            left
                                            v-if="$vuetify.breakpoint.smAndUp"
                                          >
                                            mdi-weight-kilogram
                                          </v-icon>
                                          {{ sujeto.kg }}
                                        </v-div>
                                      </v-col>
                                      <v-col cols="4" md="4" sm="4" xs="4">
                                        <v-icon
                                          meddium
                                          left
                                          v-if="$vuetify.breakpoint.mdAndUp"
                                        >
                                          mdi-finance
                                        </v-icon>
                                        {{ sujeto.eficiencia }}
                                      </v-col>
                                    </v-row>
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    <v-btn
                                      outlined
                                      block
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
                                <v-col cols="2" md="2" v-if="sujeto.kg > 0 && sujeto.kg">
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

      datoNuevo: {
        responsables: "",
        idactividades: "",
        idasigactivi: "",
        idcontrolactivi: "",
        status: "",
        motivoselec: "",
        motivodes: "",
        idchecksupervisor: "",
      },
      //Desbloqueo de card
      datos: false,

      //DATOS PARA BUSCAR
      Nombre: "",
      empresa: "",

      //Selec buscador
      trabajador: "",
      trabajadores: [],

      //GLOBALES DE EFICIENCIA / EFICACIA
      terminadas: 0,
      asignaciones: 0,
      promedio: 0,
      promedioasig: 0,

      //Datos de la tabla por card
      porcard: [],
      itemsPerPageArray: [4, 6, 8, 12, 20],
      searchcard: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 12,
      sortBy: "id",

      //add kilogramos
      datokg: {
        idasigactivi: "",
        kg: "",
        kgcontrol: "",
        idcontrolactivi: "",
        condicionglobal: "",
      },
    };
  },
  mounted() {
    this.socket = io("http://localhost:3004");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.Buscar();
      this.mostrarControl();
      this.mostrarFiltrados();
    });
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

    /* Mostrar Tabla de control */
    async mostrarControl() {
      try {
        const res = await fetch(
          "http://localhost:3005/Controlasignados?nombre=" +
            this.Nombre +
            "&&empresa=" +
            this.empresa,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.token,
            },
          }
        );
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos);
          if (this.trabajador) {
            const asignaciones = datos.nuevoarray.filter((actividad) => {
              // Filtrar los asignados dentro de la actividad y verificar si el nombre coincide
              return actividad.asignados.some((nom) => nom.nombre === this.trabajador);
            });
            //console.log(asignaciones);
            this.porcard = asignaciones;
          } else {
            this.porcard = datos.nuevoarray;
            this.asignaciones = datos.deldiatotal;
            this.terminadas = datos.terminadastotal;
            this.promedio = datos.promediototal;
            this.promedioasig = datos.promedioasigtotal;
            console.log(this.porcard);
          }

          this.trabajadores = datos.uninombre;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Insertar actividad a la tabla de controlactivi con el resposable correspondiente */
    async submitForm() {
      if (this.datoNuevo.idactividades === "" && this.datoNuevo.responsables === "") {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje =
          "Parece que existen campos vacíos, válida la información nuevamente";
      } else {
        this.datoNuevo.idchecksupervisor = this.Nombre.trimEnd();
        const idAsig = this.actividad.find(
          (filtro) => filtro.id === this.datoNuevo.idactividades
        );
        console.log(idAsig.idasigactivi);
        this.datoNuevo.idasigactivi = idAsig.idasigactivi;
        const res = await fetch("http://localhost:3005/insertarControl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.datoNuevo),
        });
        const datos = await res.json();
        console.log(datos);
        if (res.status === 400) {
          this.alerta = true;
          this.Titulo = "¡Upss!";
          this.Mensaje = datos.mensaje;
        } else {
          this.alerta = true;
          //this.Titulo = "El ID del activo es: ";
          this.Titulo = datos.mensaje;
          this.Mensaje = "";
          this.limpiarFormulario();
          this.mostrarControl();
        }
      }

      //console.log(datos.respuestaMante.mensaje);
    },

    async Buscar() {
      if (this.Nombre === "") {
        return false;
      } else {
        const res = await fetch(
          "http://localhost:3005/buscar_Supervisor/" + this.Nombre,
          {
            headers: {
              "Content-Type": "application/json",
              token: localStorage.token,
            },
          }
        );
        const dato = await res.json();
        //console.log(dato.mensaje);
        if (res.status === 400) {
          this.alerta = true;
          this.Titulo = "¡Upss!";
          this.Mensaje = dato.mensaje;
          this.datos = false;
        } else {
          this.datos = true;
          //console.log("Actividades: ", dato.actividades.respuesta);
          this.actividad = dato.actividades.respuesta.map((filtro) => ({
            id: filtro.idactividades,
            text: filtro.actividad,
            idasigactivi: filtro.idasigactivi,
          }));
          ///console.log("Responsables", dato.responsables.respuesta);
          this.operadores = dato.responsables.map((filtro) => {
            return {
              id: filtro.idPMD,
              text: filtro.Nombre,
            };
          });
          //console.log("Asignadas", dato.asignadas);
          this.asignadas = dato.asignadas;
          this.empresa = dato.empresa;
          //console.log("Empresa", this.empresa);
          this.mostrarControl();
          //console.log("Controlactividades: ",this.controlactivi);
        }
        //console.log(dato.results3)
      }
    },

    /* Limpiar formulario de agendar */
    limpiarFormulario() {
      (this.datoNuevo.responsables = ""), (this.datoNuevo.idactividades = "");
    },

    //Mostrar datos filtrados
    async mostrarFiltrados() {
      if (this.trabajador) {
        this.mostrarControl();
        try {
          const res = await fetch(
            "http://localhost:3005/datoselectcontrol?nave=" +
              this.empresa +
              "&&trabajador=" +
              this.trabajador,
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
            this.searchcard = this.empresa;

            this.asignaciones = datos.deldiatotal;
            this.terminadas = datos.terminadastotal;
            this.promedio = datos.promediototal;
            this.promedioasig = datos.promedioasigtotal;
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      } else {
        this.mostrarControl();
        this.searchcard = "";
        this.trabajador = "";
      }
    },

    //add kg
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
  margin: 0px !important;
}
.theme--dark.v-list {
  background: rgb(30 27 27 / 98%);
}
</style>
