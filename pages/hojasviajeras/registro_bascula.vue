<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card style="padding: 15px">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="(addfolio = false), limpiarFormulario()">
              <v-icon style="font-size: 30px">mdi-close theme--dark red--text</v-icon>
            </v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-form class="mt-5" @submit.prevent="guardarfolio">
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="formData.infoviaje"
                  label="Informacion del folio"
                  rows="3"
                  disabled
                  filled
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="12">
                <v-select
                  v-model="formData.viaje"
                  :items="infolios"
                  item-text="viaje"
                  item-value="id"
                  label="Informacion del folio"
                  filled
                  @change="mostinfoviaje"
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="formData.folio"
                  label="Folio de la hoja"
                ></v-text-field>
              </v-col>
            </v-row>
            <center>
              <v-btn block outlined color="orange" type="submit">Registrar</v-btn>
            </center>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" sm="12">
        <v-data-iterator
          :items="registros"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          :search="search"
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
          hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar dark color="blue darken-3" class="mb-1">
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
              ></v-text-field>
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <v-spacer></v-spacer>
                <v-select
                  v-model="sortBy"
                  flat
                  solo-inverted
                  hide-details
                  :items="keys"
                  prepend-inner-icon="mdi-magnify"
                  label="Sort by"
                ></v-select>
                <v-spacer></v-spacer>
                <v-btn-toggle v-model="sortDesc" mandatory>
                  <v-btn large depressed color="blue" :value="false">
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                  <v-btn large depressed color="blue" :value="true">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </template>
            </v-toolbar>
          </template>

          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="6"
                md="6"
                lg="6"
              >
                <v-card>
                  <v-card-actions>
                    <v-card-title class="subheading font-weight-bold">
                      Id hoja viajera: {{ item.id }}
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="cancelarconpermiso(item.viaje)">
                      <v-icon style="font-size: 30px">
                        mdi-close theme--dark red--text
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-divider></v-divider>

                  <v-list dense>
                    <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                      <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                        {{ key }}:
                      </v-list-item-content>
                      <v-list-item-content
                        class="align-end"
                        :class="{ 'blue--text': sortBy === key }"
                      >
                        {{ item[key.toLowerCase()] }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center">
              <span class="grey--text">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageArray"
                    :key="index"
                    @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-spacer></v-spacer>

              <span class="mr-4 grey--text">
                Page {{ page }} of {{ numberOfPages }}
              </span>
              <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
    <!-- Ventana emergente -->
    <v-dialog v-model="permiso" max-width="500" persistent>
      <v-card style="background-color: rgb(4 0 4 / 70%)">
        <v-card-title class="text-h4">
          Viaje: {{ formData.idviaje }}
        </v-card-title>
        <v-card-text class="text-h6 text-center">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="formData.idcheck"
                label="QR de autorización"
                autofocus
                type="password"
               
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn class="ma-1" color="grey" text @click="(permiso = false), (formData.idcheck = '')">
            Cerrar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="ma-1" color="error" text @click="cancelarfolios()">
            Delete
          </v-btn>
        </v-card-actions>
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
      registros: [],
      infolios: [],

      permiso: false,

      headers: [
        { text: "Id viaje ", value: "idviajes" },
        { text: "Folio", value: "folio" },
        { text: "Fecha de registros", value: "fecha_registro" },
      ],
      formData: {
        viaje: "",
        folio: "",
        infoviaje: "",
        idviaje: "",
        idcheck: "",
      },

      //Datos de la tabla por card
      itemsPerPageArray: [4, 6, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 6,
      sortBy: "id",
      keys: [],
    };
  },

  async mounted() {
    this.mostrar();
    this.mostrarviajes();
    this.socket = io("http://localhost:3003");
    this.socket.on("revisado", (datos) => {
      //console.log(datos);
      this.mostrar();
      this.mostrarviajes();
    });
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.registros.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "id");
    },
  },

  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },

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
          //console.log(datos.respuesta);
          this.infolios = datos.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async mostrarviajes() {
      try {
        const res = await fetch("http://localhost:3001/foliohviajeras", {
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
          this.registros = datos.respuesta;
          this.keys = Object.keys(datos.respuesta[0]);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    mostinfoviaje(item) {
      this.formData.infoviaje = this.infolios.find((datos) => datos.id === item).viaje;
      //console.log(this.formData.infoviaje);
    },
    async guardarfolio() {
      const res = await fetch("http://localhost:3001/registrarfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });
      const datos = await res.json();
      //console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = datos.respuesta.mensaje;
        this.Mensaje = "";
        this.addfolio = false;
        this.mostrarviajes();
        this.limpiarFormulario();
      }
    },

    limpiarFormulario() {
      this.formData.folio = "";
      this.formData.infoviaje = "";
      this.formData.viaje = "";
    },

    cancelarconpermiso(item) {
      //console.log(item);
      this.permiso = true;
      this.formData.idviaje = item;
    },

    async cancelarfolios() {
      const res = await fetch("http://localhost:3001/cancelarfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });
      const datos = await res.json();
      console.log(datos);
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
        this.formData.idcheck = "";
      } else {
        this.alerta = true;
        this.Titulo = "Cancelado!!";
        this.Mensaje = "";
        this.permiso = false;
        this.formData.idcheck = "";
        this.mostrarviajes();
      }
    },
  },
};
</script>

<style></style>
