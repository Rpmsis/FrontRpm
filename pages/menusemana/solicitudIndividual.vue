<template>
  <v-container>
    <v-card
      style="background: linear-gradient(to bottom right, white, 10%, darkblueshade)"
      v-show="existe"
      class="mt-5"
    >
      <v-card-title>
        <h4 style="color: White">SELECCIONA LOS PLATILLOS QUE QUIERAS Y GUARDA:</h4>
      </v-card-title>
      <v-form @submit.prevent="submitForm">
        <v-row style="padding-top: 20px">
          <v-col cols="12" sm="2" md="2">
            <v-select
              :items="tipos"
              v-model="enviarDatos.lunes"
              label="LUNES"
              filled
              class="mi-select"
              clearable
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-select
              :items="tipos"
              v-model="enviarDatos.martes"
              label="MARTES"
              filled
              clearable
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-select
              :items="tipos"
              v-model="enviarDatos.miercoles"
              label="MIERCOLES"
              filled
              clearable
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-select
              :items="tipos"
              v-model="enviarDatos.jueves"
              label="JUEVES"
              filled
              clearable
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-select
              :items="tipos"
              v-model="enviarDatos.viernes"
              label="VIERNES"
              filled
              clearable
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <center>
              <v-btn class="btnEnviar" type="submit" color="green"
                ><v-icon color="white" white x-large class="mr-2">
                  mdi-checkbox-marked
                </v-icon></v-btn
              >
            </center>
          </v-col>
        </v-row>
      </v-form>

      <center>
        <h4 style="color: chocolate">
          ¡¡NO OLVIDES FIRMAR AL MOMENTO DE CONSUMIR TUS ALIMENTOS EN EL COMEDOR!!
        </h4>
      </center>
    </v-card>
    <v-card class="mt-5">
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
        :items="comidas"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-by="['fechainicio']"
        :sort-desc="false"
      >
        <template v-slot:item.platoentrada="{ item }">
          <img
            :src="`http://localhost:3001/uploads/${item.imagen1}`"
            alt="Sopa"
            style="width: 150px; height: 150px; padding: 5px"
          />
          <p>{{ item.platoentrada }}</p>
        </template>

        <template v-slot:item.platofuerteA="{ item }">
          <img
            :src="`http://localhost:3001/uploads/${item.imagen3}`"
            alt="Sopa"
            style="width: 150px; height: 150px; padding: 5px"
          />
          <p>{{ item.platofuerteA }}</p>
        </template>

        <template v-slot:item.platofuerteB="{ item }">
          <img
            :src="`http://localhost:3001/uploads/${item.imagen4}`"
            alt="Sopa"
            style="width: 150px; height: 150px; padding: 5px"
          />
          <p>{{ item.platofuerteB }}</p>
        </template>

        <template v-slot:item.bebida="{ item }">
          <img
            :src="`http://localhost:3001/uploads/${item.imagen2}`"
            alt="Sopa"
            style="width: 150px; height: 150px; padding: 5px"
          />
          <p>{{ item.bebida }}</p>
        </template>
      </v-data-table>
    </v-card>

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
          <v-btn color="primary" text @click="(alerta = false), limpiarCheck()">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
      permisocomida: "",
      alerta: false,
      Mensaje: "",
      Titulo: "",
      search: "",
      comidas: [],
      existe: false,
      sopa: "",
      platillos: false,
      tipos: ["A", "B"],
      headers: [
        { text: "Día de la semana", value: "diasemana" },
        { text: "Sopa", value: "platoentrada" },
        { text: "Plato fuerte A", value: "platofuerteA" },
        { text: "Plato fuerte B", value: "platofuerteB" },
        { text: "Bebida", value: "bebida" },
      ],
      idcheck: "",
      enviarDatos: {
        idmenusemana: "",
        lunes: "",
        martes: "",
        miercoles: "",
        jueves: "",
        viernes: "",
        nombre: "",
        idcheck: "",
        numsemana: "",
      },
    };
  },
  mounted() {
    this.mostrar();
    this.mostrarPermisos();
  },

  computed: {},
  methods: {
    async mostrarPermisos() {
      //console.log(respon);
      try {
        const res = await fetch("http://localhost:3001/permisos", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        console.log(datos);
        this.permisocomida = datos.mensaje;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async mostrarExistencias(respon) {
      const numsemana = this.enviarDatos.numsemana;
      //console.log(respon);
      try {
        const res = await fetch(
          `http://localhost:3001/Idcheck?idcheck=${respon}&numsemana=${numsemana}`
        );
        const datos = await res.json();
        //console.log(datos);
        if (res.status === 400) {
          this.alerta = true;
          //this.Titulo = "Error";
          this.Titulo = "¡Upss!";
          this.Mensaje = datos.mensaje;
          this.existe = false;
          this.limpiarFormulario();
        } else {
          this.existe = true;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/Semanamenu");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.comidas = datos.respuesta.respuesta;
          this.enviarDatos.numsemana = datos.respuesta.respuesta[0].numsemana;
          //console.log(this.comidas);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async seleccionar(item) {
      this.enviarDatos.idmenusemana = item;
      this.platillos = true;
    },
    limpiarCheck() {
      this.idcheck = "";
    },

    limpiarFormulario() {
      this.enviarDatos.idmenusemana = "";
      this.enviarDatos.lunes = "";
      this.enviarDatos.martes = "";
      this.enviarDatos.miercoles = "";
      this.enviarDatos.jueves = "";
      this.enviarDatos.viernes = "";
      this.enviarDatos.nombre = "";
    },
    async submitForm() {
      this.enviarDatos.idcheck = this.idcheck.trimEnd();
      console.log(this.enviarDatos.idcheck);
      const res = await fetch("http://localhost:3001/insertarSolicitudcomida", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(this.enviarDatos),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        //this.Titulo = "Error";
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        this.Titulo = datos.mensaje;
        this.Mensaje = " ";
        this.limpiarFormulario();
        this.enviarDatos.idcheck = "";
        this.existe = false;
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
  padding: 0px 10px 0px 10px;
}
.btnEnviar {
  margin-bottom: 10px;
  width: 50%;
  height: 55px !important;
  font-size: 20px !important;
}
.multi-line-header {
  white-space: pre-line;
}
.responsive-gif {
  width: 100px;
  height: 100px;
  border-radius: 30px;
}
</style>
