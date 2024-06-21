<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>Asignar activo de insumos</v-card-title>
            <br />
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.prov"
                    type="text"
                    label="Proveedor"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="formData.fDOS"
                    type="text"
                    label="Folio D.O.S"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="formData.numserie"
                    type="text"
                    label="Numero de serie"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
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
                <v-col cols="12" md="4">
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
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.monto"
                    type="number"
                    label="Monto"
                  ></v-text-field>
                </v-col>
              </v-row>
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
              <br />
              <center>
                <v-btn class="btnEnviar" type="submit" color="success">Enviar</v-btn>
              </center>
            </v-form>
          </v-card>
        </v-flex>
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
      activosF: [],
      menuAlta: false,
      menuAdqui: false,
      fechaAlta: null,
      fechaAdqui: null,
      formData: {
        falta: "",
        descrip: "",
        prov: "",
        fDOS: "",
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
      console.log(this.formData);
      const res = await fetch("http://192.168.1.210:3001/insertarInsumos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });
      const datos = await res.json();
      console.log(datos);
      this.limpiarFormulario();
    },
    /* ------------------------------------------------------------ */

    limpiarFormulario() {
      this.formData.prov = "";
      this.formData.fDOS = "";
      this.formData.numserie = "";
      this.fechaAdqui = this.fechaMinima;
      this.fechaAlta = this.fechaMinima;
      this.formData.monto = "";
      this.formData.descrip = "";
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
