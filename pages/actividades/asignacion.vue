<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title style="padding: 50px">ASIGNACIÓN DE ACTIVIDADES</v-card-title>
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="4">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="fecha"
                        label="FECHA DE INICIO"
                        outlined
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fecha"
                      :min="fechaMinima"
                      @input="menu = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="datoNuevo.empresa"
                    :items="ubicaciones"
                    item-value="text"
                    item-text="text"
                    label="EMPRESA"
                    @change="mostrarActividades"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="datoNuevo.idactividad"
                    :items="actividades"
                    item-value="id"
                    item-text="text"
                    label="ACTIVIDAD"
                    filled
                  ></v-select>
                </v-col>
              </v-row>
              <center>
                <v-btn class="btnEnviar" type="submit" color="success" block
                  >Guardar</v-btn
                >
              </center>
            </v-form>
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
              :items="actividad"
              :search="search"
              :footer-props="{
                'items-per-page-options': [5, 10, 20, 30, 40, 50],
              }"
              :items-per-page="10"
              :sort-by="['fechainicio']"
              :sort-desc="true"
            >
              <template v-slot:item.tiempo="{ item }">
                {{ `${item.hora}:${item.minutos}` }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <!-- <v-icon
                            color="white"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click="actualizar(item.idasigactivi)"
                            small
                            class="mr-2"
                        >
                            mdi-eye
                        </v-icon> -->
                    <v-icon
                      color="white"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="deletee(item.idasigactivi)"
                      small
                      class="mr-2"
                    >
                      mdi-trash-can
                    </v-icon>
                  </template>
                  <span>Visualizar</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>

          <!-- Formulario actualizar-->
          <template>
            <div class="pa-4 text-center">
              <v-dialog v-model="actiActualizar" persistent max-width="1000px">
                <v-card style="padding: 15px">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="actiActualizar = false">
                      <v-icon style="font-size: 30px"
                        >mdi-close theme--dark red--text</v-icon
                      ></v-btn
                    >
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-form class="mt-5" @submit.prevent="actualizaracti">
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="fecha2"
                              label="FECHA DE INICIO"
                              outlined
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="fecha2"
                            :min="fechaMinima"
                            @input="menu2 = false"
                          >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="datoNuevoActualizar.empresa"
                          :items="ubicaciones"
                          label="EMPRESA"
                          filled
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="datoNuevoActualizar.idactividad"
                          :items="actividades"
                          item-value="id"
                          item-text="text"
                          label="ACTIVIDAD"
                          filled
                        ></v-select>
                      </v-col>
                    </v-row>
                    <center>
                      <v-btn block outlined color="orange" class="btnEnviar" type="submit"
                        >Actualizar</v-btn
                      >
                    </center>
                  </v-form>
                </v-card>
              </v-dialog>
            </div>
          </template>

          <!-- Formulario eliminar la asignacion de la actividad-->
          <template>
            <div class="pa-4 text-center">
              <v-dialog v-model="eliminar" persistent max-width="600px">
                <v-card style="padding: 15px">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="eliminar = false">
                      <v-icon style="font-size: 30px"
                        >mdi-close theme--dark red--text</v-icon
                      ></v-btn
                    >
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-form class="mt-5" @submit.prevent="actualizaracti">
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-textarea
                          clear-icon="mdi-close-circle"
                          label="DESCRIBE EL MOTIVO.."
                          clearable
                          style="border: white"
                          v-model="datoNuevoActualizar.motivo"
                        ></v-textarea>
                        <center>
                          <v-btn
                            block
                            outlined
                            color="error"
                            class="btnEnviar"
                            type="submit"
                            >Eliminar</v-btn
                          >
                        </center>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card>
              </v-dialog>
            </div>
          </template>
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
      search: "",
      menu: "",
      fecha: "",
      menu2: "",
      fecha2: "",
      actiActualizar: false,
      eliminar: false,
      actividades: [],
      empresas: [],
      actividad: [],
      ubicaciones: [],
      headers: [
        {
          text: "Id de\nasignación",
          value: "idasigactivi",
          align: "center",
          class: "multi-line-header",
        },

        { text: "Fecha de inicio", value: "fechainicio" },
        { text: "Actividad", value: "actividad" },
        { text: "Empresa", value: "empresa" },

        {
          text: "Tiempo\nestimado",
          value: "tiempo",
          align: "star",
          class: "multi-line-header",
        },

        { text: "Editar", value: "actions", sortable: false },
      ],
      datoNuevo: {
        fechainicio: "",
        empresa: "",
        idactividad: "",
      },
      datoNuevoActualizar: {
        idasigactivi: "",
        fechainicio: "",
        empresa: "",
        idactividad: "",
        status: "",
        motivo: "",
      },
    };
  },
  mounted() {
    this.fecha = this.fechaMinima;
    this.socket = io("http://192.168.1.97:3004");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrarubi();
      this.mostrarActividades();
      this.mostrarAsignacion();
    });
    this.mostrarubi();
    this.mostrarAsignacion();
  },

  computed: {
    fechaMinima() {
      // Obtener la fecha actual
      const fechaAct = new Date();
      const year = fechaAct.getFullYear();
      const month = String(fechaAct.getMonth() + 1).padStart(2, "0");
      const day = String(fechaAct.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    /* Mostrar la lista de actividades que ya cargaron el actForaneas */
    async mostrarActividades() {
      const empre = this.datoNuevo.empresa;
      //console.log(empre);
      try {
        const res = await fetch("http://localhost:3005/actividades",{
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        //console.log(datos);
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          const datosA = datos.respuesta.respuesta.filter(
            (filtro) => filtro.ubicacion === empre
          );
          //console.log(datosA);
          this.actividades = datosA.map((filtro) => ({
            id: filtro.idactividades,
            text: filtro.actividad,
          }));
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar ubicaciónes  */
    async mostrarubi() {
      try {
        const res = await fetch("http://localhost:3005/ubicacion",{
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        //console.log(datos);
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos.ubicacionesPDM);
          this.ubicaciones = datos.ubicacionesPDM.map((filtro) => ({
            id: filtro.idubicacion,
            text: filtro.descrip,
          }));
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar Asignación */
    async mostrarAsignacion() {
      try {
        const res = await fetch("http://localhost:3005/asignacion", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        //console.log(datos);
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //this.ubicaciones = datos.respuesta.respuesta;
          this.actividad = datos.nuevarespuesta;
          //console.log(this.actividad);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Guardar acitividad asignada */
    async submitForm() {
      this.datoNuevo.fechainicio = this.fecha;
      //console.log(this.datoNuevo.idactividad);
      const res = await fetch("http://localhost:3005/insertarAsigactividad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(this.datoNuevo),
      });
      const datos = await res.json();
      //console.log(datos);
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
        this.mostrarAsignacion();
      }
      //console.log(datos.respuestaMante.mensaje);
    },

    /* Abre el formulario de actualizar */
    async actualizar(item) {
      const objeto = this.actividad.find((filtro) => filtro.idasigactivi === item);
      this.datoNuevoActualizar = objeto;
      //console.log(this.datoNuevoActualizar);
      this.actiActualizar = true;
      this.fecha2 = this.datoNuevoActualizar.fechainicio;
    },
    /* -------------------------------- */

    /* Abre el formulario para desactivar la asignacion de la actvidad */
    async deletee(item) {
      const objeto = this.actividad.find((filtro) => filtro.idasigactivi === item);
      this.datoNuevoActualizar = objeto;
      //console.log(this.datoNuevoActualizar);
      this.datoNuevoActualizar.status = "NA";
      this.eliminar = true;
    },
    /* -------------------------------- */

    /* Desactiva la actividad asignada */
    async actualizaracti() {
      const res = await fetch("http://localhost:3005/actualizarAsig", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datoNuevoActualizar),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Datos actualizados";
        this.Mensaje = " ";
        this.actiActualizar = false;
        this.mostrarAsignacion();
        this.limpiarFormularioElim();
      }
    },
    /* ------------------------------------------ */
    limpiarFormulario() {
      this.fecha = this.fechaMinima;
      this.datoNuevo.empresa = "";
      this.datoNuevo.idactividad = "";
    },
    limpiarFormularioElim() {
      this.datoNuevoActualizar.motivo = "";
      this.eliminar = false;
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
