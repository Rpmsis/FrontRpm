<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row>
            <v-col cols="12" md="6">
              <v-card
                class="mt-5"
                style="padding: 10px; text-align: center; font-size: 30px"
              >
                <v-card-title style="background-color: aliceblue; color: black">
                  ASIGNADOS:
                </v-card-title>
                <center>
                  <h1>
                    {{ confechac }}
                  </h1>
                </center>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card
                class="mt-5"
                style="padding: 10px; text-align: center; font-size: 30px"
              >
                <v-card-title style="background-color: aliceblue; color: black">
                  PORCENTAJE DE TERMINADOS:
                </v-card-title>

                <center>
                  <h1>{{ promedioasig }}%</h1>
                </center>
              </v-card>
            </v-col>
          </v-row>
          <v-card class="mt-10" style="padding: 10px">
            <v-slider
              label="SERVICIOS REALIZADOS:"
              v-model="slider1"
              model-value="30"
              readonly
              thumb-label="always"
              :thumb-size="40"
              :max="confechac"
            ></v-slider>
          </v-card>
        </v-flex>
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
      slider1: 0,
      confechac: 0,
      promedioasig: 0,
    };
  },
  mounted() {
    this.socket = io("http://192.168.1.97:3003");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrarGlobal();
    });
    this.mostrarGlobal();
  },

  computed: {},
  methods: {
    /* Mostrar estaus global de las actividades */
    async mostrarGlobal() {
      try {
        const res = await fetch("http://localhost:3001/tableromantt");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos);
          this.confechac = datos.confechacompromiso;
          this.slider1 = datos.atendidos;
          this.promedioasig = datos.promedioatendidostotal; 
          //this.datosEficacia = datos.respuesta.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
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
.highlight-row {
  background-color: rgb(133, 40, 12); /* Cambia el color según lo que prefieras */
}
</style>
