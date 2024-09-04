<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title><h1>CREAR PREGUNTAS</h1></v-card-title>
            <br />
            <v-form @submit.prevent="enviar">
              <v-row>
                <v-col cols="12" md="8">
                  <h4 style="color: chocolate">
                    *Nota: registre una pregunta cerrada, las respuestas se limitan a un
                    "SI o NO"
                  </h4>
                  <br />
                  <v-text-field
                    v-model="FormDatos.pregunta"
                    label="Escribe una pregunta.."
                    filled
                  >
                  </v-text-field>
                  <br>
                  <h4>
                    *Selecciona los activos donde aplica esta pregunta
                  </h4>
                  <br>
                  <v-select
                    v-model="FormDatos.activo"
                    :items="activos"
                    label="Activos"
                    rows="3"
                    chips
                    multiple
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 style="margin-bottom: 20px">
                    Responsable del ticket de inconformidad:
                  </h4>

                  <v-select
                    v-model="FormDatos.inconformidad"
                    :items="ticketMal"
                    label="Responsable del área.."
                    filled
                  ></v-select>

                  <v-select
                    :items="status"
                    v-model="FormDatos.estatus"
                    label="Estatus"
                    filled
                  ></v-select>

                  <v-select
                    :items="periodo"
                    v-model="FormDatos.periodo"
                    label="Periodo"
                    filled
                  ></v-select>
                </v-col>
              </v-row>
              <br />            
              <center>
                <v-btn block class="btnEnviar" type="submit" color="success">Enviar</v-btn>
              </center>
            </v-form>
          </v-card>
        </v-flex>
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
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "barra",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      nombre: this.$store.state.nombre,
      text1: true,
      text2: true,
      text3: true,
      selected1: true,
      respon: ["Logistica", "Mantenimiento", "Seguridad"],
      status: ["Activo", "Inactivo"],
      periodo: ["Diario", "Semanal", "Quincenal", "Mensual", "Anual"],
      activos: [],
      ticketMal: [
        "TECNOLOGÍAS DE LA INFORMACIÓN",
        "SISTEMAS DE GESTIÓN DE LA CALIDAD",
        "AUDITORÍA INTERNA Y ACTOS IRREGULARES",
        "PROCESAMIENTO DE MATERIALES",
        "CONTROL DE INVENTARIOS",
        "SEGURIDAD, SALUD Y MEDIO AMBIENTE",
        "SISTEMA DE RECOLECCIÓN",
        "LOGÍSTICA INTERNA",
        "CAPITAL HUMANO",
        "COMPRAS DE INSUMOS Y SERVICIOS",
        "LOGÍSTICA INTERNACIONAL (EXPORTACIÓN)",
        "CUENTA EMPRESAS",
        "COMPRAS NO INDUSTRIALES",
        "VENTAS INTERNACIONALES",
        "VENTAS NACIONALES COMERCIALES",
        "PROSPECCIÓN DE COMPRAS EMPRESARIALES",
        "ATENCIÓN A PROVEEDORES",
        "MENTENIMIENTO INDUSTRIAL",
        "CONTABILIDAD"
      ],

      FormDatos: {
        pregunta: "",
        periodo: "",
        estatus: "",
        inconformidad: "",
        activo: [],
      },
    };
  },
  mounted() {
    this.mostrar();
    this.FormDatos.responsable = this.nombre;
  },

  methods: {
    async mostrar() {
      try {
        const res = await fetch("http://localhost:3001/unidades");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:");
        } else {
          /* this.activos = datos.respuesta.respuesta; */
          this.activos = datos.respuesta.respuesta.map((activo) => [activo.folioActivo]);

          console.log(this.activos);
        }
        /* console.log(datos.respuesta.respuesta);  */
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    
    async enviar() {
      //console.log(this.FormDatos);
      const res = await fetch("http://localhost:3001/insertarForms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(this.FormDatos),
      })
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
        this.limpiarFormulario();
      }
    },
    // Método para limpiar el formulario
    limpiarFormulario() {
      this.FormDatos.pregunta = "";
      this.FormDatos.estatus = "";
      this.FormDatos.periodo = "";
      this.FormDatos.inconformidad = "";
      this.FormDatos.activo = "";
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
  padding-top: 50px;
  padding-bottom: 50px;
}
.row {
  padding: 0px 20px 0px 20px;
}
.lineas {
  padding: 40px 50px 40px 50px;
}
.btnEnviar {
  margin-top: 30px;
  margin-bottom: 50px;
  width: 30%;
  font-size: 20px !important;
}

.botonAct {
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
