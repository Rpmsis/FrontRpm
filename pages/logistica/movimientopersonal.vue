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
        :sort-by="['idpersonal_logistica']"
        :sort-desc="true"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-switch
                v-model="item.estatus"
                color="success"
                inset
                @click="actpersonal(item)"
              ></v-switch>
            </template>
            <span>Visualizar</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-btn icon @click="addpersonal = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark green--text</v-icon>
      </v-btn>
      <!-- Formulario insertar-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="addpersonal" persistent max-width="500px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="addpersonal = false">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="insertpersonal">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-select
                      v-model="formData.nombre"
                      :items="nombres"
                      label="Nombre del colaborador"
                      filled
                    >
                      <template v-slot:prepend-item>
                        <v-list-item>
                          <v-list-item-content>
                            <v-text-field
                              v-model="searchNomInsert"
                              placeholder="Search"
                              @input="searchNombreInsert"
                            ></v-text-field>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
                      </template>
                    </v-select>
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

      addpersonal: false,
      personalact: false,

      colaboradores: [],

      //Buscar nombre
      nombres: [],
      searchNomInsert: "",
      nombresFijos: [],
      //-----------------

      headers: [
        { text: "Nombre ", value: "nombre" },
        { text: "Puesto", value: "puesto" },
        { text: "Edit estatus", value: "actions" },
      ],
      formData: {
        nombre: "",
      },
      formDataedit: {
        id: "",
        estatus: false,
      },
    };
  },

  async mounted() {
    this.mostrar();
    this.mostrarpersonas();
    /* this.socket = io("http://192.168.1.97:3004");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
    }); */
  },
  methods: {
    /* Agregar buscador */
    async searchNombreInsert() {
      if (!this.searchNomInsert) {
        this.nombres = this.nombresFijos;
      }
      //console.log("Desde la funcion",this.nombresFijos);
      this.nombres = this.nombresFijos.filter((nom) => {
        return nom.toLowerCase().indexOf(this.searchNomInsert.toLowerCase()) > -1;
      });
    },

    /* Muestra el personal de logistica */
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/personalogistica", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.colaboradores = datos.respuesta.map((datos) => {
            return {
              idpersonal_logistica: datos.idpersonal_logistica,
              nombre: datos.nombre,
              puesto: datos.puesto,
              estatus: datos.estatus === "true" ? true : false,
            };
          });

          console.log(this.colaboradores);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async mostrarpersonas() {
      try {
        const res = await fetch("http://localhost:3001/altarhlogistica", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos.respuesta);
          this.nombresFijos = datos.respuesta.map((sujeto) => sujeto.NombreCompleto);
          //console.log("nombresFijos ",this.nombresFijos);
          this.nombres = [...this.nombresFijos];
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    
    /* Actualizar el estatus de la tabla */
    async actpersonal(item) {
      console.log(item);
      this.formDataedit.id = item.idpersonal_logistica;
      this.formDataedit.estatus = item.estatus;
      const res = await fetch("http://localhost:3001/editoperadorlog", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formDataedit),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.mostrar();
      }
    },

    /* Insertar datos en la tabla logistica_personal */
    async insertpersonal() {
      const res = await fetch("http://localhost:3001/operadorlog", {
        method: "POST",
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
        this.limpiarFormulario();
        (this.searchNomInsert = ""), (this.nombres = [...this.nombresFijos]);
        this.addpersonal = false;
        this.mostrar();
      }
    },
    limpiarFormulario() {
      this.formData.nombre = "";
    },
  },
};
</script>

<style></style>
