<template>
    <v-app>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card class="mt-7">
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
                      :menu-props="{ top: true, offsetY: true, maxHeight: '150px', }"
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
                      :menu-props="{ top: true, offsetY: true,  maxHeight: '150px' }"
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
                          <v-icon
                            color="white"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click="activi(item.idcontrolactivi)"
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

          <!-- Mostrar dialog con botones-->
          <template>
            <div class="pa-4 text-center">
              <v-dialog v-model="tiempoactivi" max-width="600px">
                <v-card style="padding: 15px; text-align: right;">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="(tiempoactivi = false), limpiarFormulario()">
                      <v-icon style="font-size: 30px"
                        >mdi-close theme--dark red--text</v-icon
                      ></v-btn
                    >
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-row style="margin-top: 5px">
                    <v-col cols="12" md="12">
                      <v-btn icon @click="(tiempoactivi = false), limpiarFormulario()">
                      <v-icon style="font-size: 60px"
                        >mdi-pause-circle theme--dark red--text</v-icon
                      ></v-btn
                    >
                    </v-col>
                  </v-row>
                    <v-row>
                      <v-col cols="12" md="12">
                        <center>
                          <v-btn
                            block
                            style="margin-top: 10px; margin-bottom: 10px"
                            outlined
                            color="green"
                            elevation="16"
                            >INICIAR</v-btn
                          >
                        </center>
                      </v-col>
                    </v-row>
                </v-card>
              </v-dialog>
            </div>
          </template>

          <!-- Formulario de pausa-->
          <template>
            <div class="pa-4 text-center">
              <v-dialog v-model="formpausa" max-width="500px">
                <v-card style="padding: 15px">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="(formpausa = false), limpiarFormulario()">
                      <v-icon style="font-size: 30px"
                        >mdi-close theme--dark red--text</v-icon
                      ></v-btn
                    >
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-form class="mt-5" @submit.prevent="">
                    <v-row>
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
  export default {
    layout: "barra",
    data() {
      return {
        alerta: false,
        Mensaje: "",
        Titulo: "",
        search: "",
        msjbtn:"",
        iniciar: true,
        enproceso:false,
        termiado:false,
        pausa:false,
        reanudar:false,
        tiempoactivi: false,
        formpausa: false,
        controlactivi:[],
        operadores:["RESPONSABLE 1","RESPONSABLE 2","RESPONSABLE 3","RESPONSABLE 4","RESPONSABLE 5","RESPONSABLE 6","RESPONSABLE 7","RESPONSABLE 8","RESPONSABLE 9","RESPONSABLE 10","RESPONSABLE 11","RESPONSABLE 12"],
        actividad:[],
        headers: [
          { text: "Id de asignación", value: "idcontrolactivi" },
          { text: "Responsable", value: "responsables" },
          { text: "Actividad", value: "actividad" },
          { text: "Estatus", value: "estatusC" },
          { text: "Estatus", value: "actions", sortable: false },
        ],
        datoNuevo: {
          responsables: "",
          idactividades: "",
          idasigactivi: "",
          idcontrolactivi: "",
          status: "",
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
      /* Mostrar Actividades del select */
      async mostrarActividades() {
        try {
          const res = await fetch("http://localhost:3001/Controlactividades");
          const datos = await res.json();
          if (res.status == 404) {
            console.error("Error al obtener los datos:", error);
          } else {
            //console.log(datos.respuesta.respuesta);
            this.actividad = datos.respuesta.respuesta.map(filtro => ({
              id: filtro.idactividades,
              text: filtro.actividad,
              idasigactivi: filtro.idasigactivi
              })); 
              console.log(this.actividad)
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        } 
      },

      /* Mostrar Tabla de control */
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

      async activi(item){
        console.log(item);
        this.tiempoactivi = true;

      },
      /* Insertar asignación */
      async submitForm() {
        const idAsig = this.actividad.find((filtro) => filtro.id === this.datoNuevo.idactividades);
        console.log(idAsig.idasigactivi);
        this.datoNuevo.idasigactivi = idAsig.idasigactivi;
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

      async acttiempo(item, estatus){
        console.log(estatus);
        this.msjbtn = estatus;
        this.datoNuevo.idcontrolactivi = item;
        this.datoNuevo.status = "EN PROCESO"
        const res = await fetch("http://localhost:3001/insertarTiempo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",token: localStorage.token
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
        this.mostrarControl();

      }
      },
  
     
      limpiarFormulario() {
       this.datoNuevo.responsables= "",
       this.datoNuevo.idactividades= ""
      },

      getButtonStyle(estatus) {
        console.log("Estatus define color: ",estatus);
        let backgroundColor;
        let color = 'white'; // color del texto
        
        switch (estatus) {
          case 'EN PROCESO':
            backgroundColor = 'orange';
            break;
          case 'INICIAR':
            backgroundColor = '#00e676';
            break;
          default:
            backgroundColor = 'gray'; // color por defecto
        }

        return {
          backgroundColor,
          color
        };
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
    .btnEnviar {
    margin-top: 30px;
    margin-bottom: 50px;
    width: 30%;
    font-size: 20px !important;
    }
    .btn-success {
      background-color: green;
      color: white;
    }

    .btn-warning {
      background-color: orange;
      color: white;
    }

    .btn-error {
      background-color: red;
      color: white;
    }
</style>
  