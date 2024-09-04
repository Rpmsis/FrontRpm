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
        :items="comidas"
        :search="search"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50],
        }"
        :items-per-page="10"
        :sort-by="['fechainicio']"
        :sort-desc="false"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="white"
                dark
                v-bind="attrs"
                v-on="on"
                @click="actualizar(item.idmenusemana)"
                small
                class="mr-2"
              >
                mdi-eye
              </v-icon>
            </template>
            <span>Visualizar</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-btn icon @click="formcomidas = true" style="margin-left: 15px; margin-top: 5px">
        <v-icon style="font-size: 50px">mdi-plus-circle theme--dark yellow--text</v-icon>
      </v-btn>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="formcomidas" persistent max-width="800px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(formcomidas = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="submitForm">
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
                          label="Fecha de inicio"
                          outlined
                          readonly
                          v-on="on"
                          filled
                          prepend-icon="mdi-calendar-range"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="fecha" @input="menu = false" filled>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="text"
                      label="Sopa: "
                      prepend-icon="mdi-noodles"
                      v-model="enviarDatos.platoentrada"
                      @input="
                        enviarDatos.platoentrada = enviarDatos.platoentrada.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="text"
                      label="Bebida: "
                      prepend-icon="mdi-beer-outline"
                      v-model="enviarDatos.bebida"
                      @input="enviarDatos.bebida = enviarDatos.bebida.toUpperCase()"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imagePreview1"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imagePreview1"
                        alt="Imagen de la sopa"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      prepend-icon="mdi-camera-plus"
                      label="Imagen de la sopa"
                      v-model="Solicitud.archivo"
                      @change="updateImagePreview"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imagePreview2"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imagePreview2"
                        alt="Imagen de la bebida"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen de la bebida"
                      prepend-icon="mdi-camera-plus"
                      v-model="Solicitud.archivo2"
                      @change="updateImagePreview2"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="text"
                      label="Plato fuerte A: "
                      prepend-icon="mdi-food-turkey"
                      v-model="enviarDatos.platofuerteA"
                      @input="
                        enviarDatos.platofuerteA = enviarDatos.platofuerteA.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="text"
                      label="Plato fuerte B: "
                      prepend-icon="mdi-food-turkey"
                      v-model="enviarDatos.platofuerteB"
                      @input="
                        enviarDatos.platofuerteB = enviarDatos.platofuerteB.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imagePreview3"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imagePreview3"
                        alt="Imagen del plato fuerte A"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen del plato fuerte A"
                      prepend-icon="mdi-camera-plus"
                      v-model="Solicitud.archivo3"
                      @change="updateImagePreview3"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imagePreview4"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imagePreview4"
                        alt="Imagen del plato fuerte B"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen del plato fuerte B"
                      v-model="Solicitud.archivo4"
                      prepend-icon="mdi-camera-plus"
                      @change="updateImagePreview4"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <center>
                  <v-btn block outlined class="btnEnviar" type="submit" color="yellow"
                    >Guardar</v-btn
                  >
                </center>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>

      <!-- Formulario actualizar-->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="actComida" persistent max-width="800px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="actComida = false">
                  <v-icon style="font-size: 30px"
                    >mdi-close theme--dark red--text</v-icon
                  ></v-btn
                >
              </v-card-actions>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="actualizaracti">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="fecha2"
                          label="Fecha de inicio"
                          outlined
                          readonly
                          v-on="on"
                          filled
                          prepend-icon="mdi-calendar-range"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="fecha2" @input="menu2 = false" filled>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="text"
                      label="Sopa: "
                      prepend-icon="mdi-noodles"
                      v-model="actualizarDatos.platoentrada"
                      @input="
                        actualizarDatos.platoentrada = actualizarDatos.platoentrada.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="text"
                      label="Bebida: "
                      prepend-icon="mdi-beer-outline"
                      v-model="actualizarDatos.bebida"
                      @input="
                        actualizarDatos.bebida = actualizarDatos.bebida.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imageAct1"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imageAct1"
                        alt="Imagen de la sopa"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      prepend-icon="mdi-camera-plus"
                      label="Imagen de la sopa"
                      v-model="actualizarDatos.archivo"
                      @change="updateImage"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imageAct2"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imageAct2"
                        alt="Imagen de la bebida"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen de la bebida"
                      prepend-icon="mdi-camera-plus"
                      v-model="actualizarDatos.archivo2"
                      @change="updateImage2"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="text"
                      label="Plato fuerte A: "
                      prepend-icon="mdi-food-turkey"
                      v-model="actualizarDatos.platofuerteA"
                      @input="
                        actualizarDatos.platofuerteA = actualizarDatos.platofuerteA.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="text"
                      label="Plato fuerte B: "
                      prepend-icon="mdi-food-turkey"
                      v-model="actualizarDatos.platofuerteB"
                      @input="
                        actualizarDatos.platofuerteB = actualizarDatos.platofuerteB.toUpperCase()
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imageAct3"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imageAct3"
                        alt="Imagen del plato fuerte A"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen del plato fuerte A"
                      prepend-icon="mdi-camera-plus"
                      v-model="actualizarDatos.archivo3"
                      @change="updateImage3"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <center>
                      <img
                        v-if="imageAct4"
                        :width="100"
                        :height="100"
                        aspect-ratio="16/9"
                        cover
                        :src="imageAct4"
                        alt="Imagen del plato fuerte B"
                      />
                    </center>
                    <v-file-input
                      counter
                      show-size
                      label="Imagen del plato fuerte B"
                      v-model="actualizarDatos.archivo4"
                      prepend-icon="mdi-camera-plus"
                      @change="updateImage4"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <center>
                  <v-btn block outlined color="orange" class="btnEnviar" type="submit"
                    >Actualizar</v-btn
                  >
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
      search: "",
      dias: ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"],
      comidas: [],
      menu: false,
      fecha: null,
      menu2: false,
      fecha2: null,
      formcomidas: false,
      actComida: false,
      imagePreview1: null,
      imagePreview2: null,
      imagePreview3: null,
      imagePreview4: null,
      imageAct1: null,
      imageAct2: null,
      imageAct3: null,
      imageAct4: null,

      headers: [
        { text: "Id comida", value: "idmenusemana" },
        { text: "Día de la semana", value: "diasemana" },
        { text: "Sopa", value: "platoentrada" },
        { text: "Plato fuerte A", value: "platofuerteA" },
        { text: "Plato fuerte B", value: "platofuerteB" },
        { text: "Bebida", value: "bebida" },
        { text: "Fecha del día", value: "fechainicio" },
        {
          text: "Editar comida",
          value: "actions",
          sortable: false,
          align: "center",
          class: "multi-line-header",
        },
      ],
      enviarDatos: {
        fechainicio: "",
        platoentrada: "",
        platofuerteA: "",
        platofuerteB: "",
        bebida: "",
      },
      actualizarDatos: {
        idmenusemana: "",
        fechainicio: "",
        platoentrada: "",
        platofuerteA: "",
        platofuerteB: "",
        bebida: "",
        archivo: null,
        archivo2: null,
        archivo3: null,
        archivo4: null,
      },
      Solicitud: {
        archivo: null,
        archivo2: null,
        archivo3: null,
        archivo4: null,
      },
    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
    updateImagePreview() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview1 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview1 = null;
      }
    },
    updateImagePreview2() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo2;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview2 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview2 = null;
      }
    },
    updateImagePreview3() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo3;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview3 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview3 = null;
      }
    },
    updateImagePreview4() {
      //console.log(this.Solicitud.archivo);
      const file = this.Solicitud.archivo4;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview4 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview4 = null;
      }
    },

    updateImage() {
      //console.log(this.Solicitud.archivo);
      const file = this.actualizarDatos.archivo;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageAct1 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageAct1 = null;
      }
    },
    updateImage2() {
      //console.log(this.Solicitud.archivo);
      const file = this.actualizarDatos.archivo2;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageAct2 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageAct2 = null;
      }
    },
    updateImage3() {
      //console.log(this.Solicitud.archivo);
      const file = this.actualizarDatos.archivo3;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageAct3 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageAct3 = null;
      }
    },
    updateImage4() {
      //console.log(this.Solicitud.archivo);
      const file = this.actualizarDatos.archivo4;
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageAct4 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageAct4 = null;
      }
    },
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/Menusemana");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.comidas = datos.respuesta.respuesta;
          //console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    /* Abre el formulario de actualizar */
    async actualizar(item) {
      const objeto = this.comidas.find((filtro) => filtro.idmenusemana === item);
      this.actualizarDatos = objeto;
      this.fecha2 = objeto.fechainicio;
      console.log(this.actualizarDatos);
      this.actComida = true;
    },
    /* -------------------------------- */

    async submitForm() {
      console.log(this.enviarDatos);
      const formulario = new FormData();
      formulario.append("fechainicio", this.fecha);
      formulario.append("platoentrada", this.enviarDatos.platoentrada);
      formulario.append("platofuerteA", this.enviarDatos.platofuerteA);
      formulario.append("platofuerteB", this.enviarDatos.platofuerteB);
      formulario.append("bebida", this.enviarDatos.bebida);
      formulario.append("archivo", this.Solicitud.archivo);
      formulario.append("archivo2", this.Solicitud.archivo2);
      formulario.append("archivo3", this.Solicitud.archivo3);
      formulario.append("archivo4", this.Solicitud.archivo4);
      const res = await fetch("http://localhost:3001/insertarMenu", {
        method: "POST",
        headers: {
          token: localStorage.token,
        },
        body: formulario,
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
        this.formcomidas = false;
        this.mostrar();
      }
    },

    /* ------------------------------------------------------------ */

    /* ------------------------------------------------------------ */
    /* Api que actualiza los datos  de la tabla */
    async actualizaracti() {
      const formulario = new FormData();
      formulario.append("idmenusemana", this.actualizarDatos.idmenusemana);
      formulario.append("fechainicio", this.fecha2);
      formulario.append("platoentrada", this.actualizarDatos.platoentrada);
      formulario.append("platofuerteA", this.actualizarDatos.platofuerteA);
      formulario.append("platofuerteB", this.actualizarDatos.platofuerteB);
      formulario.append("bebida", this.actualizarDatos.bebida);
      formulario.append("archivo", this.actualizarDatos.archivo);
      formulario.append("archivo2", this.actualizarDatos.archivo2);
      formulario.append("archivo3", this.actualizarDatos.archivo3);
      formulario.append("archivo4", this.actualizarDatos.archivo4);
      const res = await fetch("http://localhost:3001/actualizarMenusemana", {
        method: "PUT",
        headers: {
          token: localStorage.token,
        },
        body: formulario,
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Datos actualizados";
        this.Mensaje = " ";
        this.actComida = false;
        this.imagePreview1 = null,
        this.imagePreview2 = null,
        this.imagePreview3 = null,
        this.imagePreview4 = null,
        this.mostrar();
      }
    },
    /* ------------------------------------------ */

    limpiarFormulario() {
      this.enviarDatos.diasemana = "";
      this.enviarDatos.platoentrada = "";
      this.enviarDatos.platofuerteA = "";
      this.enviarDatos.platofuerteB = "";
      this.enviarDatos.bebida = "";
      this.fecha = "";
      this.Solicitud.archivo = null;
      this.imagePreview1 = null;
      this.Solicitud.archivo2 = null;
      this.imagePreview2 = null;
      this.Solicitud.archivo3 = null;
      this.imagePreview3 = null;
      this.Solicitud.archivo4 = null;
      this.imagePreview4 = null;
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
  margin-top: 10px;
  margin-bottom: 10px;
  width: 30%;
  font-size: 20px !important;
}
.multi-line-header {
  white-space: pre-line;
}
</style>
