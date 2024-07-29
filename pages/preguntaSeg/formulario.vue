<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title><h1>CREAR PREGUNTAS</h1></v-card-title>
            <br />
            <v-form @submit.prevent="enviarFormulario">
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
                <v-btn class="btnEnviar" type="submit" color="success">Enviar</v-btn>
              </center>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "barra",
  data() {
    return {
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
        "Tecnologías de la información",
        "Mantenimiento industrial",
        "Sistemas de gestión de calidad",
        "Logística interna",
        "Compras de insumos y servicios",
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
        const res = await fetch("http://192.168.1.91:3001/unidades");
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
    enviarFormulario() {
      // Verifica si todos los campos están llenos
      if (
        this.FormDatos.pregunta &&
        this.FormDatos.estatus &&
        this.FormDatos.periodo &&
        this.FormDatos.inconformidad
      ) {
        // Todos los campos están llenos, puedes enviar el formulario
        this.enviar(); // Llama a la función que maneja el envío del formulario
      } else {
        // Faltan campos por llenar, muestra un mensaje de error o haz lo que necesites
        console.log("Faltan datos");
      }
    },
    
    async enviar() {
      console.log(this.FormDatos);

      const res = await fetch("http://192.168.1.91:3001/insertarForms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.FormDatos),
      })
        .then((res) => res.json())
        .then((datos) => {
          console.log(datos); // Muestra los datos recibidos desde el servidor
          // Limpia el formulario
          this.limpiarFormulario();
        })
        .catch((error) => {
          console.error("Error al insertar los datos:", error);
          // Muestra una alerta de error
        });
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
