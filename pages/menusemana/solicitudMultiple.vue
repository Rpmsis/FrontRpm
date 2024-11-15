<template>
  <v-container>
    <v-btn v-if="permiso==='true'" text class="btnmenu" color="primary" @click="solicitar = true"> 
      <v-icon style="font-size: 50px">mdi-nutrition theme--dark yellow--text</v-icon> 
      SOLICITAR COMIDA 
    </v-btn>


    <div class="pa-4 text-center">
      <v-dialog v-model="solicitar" max-width="1600" persistent>
        <v-card style="padding: 15px">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="(solicitar = false), limpiarCheck(), (existe = false)">
              <v-icon style="font-size: 30px"
                >mdi-close theme--dark red--text</v-icon
              ></v-btn
            >
          </v-card-actions>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-card
            style="
              background: linear-gradient(to bottom right, white, 10%, darkblueshade);
            "
          >
            <v-card-title> MENÚ DE LA SEMANA {{ enviarDatos.numsemana }} </v-card-title>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  type="password"
                  clearable
                  label="ESCANEA TU QR Y ELIGE TUS PLATILLOS"
                  v-model="idcheck"
                  filled
                  @input="mostrarExistencias(idcheck)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-card
            style="
              background: linear-gradient(to bottom right, white, 10%, darkblueshade);
            "
            v-show="existe"
            class="mt-5"
          >
            <v-card-title>
              <center>
                <h4 style="color: white">
                  SELECCIONA LOS PLATILLOS QUE QUIERAS Y GUARDA:
                </h4>
              </center>
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
                    @click="carruselpordia(1)"
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
                    @click="carruselpordia(2)"
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
                    @click="carruselpordia(3)"
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
                    @click="carruselpordia(4)"
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
                    @click="carruselpordia(5)"
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
          </v-card>

          <v-card class="mt-5">
            <v-row justify="center">
              <v-col v-show="uno" cols="12" md="4">
                <h4>LUNES</h4>
                <template>
                  <v-carousel style="height: 300px !important">
                    <v-carousel-item
                      v-for="(item, i) in itemslunes"
                      :key="i"
                      :src="item.src"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    >
                      <div class="title">{{ item.title }}</div>
                    </v-carousel-item>
                  </v-carousel>
                </template>
              </v-col>
              <v-col v-show="dos" cols="12" md="4">
                <h4>MARTES</h4>
                <template>
                  <v-carousel style="height: 300px !important">
                    <v-carousel-item
                      v-for="(item, i) in itemsmartes"
                      :key="i"
                      :src="item.src"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    >
                      <div class="title">{{ item.title }}</div>
                    </v-carousel-item>
                  </v-carousel>
                </template>
              </v-col>
              <v-col v-show="tres" cols="12" md="4">
                <h4>MIERCOLES</h4>
                <template>
                  <v-carousel style="height: 300px !important">
                    <v-carousel-item
                      v-for="(item, i) in itemsmiercoles"
                      :key="i"
                      :src="item.src"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    >
                      <div class="title">{{ item.title }}</div>
                    </v-carousel-item>
                  </v-carousel>
                </template>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col v-show="cuatro" cols="12" md="4">
                <h4>JUEVES</h4>
                <template>
                  <v-carousel style="height: 300px !important">
                    <v-carousel-item
                      v-for="(item, i) in itemsjueves"
                      :key="i"
                      :src="item.src"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    >
                      <div class="title">{{ item.title }}</div>
                    </v-carousel-item>
                  </v-carousel>
                </template>
              </v-col>
              <v-col v-show="cinco" cols="12" md="4">
                <h4>VIERNES</h4>
                <template>
                  <v-carousel style="height: 300px !important">
                    <v-carousel-item
                      v-for="(item, i) in itemsviernes"
                      :key="i"
                      :src="item.src"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    >
                      <div class="title">{{ item.title }}</div>
                    </v-carousel-item>
                  </v-carousel>
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-dialog>
    </div>

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
      solicitar: false,
      permiso: "",

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

      uno: true,
      dos: true,
      tres: true,
      cuatro: true,
      cinco: true,

      itemslunes: [],
      itemsmartes: [],
      itemsmiercoles: [],
      itemsjueves: [],
      itemsviernes: [],
    };
  },
  mounted() {
    this.mostrar();
  },

  computed: {},
  methods: {
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
          this.uno = true;
          this.dos = true;
          this.tres = true;
          this.cuatro = true;
          this.cinco = true;
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
          console.log(datos);
          this.comidas = datos.respuesta.respuesta;
          this.enviarDatos.numsemana = datos.respuesta.respuesta[0].numsemana;
          this.permiso = datos.permiso;
          this.cargarImagenes(datos);
          //console.log(this.comidas);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    cargarImagenes(datos) {
      this.itemslunes = [
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[0].imagen1}`,
          title: `SOPA: ${datos.respuesta.respuesta[0].platoentrada}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[0].imagen2}`,
          title: `PLATO A: ${datos.respuesta.respuesta[0].platofuerteA}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[0].imagen3}`,
          title: `PLATO B: ${datos.respuesta.respuesta[0].platofuerteB}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[0].imagen4}`,
          title: `BEBIDA: ${datos.respuesta.respuesta[0].bebida}`,
        },
      ];
      this.itemsmartes = [
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[1].imagen1}`,
          title: `SOPA: ${datos.respuesta.respuesta[1].platoentrada}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[1].imagen2}`,
          title: `PLATO A: ${datos.respuesta.respuesta[1].platofuerteA}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[1].imagen3}`,
          title: `PLATO B: ${datos.respuesta.respuesta[1].platofuerteB}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[1].imagen4}`,
          title: `BEBIDA: ${datos.respuesta.respuesta[1].bebida}`,
        },
      ];
      this.itemsmiercoles = [
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[2].imagen1}`,
          title: `SOPA: ${datos.respuesta.respuesta[2].platoentrada}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[2].imagen2}`,
          title: `PLATO A: ${datos.respuesta.respuesta[2].platofuerteA}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[2].imagen3}`,
          title: `PLATO B: ${datos.respuesta.respuesta[2].platofuerteB}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[2].imagen4}`,
          title: `BEBIDA: ${datos.respuesta.respuesta[2].bebida}`,
        },
      ];
      this.itemsjueves = [
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[3].imagen1}`,
          title: `SOPA: ${datos.respuesta.respuesta[3].platoentrada}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[3].imagen2}`,
          title: `PLATO A: ${datos.respuesta.respuesta[3].platofuerteA}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[3].imagen3}`,
          title: `PLATO B: ${datos.respuesta.respuesta[3].platofuerteB}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[3].imagen4}`,
          title: `BEBIDA: ${datos.respuesta.respuesta[3].bebida}`,
        },
      ];
      this.itemsviernes = [
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[4].imagen1}`,
          title: `SOPA: ${datos.respuesta.respuesta[4].platoentrada}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[4].imagen2}`,
          title: `PLATO A: ${datos.respuesta.respuesta[4].platofuerteA}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[4].imagen3}`,
          title: `PLATO B: ${datos.respuesta.respuesta[4].platofuerteB}`,
        },
        {
          src: `http://localhost:3001/uploads/${datos.respuesta.respuesta[4].imagen4}`,
          title: `BEBIDA: ${datos.respuesta.respuesta[4].bebida}`,
        },
      ];
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
        this.uno = true;
        this.dos = true;
        this.tres = true;
        this.cuatro = true;
        this.cinco = true;
      } else {
        this.alerta = true;
        this.Titulo = datos.mensaje;
        this.Mensaje = " ";
        this.limpiarFormulario();
        this.enviarDatos.idcheck = "";
        this.existe = false;
        this.uno = true;
        this.dos = true;
        this.tres = true;
        this.cuatro = true;
        this.cinco = true;
      }
    },

    carruselpordia(num) {
      console.log(num);
      if (num === 1) {
        this.uno = true;
        this.dos = false;
        this.tres = false;
        this.cuatro = false;
        this.cinco = false;
      } else {
        if (num === 2) {
          this.uno = false;
          this.dos = true;
          this.tres = false;
          this.cuatro = false;
          this.cinco = false;
        } else {
          if (num === 3) {
            this.uno = false;
            this.dos = false;
            this.tres = true;
            this.cuatro = false;
            this.cinco = false;
          } else {
            if (num === 4) {
              this.uno = false;
              this.dos = false;
              this.tres = false;
              this.cuatro = true;
              this.cinco = false;
            } else {
              if (num === 5) {
                this.uno = false;
                this.dos = false;
                this.tres = false;
                this.cuatro = false;
                this.cinco = true;
              } else {
                // Si no se ha seleccionado ninguno de los números (1-5), se ponen todos en true.
                this.uno = true;
                this.dos = true;
                this.tres = true;
                this.cuatro = true;
                this.cinco = true;
              }
            }
          }
        }
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
.v-image {
  height: 350px !important;
}
.title {
  position: absolute;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
}
.btnmenu {
  width: 100%;
}
</style>
