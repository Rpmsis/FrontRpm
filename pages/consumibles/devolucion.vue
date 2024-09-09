<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <br />
            <v-row>
              <v-col cols="12" md="12">
                <h2 style="color: #bf73f1">ESCANEA EL CÓDIGO DE BARRAS DE LA PERSONA:</h2>
                <v-text-field
                  type="text"
                  label="CÓDIGO DE BARRAS"
                  clearable
                  v-model="formData.responsable"
                  filled
                  @input="mostrarExistencias(formData.responsable)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mt-5" style="padding: 10px">
            <v-card style="padding: 15px" v-show="movimiento">
              <v-card-title>
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
                :items="prestamos"
                :search="search"
                :footer-props="{
                  'items-per-page-options': [10, 20, 30, 40, 50],
                }"
                :items-per-page="10"
                :sort-desc="true"
              >
                <template v-slot:item.actions="{ item }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="#bf73f1"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        @click="devolver(item.idprestamo)"
                        medium
                        class="mr-4"
                      >
                        mdi-rotate-right
                      </v-icon>
                    </template>
                    <span>Devolución</span>
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-card>

            <v-card style="padding: 15px" v-show="msjmovimiento">
              <v-card-title class="text-h2" style="color: red">
                NO TIENE PRESTAMOS
              </v-card-title>
            </v-card>

             <!-- Formulario devolucion -->
            <template>
              <div class="pa-4 text-center">
                <v-dialog v-model="formdevolucion" persistent max-width="600px">
                  <v-card style="padding: 15px">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="(formdevolucion = false), limpiarFormulario()">
                        <v-icon style="font-size: 30px"
                          >mdi-close theme--dark red--text</v-icon
                        ></v-btn
                      >
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-form class="mt-5" @submit.prevent="submitForm">
                      <!-- row 1: tipo, proveedor, folio OC -->
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-text-field
                            type="number"
                            label="CANTIDAD"
                            v-model="datosDevolucion.cantidad"
                            filled
                            min="1"
                          ></v-text-field>
                          <center>
                          <v-btn block outlined class="btnEnviar" type="submit" color="success"
                            >Guardar</v-btn
                          >
                        </center>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card>
                </v-dialog>
              </div>
            </template>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- Ventana emergente -->
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
      movimiento: false,
      msjmovimiento: false,
      formdevolucion: false,
      activo: [],
      prestamos: [],
      editprestamo:[],
      headers: [
        { text: "Id del activo/consumible", value: "folioActivo" },
        { text: "Fecha de solicitud", value: "fecha" },
        { text: "Responsable", value: "responsable" },
        { text: "Área", value: "area" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Costo", value: "costo" },
        {
          text: "Registrar\ndevolución",
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],
      formData: {
        responsable: "",
      },
      datosDevolucion: {
        folioActivo:"",
        idprestamo: "",
        cantidad: "",
        responsable:"",
      },
    };
  },
  mounted() {},

  computed: {},
  methods: {
    /* Mostrar tabla de prestamos delresponsable */
    async mostrarExistencias(respon) {
      console.log(respon);
      try {
        const res = await fetch(`http://localhost:3001/Prestamo?responsable=${respon}`);
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.prestamos = datos.respuesta.respuesta;
          if (this.formData.responsable) {
            if (this.prestamos && this.prestamos.length > 0) {
              this.movimiento = true;
              this.msjmovimiento = false;
              //console.log(this.prestamos);
              //this.mostrarHistorialcb(this.folios[0].folioActivo);
            } else {
              this.msjmovimiento = true;
              this.movimiento = false;
            }
          } else {
            this.msjmovimiento = false;
            this.movimiento = false;
          } 
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Mostrar formulario de devolución */
    async devolver(item){
      const consumible= this.prestamos.find((filtro) => filtro.idprestamo === item);
      //console.log(consumible);
      this.editprestamo = consumible;
      this.formdevolucion= true;

    },
    /* Enviar formulario de actividades */
    async submitForm() {
      //console.log(this.editprestamo.folioActivo);
      this.datosDevolucion.folioActivo = this.editprestamo.folioActivo;
      this.datosDevolucion.idprestamo = this.editprestamo.idprestamo;
      this.datosDevolucion.responsable = this.formData.responsable;
      console.log(this.datosDevolucion);
      const res = await fetch("http://localhost:3001/actualizarPrestamo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datosDevolucion),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        //this.Titulo = "Error";
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        this.Titulo = "DEVOLUCIÓN REGISTRADA ";
        this.Mensaje = "";
        this.limpiarFormulario();
        this.formdevolucion = false; 
        this.mostrarExistencias(this.editprestamo.responsable);
      } 
    },
    /* ------------------------------------------------------------ */

    limpiarFormulario() {
      this.datosDevolucion.cantidad = "";
    
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
