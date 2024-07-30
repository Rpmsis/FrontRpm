<template>
    <v-app>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title style="padding: 50px"
                >ACTIVIDADES DEL DÍA</v-card-title
              >
              <v-form @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="datoNuevo.responsables"
                      :items="operadores"
                      item-value="text"  
                      item-text="text"
                      label="RESPONSABLE"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                      <v-select
                      v-model="datoNuevo.idactividades"
                      :items="actividad"
                      item-value="id"  
                      item-text="text" 
                      label="ACTIVIDAD"
                      filled
                      ></v-select>
                  </v-col>
                </v-row>
                <center>
                  <v-btn class="btnEnviar" type="submit" color="success" block
                    >Agendar</v-btn
                  >
                </center>
              </v-form>
            </v-card>
            <v-card class="mt-5" style="padding:10px">
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
                      :items="controlactivi"
                      :search="search"
                      :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                      }"
                      :items-per-page="10"
                      :sort-desc="true"
                  >
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
                          <v-btn color="success" block
                    >INICIAR</v-btn
                  >
                          <!-- <v-icon
                              color="white"
                              dark
                              v-bind="attrs"
                              v-on="on"
                              @click="deletee(item.idasigactivi)"
                              small
                              class="mr-2"
                          >
                              mdi-trash-can
                          </v-icon> -->
                          </template>
                          <span>Visualizar</span>
                      </v-tooltip>
                      </template>
                  </v-data-table>
            </v-card>

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
  export default {
    layout: "barra",
    data() {
      return {
        alerta: false,
        Mensaje: "",
        Titulo: "",
        search: "",
        controlactivi:[],
        operadores:["RESPONSABLE 1","RESPONSABLE 2","RESPONSABLE 3"],
        actividad:[],
        headers: [
          { text: "Id de asignación", value: "idcontrolactivi" },
          { text: "Responsable", value: "responsables" },
          { text: "Actividad", value: "actividad" },
          { text: "Estatus", value: "actions", sortable: false },
        ],
        datoNuevo: {
          responsables: "",
          idactividades: "",
        },
      };
    },
    mounted() {
      this.mostrarActividades();
      this.mostrarControl();
    },
  
    computed: {

    },
    methods: {
      /* Mostrar Actividad */
      async mostrarActividades() {
        try {
          const res = await fetch("http://localhost:3001/Controlactividades");
          const datos = await res.json();
          if (res.status == 404) {
            console.error("Error al obtener los datos:", error);
          } else {
            console.log(datos.respuesta.respuesta);
            this.actividad = datos.respuesta.respuesta.map(filtro => ({
              id: filtro.idactividades,
              text: filtro.actividad,
              idasigactivi: filtro.idasigactivi
              })); 
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        } 
      },

      /* Mostrar Actividad */
      async mostrarControl() {
        try {
          const res = await fetch("http://localhost:3001/Controlasignados");
          const datos = await res.json();
          if (res.status == 404) {
            console.error("Error al obtener los datos:", error);
          } else {
            console.log(datos.respuesta.respuesta);
            this.controlactivi = datos.respuesta.respuesta;
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        } 
      },
  
  
      /* Mostrar Asignación */
      /* async mostrarAsignacion() {
        try {
          const res = await fetch("http://localhost:3001/asignacion",{
          method: "GET",
          headers: {
            token: localStorage.token
          },
        });
          const datos = await res.json();
          if (res.status == 404) {
            console.error("Error al obtener los datos:", error);
          } else {
            //this.ubicaciones = datos.respuesta.respuesta;
            this.actividad = datos.respuesta.respuesta;
            console.log(this.actividad);
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      }, */
  
      async submitForm() {
        const res = await fetch("http://localhost:3001/insertarControl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
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
        //console.log(datos.respuestaMante.mensaje);
      }, 
  
      /* Abre el formulario de actualizar */
      /* async actualizar(item) {
        const objeto = this.actividad.find((filtro) => filtro.idasigactivi === item);
        this.datoNuevoActualizar = objeto;
        console.log(this.datoNuevoActualizar);
        this.actiActualizar = true;
        this.fecha2 = this.datoNuevoActualizar.fechainicio;
      }, */
      /* -------------------------------- */
  
      /* Desactivar la asignacion de la actvidad */
      /* async deletee(item) {
        const objeto = this.actividad.find((filtro) => filtro.idasigactivi === item);
        this.datoNuevoActualizar = objeto;
        console.log(this.datoNuevoActualizar);
        this.datoNuevoActualizar.status = "NA";
        this.eliminar = true;
      }, */
      /* -------------------------------- */
  
      /* Api que actualiza los datos  de la tabla */
      /* async actualizaracti() {
        const res = await fetch("http://localhost:3001/actualizarAsig", {
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
      }, */
      /* ------------------------------------------ */
      limpiarFormulario() {
       this.datoNuevo.responsables= "",
       this.datoNuevo.idactividades= ""
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
  