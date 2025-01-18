<template>
  <v-container>
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
        :items="colaboradores"
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
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                small
                class="mr-2"
                @click="mostformulario(item)"
              >
                mdi-account-edit
              </v-icon>
            </template>
            <span>Visualizar</span>
          </v-tooltip>
        </template>
      </v-data-table>

      <!-- Formulario actualizar-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="pdmactualizar" persistent max-width="500px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="pdmactualizar = false">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="actpdm">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="formData.nombre"
                      append-icon="mdi-account"
                      label="Nombre"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-switch
                      v-model="formData.estatus"
                      :label="formData.estatus"
                      color="success"
                      inset
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-select
                      v-model="formData.ubicacion"
                      :items="ubicaciones"
                      label="UBICACIÓN"
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-select
                      v-model="formData.puesto"
                      :items="puesto"
                      label="PUESTO"
                      filled
                    ></v-select>
                  </v-col>
                </v-row>
                <center>
                  <v-btn block outlined color="orange" type="submit">Actualizar</v-btn>
                </center>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>
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
      search: "",
      pdmactualizar: false,
      colaboradores: [],
      ubicaciones: [],
      estatus: false,
      puesto: ["SUPERVISOR", "AYUDANTE GENERAL"],
      headers: [
        { text: "Nombre ", value: "Nombre" },
        { text: "Ubicacion", value: "Ubicacion" },
        { text: "Puesto", value: "Puesto" },
        { text: "Editar", value: "actions" },
      ],
      formData: {
        id: "",
        nombre: "",
        puesto: "",
        ubicacion: "",
        estatus: false,
      },
    };
  },

  async mounted() {
    this.mostrar();
    this.mostrarubicaciones();
    this.socket = io("http://192.168.1.97:3004");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
    });
  },
  methods: {
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3005/pdm", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos.mensaje);
          this.colaboradores = datos.mensaje;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async mostrarubicaciones() {
      try {
        const res = await fetch("http://localhost:3005/ubicacion", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos.ubicacionesPDM);
          this.ubicaciones = datos.ubicacionesPDM.map((datos) => datos.descrip);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    mostformulario(item) {
      this.pdmactualizar = true;
      this.formData.id = item.idPDM;
      this.formData.nombre = item.Nombre;
      this.formData.puesto = item.Puesto;
      this.formData.ubicacion = item.Ubicacion;
      this.formData.estatus = item.estatus === "true" ? true : false;

      console.log(this.formData.estatus);
    },
    async actpdm() {
      const res = await fetch("http://localhost:3005/updatepdm", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.mensaje;
        this.Mensaje = "";
        this.pdmactualizar = false;
        this.mostrar();
      }
    },

    limpiarFormulario() {},
  },
};
</script>

<style></style>
