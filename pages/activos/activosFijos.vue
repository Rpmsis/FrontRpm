<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>Alta de activos</v-card-title>
            <br />
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="12">
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
                        label="Fecha alta"
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
export default {
  layout: "barra",
  data() {
    return {
      activosF: [],
      menu: false,
      fecha: null,
      formData: {
        falta: "",
        descrip: "",
      },
    };
  },
  mounted() {
    this.fecha = this.fechaMinima;
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
      this.formData.falta = this.fecha;
      console.log(this.formData);
      const res = await fetch("http://192.168.1.82:3001/insertarFolio", {
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
    limpiarFormulario() {
      this.fecha = this.fechaMinima;
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
