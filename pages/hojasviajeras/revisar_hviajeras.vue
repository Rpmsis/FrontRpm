<template>
  <v-container>
    <v-row>
      <v-col v-for="(registro, index) in revisar" :key="index" cols="12" md="4" sm="12">
        <v-card class="mx-auto" max-width="400" style="border-radius: 15px">
          <v-card-title
            style="
              background: linear-gradient(135deg, #6a11cb, #2575fc);
              color: white;
              border-radius: 15px 15px 0 0;
            "
          >
            Id del viaje: {{ registro.idviaje }}
          </v-card-title>

          <v-card-text>
            <div class="my-4 text-subtitle-1">Fecha: {{ registro.fecha }}</div>

            <div>Origen: {{ registro.origen }}</div>
            <div>Destino: {{ registro.destino }}</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>
            <v-badge
              :content="registro.folioshv.length"
              :value="registro.folioshv.length"
              color="green"
              overlap
              style="margin-right: 10px"
            >
              <v-icon large> mdi-note-text </v-icon>
            </v-badge>
            Hojas viajeras asignadas:
          </v-card-title>

          <v-card-text>
            <v-list class="scroll-container" two-line>
              <v-list-item
                v-for="(folio, index) in (registro.folioshv || []).map(
                  (datos) => datos.folios
                )"
                :key="index"
              >
                <v-list-item-icon>
                  <v-icon color="indigo"> mdi-pound-box-outline </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ folio }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="mostrardialog(registro.idviaje)"
            >
              <v-icon> mdi-chevron-up</v-icon> Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="confirmar"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="(confirmar = false), limpiarFormulario()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Cerrar</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="(confirmar = false), guardarfolio()">
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="12">
                <v-file-input
                  v-model="formdatos.evidencia"
                  show-size
                  counter
                  label="File input"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

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
</template>

<script>
import io from "socket.io-client";
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
      addfolio: false,
      revisar: [],
      confirmar: false,

      selection: 1,

      formdatos: {
        evidencia: null,
        id: 0,
      },
    };
  },

  async mounted() {
    this.mostrar();
    this.socket = io("http://192.168.1.97:3003");
    this.socket.on("registrado", (datos) => {
      //console.log(datos);
      this.mostrar();
    });
  },

  computed: {},

  methods: {
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/vijeshv", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos);
          this.revisar = datos.revisar;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    mostrardialog(item) {
      this.formdatos.id = item;
      this.confirmar = true;
    },
    async guardarfolio() {
      const formulario = new FormData();
      formulario.append("id", this.formdatos.id);
      formulario.append("archivo", this.formdatos.evidencia);
      const res = await fetch("http://localhost:3001/revisarFolio", {
        method: "PUT",
        headers: {
          token: localStorage.token,
        },
        body: formulario,
      });
      const datos = await res.json();
      //console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
        this.confirmar = true;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.confirmar = false;
        this.mostrar();
        this.limpiarFormulario();
      }
    },

    limpiarFormulario() {
      this.formdatos.id = 0;
      this.formdatos.evidencia = null;
    },
  },
};
</script>

<style>
.scroll-container {
  max-height: 85px; /* Ajusta según sea necesario */
  overflow-y: auto; /* Habilita el desplazamiento vertical */
}
.theme--dark.v-list {
  background: rgb(180 155 155 / 18%) !important;
}
</style>
