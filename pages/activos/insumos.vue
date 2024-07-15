<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title style="padding: 50px">Alta de activos de insumos</v-card-title>
            <v-form @submit.prevent="submitForm">
              <!-- row 1: tipo, proveedor, folio OC -->
              <v-row>
                <v-col cols="12" md="3">
                  <v-select
                    :items="tipo"
                    v-model="formData.tipoAct"
                    label="Tipo de activo"
                    filled
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.proveedor"
                    type="text"
                    label="Proveedor"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="formData.folioOC"
                    type="text"
                    label="Folio de orden de compra"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- row 2: fecha adquisicion, fecha alta, monto, serie -->
              <v-row>
                <v-col cols="12" md="3">
                  <v-menu
                    v-model="menuAdqui"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="fechaAdqui"
                        label="Fecha adquisición"
                        outlined
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fechaAdqui"
                      :min="fechaMinima"
                      @input="menuAdqui = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                  <v-menu
                    v-model="menuAlta"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="fechaAlta"
                        label="Fecha alta"
                        outlined
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fechaAlta"
                      :min="fechaMinima"
                      @input="menuAlta = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="formData.monto"
                    prefix="$"
                    label="Monto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="formData.numserie"
                    type="text"
                    label="Número de serie"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Descripcion -->
              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea
                    clear-icon="mdi-close-circle"
                    label="Descripción"
                    clearable
                    style="border: white"
                    v-model="formData.descrip"
                  ></v-textarea>
                </v-col>
              </v-row>
              <center>
                <v-btn class="btnEnviar" type="submit" color="success">Enviar</v-btn>
              </center>
            </v-form>
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
                  <v-btn color="primary" text @click="alerta = false">
                      Cerrar
                  </v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
      </v-layout>
    </v-container>
  </v-app>
</template>

/* Fijoo */
<script>
import ImageZoom from "~/components/ImageZoom.vue";
export default {
  components: {
    ImageZoom,
  },
  layout: "barra",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      activosF: [],
      menuAlta: false,
      menuAdqui: false,
      fechaAlta: null,
      fechaAdqui: null,
      tipo: [
        "HERRAMIENTA",
        "VEHÍCULOS",
        "MONTACARGAS",
        "MAQUINARIA",
        "EQUIPOS ELECTRONICOS",
      ],
      formData: {
        tipoAct: "",
        falta: "",
        descrip: "",
        proveedor: "",
        folioOC: "",
        monto: "",
        fadqui: "",
        numserie: "",
      },
    };
  },
  mounted() {
    this.fechaAlta = this.fechaMinima;
    this.fechaAdqui = this.fechaMinima;
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
    async submitForm() {
      this.formData.falta = this.fechaAlta;
      this.formData.fadqui = this.fechaAdqui; 
      const res = await fetch("http://192.168.1.82:3001/insertarInsumos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });
      const datos = await res.json();
      if(res.status === 400){
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje =
          "Parece que existen campos vacíos, válida la información nuevamente";
        
      }else{
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Id del activo:";
        this.Mensaje = datos.mensaje;
        this.limpiarFormulario();
      }
      console.log(datos); 
    },
    /* ------------------------------------------------------------ */

    limpiarFormulario() {
      this.formData.proveedor = "";
      this.formData.folioOC = "";
      this.formData.numserie = "";
      this.fechaAdqui = this.fechaMinima;
      this.fechaAlta = this.fechaMinima;
      this.formData.monto = "";
      this.formData.descrip = "";
      this.formData.tipoAct = "";
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
