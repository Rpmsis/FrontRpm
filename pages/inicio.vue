<template>
  <v-app>
    <v-container>
      <v-layout row wrap style="padding: 20px">
        <v-flex>
          <v-row>
            <v-col cols="12" md="12">
              <v-card>
                <v-card-title>REPORTES</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a href="/graficas/graficas">
                    <h4 class="modulo">Reporte en graficas</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-card
                style="
                  background: linear-gradient(
                    to bottom right,
                    white,
                    90%,
                    rgba(9, 97, 116, 1)
                  );
                  text-align: left;
                  margin-top: 15px;
                "
              >
                <v-row style="padding: 5px">
                  <v-col cols="12" md="12">
                    <center>
                      <h2 style="color: rgba(9, 97, 116, 1)">
                        <v-icon color="rgba(9, 97, 116, 1)" dark large class="mr-2">
                          mdi-notebook-heart-outline
                        </v-icon>
                        SOLICITADOS
                      </h2>
                    </center>
                    <h3 style="color: black; font-family: cursive; font-size: 30px">
                      ≃ Lunes: {{ lunes }}
                    </h3>
                    <h3 style="color: black; font-family: cursive; font-size: 30px">
                      ≃ Martes: {{ martes }}
                    </h3>
                    <h3 style="color: black; font-family: cursive; font-size: 30px">
                      ≃ Miercoles: {{ miercoles }}
                    </h3>
                    <h3 style="color: black; font-family: cursive; font-size: 30px">
                      ≃ Jueves: {{ jueves }}
                    </h3>
                    <h3 style="color: black; font-family: cursive; font-size: 30px">
                      ≃ Viernes: {{ viernes }}
                    </h3>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="3">
              <template>
                <v-carousel style="height: 300px !important">
                  <v-carousel-item
                    v-for="(item, i) in items"
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
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>MENÚ DE LA SEMANA</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a href="/menusemana/formenu">
                    <h4 class="modulo">Agregar comida</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/menusemana/solicitudMultiple">
                    <h4 class="modulo">Solicitar comida</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>CAPITAL HUMANO</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a href="/capital_humano/user_registro">
                    <h4 class="modulo">AGREGAR USUARIO</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/capital_humano/asistencia">
                    <h4 class="modulo">ASISTENCIAS DEL DÍA</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/capital_humano/todoasistencia">
                    <h4 class="modulo">TODAS LAS ASISTENCIAS</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>TABLEROS</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/tablerologistica">
                    <h4 class="modulo">TABLERO LOGISTICA</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/mantenimiento/tablero">
                    <h4 class="modulo">TABLERO MANTENIMIENTO</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="12" md="6">
              <v-card>
                <v-card-title>MONITOREO DE ACTIVIDADES</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/actForaneas">
                    <h4 class="modulo">Alta de actividades</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/asignacion">
                    <h4 class="modulo">Asignacion de actividades</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/actdiarias">
                    <h4 class="modulo">Actividades del día</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/editeficienciakg">
                    <h4 class="modulo">Editar kilogramos</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/eficacia">
                    <h4 class="modulo">Tablero de actividades</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/control">
                    <h4 class="modulo">Supervisores</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/actividades/porusuario">
                    <h4 class="modulo">Actividades</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>ACTIVOS CONSUMIBLES</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/consumible">
                    <h4 class="modulo">Alta de consumibles</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/codigobarras">
                    <h4 class="modulo">Lista de consumibles</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/inventario">
                    <h4 class="modulo">Consumo</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/devolucion">
                    <h4 class="modulo">Devolución</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/vigenciaprestamo">
                    <h4 class="modulo">Vigencia de prestamos</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/consumibles/minimo">
                    <h4 class="modulo">Ultimas piezas</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>CONTABILIDAD {{ nombre }}</v-card-title>
                <!-- <v-card class="v-sheet theme--dark">
                  <a href="/SGI/noconformidad">
                      <h4 class="modulo">Tickets de no conformidad</h4>
                  </a>
                </v-card> -->
                <!-- <v-card class="v-sheet theme--dark">
                  <a href="/activos/ubicacion">
                      <h4 class="modulo">Alta de ubicaciones</h4>
                  </a>
                </v-card>  -->
                <v-card class="v-sheet theme--dark">
                  <a href="/socioscomerciales/provusuario">
                    <h4 class="modulo">Usuario proveedor</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/socioscomerciales/proveedores">
                    <h4 class="modulo">Aprobar proveedores</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/socioscomerciales/mostrarProv">
                    <h4 class="modulo">Mostrar proveedores</h4>
                  </a>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>ACTIVOS FIJOS</v-card-title>
                <v-card class="v-sheet theme--dark">
                  <a
                    href="/activos/insumos"
                    v-if="nombre === 'LUIS REY HERNANDEZ ROMERO'"
                  >
                    <h4 class="modulo">Activos de insumos</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/activos/entregaactivosfijos">
                    <h4 class="modulo">Entrega insumos</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/activos/mantenimiento">
                    <h4 class="modulo">Alta de activos de mantenimiento</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/activos/mostActmantt">
                    <h4 class="modulo">Actualizar activo mantenimiento</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/activos/mostmantt">
                    <h4 class="modulo">Mostrar activos de mantenimiento</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/preguntaSeg/formulario">
                    <h4 class="modulo">Generar preguntas</h4>
                  </a>
                </v-card>
                <v-card class="v-sheet theme--dark">
                  <a href="/preguntaSeg/mostrarPreg">
                    <h4 class="modulo">Ver preguntas</h4>
                  </a>
                </v-card>
                <!--  <v-card class="v-sheet theme--dark">
                  <a href="ayuda">
                      <h4 class="modulo">Ayuda</h4>
                  </a>
                </v-card> -->
              </v-card>
            </v-col>
          </v-row>

          <!-- Cambiar foto de perfil -->
          <template>
            <div class="pa-4 text-center">
              <v-dialog v-model="fotodeperfil" persistent max-width="400px">
                <v-card style="padding: 15px">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="(fotodeperfil = false), limpiarFormulario()">
                      <v-icon style="font-size: 30px"
                        >mdi-close theme--dark red--text</v-icon
                      ></v-btn
                    >
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-form class="mt-5" @submit.prevent="actualizaracti">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <center>
                          <img
                            v-if="imagePreview1"
                            :width="250"
                            :height="250"
                            aspect-ratio="16/9"
                            cover
                            :src="imagePreview1"
                            alt="Imagen de la sopa"
                          />
                          <v-file-input
                            counter
                            show-size
                            prepend-icon="mdi-camera-plus"
                            label="Imagen de la sopa"
                            v-model="Solicitud.archivo"
                            @change="updateImagePreview"
                          ></v-file-input>
                        </center>
                      </v-col>
                    </v-row>
                    <center>
                      <v-btn block outlined class="btnEnviar" type="submit" color="pink"
                        >Guardar</v-btn
                      >
                    </center>
                  </v-form>
                </v-card>
              </v-dialog>
            </div>
          </template>
        </v-flex>
      </v-layout>
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
      permisocomida: "",
      alerta: false,
      Mensaje: "",
      nombre: this.$store.state.nombre,
      Titulo: "",
      gifSrc: "http://localhost:3001/uploads/1724950497597-SPAGUETTI-CON-PIMIENTOS.jpg",
      imageSrc: "/logoimg.jpg",
      menudeldia: {},
      platoentrada: "",
      platofuerteA: "",
      platofuerteB: "",
      bebida: "",
      imagenesNombre: [],
      imgplatoentrada: "",
      imgbebida: "",
      imgplatoA: "",
      imgplatoB: "",
      enviar: null,
      foto: "",
      fotodeperfil: false,
      imagePreview1: null,
      numsemana: "",
      headers: [
        { text: "Nombre", align: "start", value: "name" },
        { text: "Edad", value: "age" },
        { text: "Email", value: "email" },
      ],
      items: [
        { id: 1, name: "Juan", age: 30, email: "juan@example.com" },
        { id: 2, name: "María", age: 25, email: "maria@example.com" },
        { id: 3, name: "Pedro", age: 40, email: "pedro@example.com" },
        { id: 4, name: "Ana", age: 35, email: "ana@example.com" },
      ],
      Solicitud: {
        archivo: null,
      },

      tokenStorage: "",
      lunes: "",
      martes: "",
      miercoles: "",
      jueves: "",
      viernes: "",

      items: [],
    };
  },
  mounted() {
    this.mostrar();
    this.mostrarFotoperfil();
    this.mostrarPermisos();
  },
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
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/Menudeldia");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.menudeldia = datos.respuesta.respuesta;
          this.platoentrada = datos.respuesta.respuesta[0].platoentrada;
          this.platofuerteA = datos.respuesta.respuesta[0].platofuerteA;
          this.platofuerteB = datos.respuesta.respuesta[0].platofuerteB;
          this.bebida = datos.respuesta.respuesta[0].bebida;
          this.numsemana = datos.respuesta.respuesta[0].numsemana;
          this.mostrarPedido(this.numsemana);
          this.cargarImagenes(datos);
          //console.log(this.imgplatoentrada);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    cargarImagenes(datos) {
      this.items = [
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
    },
    async mostrarFotoperfil() {
      try {
        const res = await fetch("http://localhost:3001/foto", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          this.foto = `http://localhost:3001/fotoperfil/${datos.respuesta.respuesta[0].foto}`;
          //console.log(datos.respuesta.respuesta);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async mostrarPedido(numsemana) {
      try {
        const res = await fetch(
          `http://localhost:3001/pedidocomida?numsemana=${numsemana}`,
          {
            method: "GET",
            headers: {
              token: localStorage.token,
            },
          }
        );
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos.solicito);
          this.lunes = datos.solicito.lunes;
          this.martes = datos.solicito.martes;
          this.miercoles = datos.solicito.miercoles;
          this.jueves = datos.solicito.jueves;
          this.viernes = datos.solicito.viernes;
          console.log(this.lunes, this.martes, this.miercoles, this.jueves, this.viernes);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
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
    async actualizaracti() {
      const formulario = new FormData();
      formulario.append("archivo", this.Solicitud.archivo);
      const res = await fetch("http://localhost:3001/actualizarFotoperfil", {
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
        this.limpiarFormulario();
        this.mostrarFotoperfil();
        this.fotodeperfil = false;
      }
    },
    limpiarFormulario() {
      (this.Solicitud.archivo = null), (this.imagePreview1 = null);
    },
  },
};
</script>
<style>
.v-application a {
  text-decoration: none !important;
}
.modulo {
  padding: 20px;
  color: white;
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
  font-family: "Roboto", sans-serif !important;
}
.v-sheet.v-card {
  margin-bottom: 30px;
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
</style>
