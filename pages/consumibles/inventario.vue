<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <br />
            <v-row>
              <v-col cols="12" md="12">
                <h2>ESCANEA EL CÓDIGO DE BARRAS DEL ACTIVO: </h2>
                <v-text-field
                  type="text"
                  label="CÓDIGO DE BARRAS"
                  clearable
                  v-model="formData.codigobarras"
                  filled
                  @input="mostrarExistencias(formData.codigobarras)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mt-5" style="padding: 10px">
            <!-- <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
            ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="folios"
                :search="search"
                :footer-props="{
                'items-per-page-options': [5, 10, 20, 30, 40, 50],
                }"
                :items-per-page="10"
                :sort-desc="true"
            >
            </v-data-table> -->
            <v-card style="padding: 15px" v-show="movimiento">
              <v-form class="mt-5" @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="datosMovimiento.responsable"
                      type="text"
                      label="RESPONSABLE"
                      filled
                    ></v-text-field>
                    <v-text-field
                      v-model="datosMovimiento.cantidad"
                      type="number"
                      label="CANTIDAD"
                      min="1"
                      filled
                    ></v-text-field>
                    <center>
                      <v-btn block outlined color="orange" class="btnEnviar" type="submit"
                        >Registrar movimiento</v-btn
                      >
                    </center>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-data-table
                      :headers="headers"
                      :items="folios"
                      :footer-props="{
                        'items-per-page-options': [5, 10, 20, 30, 40, 50],
                      }"
                      :items-per-page="5"
                      :sort-by="['idcompras']"
                      :sort-desc="true"
                    >
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>

            <v-card style="padding: 15px" v-show="msjmovimiento">
              <v-card-title class="text-h2" style="color: red" > EL ACTIVO NO EXISTE </v-card-title>
            </v-card>
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
      activo: [],
      folios: [],
      headers: [
        { text: "Id del activo", value: "folioActivo" },
        { text: "Tipo", value: "tipo" },
        { text: "Descripción", value: "descripcion" },
        { text: "Cantidad", value: "cantidad" },
      ],
      formData: {
        codigobarras: "",
      },
      datosMovimiento: {
        idconsumibles:"",
        folioActivo:"",
        costo:"",
        cantidad: "",
        responsable: "",
        area:"",
        tipo:"",
        codigobarras:""
      },
    };
  },
  mounted() {},

  computed: {},
  methods: {
    async mostrarExistencias(codigobarras) {
      console.log(codigobarras);
      const cb = codigobarras;
      try {
        const res = await fetch(`http://localhost:3001/movimientos?cb=${cb}`);
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.folios = datos.respuesta.respuesta;
          if(this.formData.codigobarras){
            if (this.folios && this.folios.length > 0) {
            this.movimiento = true;
            this.msjmovimiento = false;
            } else {
              this.msjmovimiento = true;
              this.movimiento = false;
            }
          }
          else{
            this.msjmovimiento = false;
            this.movimiento = false;
          }
          console.log(this.folios);

        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Enviar formulario de actividades */
    async submitForm() {
      this.datosMovimiento.idconsumibles = this.folios[0].idconsumibles;
      this.datosMovimiento.folioActivo = this.folios[0].folioActivo;
      this.datosMovimiento.costo = this.folios[0].costo;
      this.datosMovimiento.tipo = this.folios[0].tipo;
      this.datosMovimiento.costo = this.folios[0].costo;
      this.datosMovimiento.codigobarras = this.folios[0].codigobarras;
      const res = await fetch("http://localhost:3001/insertarMovimiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.datosMovimiento),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        //this.Titulo = "Error";
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        this.Titulo = "MOVIMIENTO REGISTRADO ";
        this.Mensaje = "";
        this.limpiarFormulario();
        this.movimiento = false;
      }
    },
    /* ------------------------------------------------------------ */

    limpiarFormulario() {
      this.datosMovimiento.responsable= "";
      this.datosMovimiento.cantidad= "";
      this.formData.codigobarras= "";
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
