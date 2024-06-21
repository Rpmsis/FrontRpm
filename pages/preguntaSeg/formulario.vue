<template>
    <v-app>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title><h1>CREAR PREGUNTAS</h1></v-card-title>
              <br>
                <v-form @submit.prevent="enviarFormulario">
                    <v-row>
                        <v-col cols="12" md="8">
                            <h4 style="color: chocolate">
                            *Nota:  registre una pregunta cerrada, las respuestas se limitan a un "SI
                            o NO"
                            </h4>
                            <br>
                            <v-text-field
                            v-model="FormDatos.pregunta"
                            label="Escribe una pregunta.."
                            filled
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <h4 style="margin-bottom: 20px" >Responsable del ticket de inconformidad:</h4>

                            <v-select v-model="FormDatos.inconformidad" :items="ticketMal" label="Responsable del área.." filled ></v-select>
                        </v-col>
                    </v-row>
                    <br />
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-select
                            :items="status"
                            v-model="FormDatos.estatus"
                            label="Estatus"
                            filled
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select
                            :items="periodo"
                            v-model="FormDatos.periodo"
                            label="Periodo"
                            filled
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select
                            :items="activos"
                            v-model="FormDatos.activo"
                            label="Activos"
                            filled
                            ></v-select>
                        </v-col>
                    </v-row>
                    <div class="lineas">
                        <hr class="lin" />
                    </div>
                    <v-row>
                        <v-col cols="12" md="12">
                            <h3>¿A que área se le asigna la pregunta?</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                    <v-col cols="12" md="3">
                        <v-checkbox
                        label="Logistica"
                        v-model="FormDatos.areas"
                        value="logistica"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-checkbox
                        label="Mantenimiento"
                        v-model="FormDatos.areas"
                        value="mantenimiento"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-checkbox
                        label="Tecnologías de la información"
                        v-model="FormDatos.areas"
                        value="tecnologias"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-checkbox
                        label="Seguridad"
                        v-model="FormDatos.areas"
                        value="seguridad"
                        ></v-checkbox>
                    </v-col>
                    </v-row>
                    <center><v-btn class="btnEnviar" type="submit" color="success">Enviar</v-btn></center> 
                 </v-form>
                 <!-- Alerta de Vuetify -->
                <v-snackbar v-model="alerta.mostrar" :timeout="alerta.timeout" color="error">
                {{ alerta.mensaje }}
                <template v-slot:action="{ attrs }">
                    <v-btn text v-bind="attrs" @click="alerta.mostrar = false">Cerrar</v-btn>
                </template>
                </v-snackbar>

                <v-snackbar v-model="alerta2.mostrar" :timeout="alerta2.timeout" color="success">
                {{ alerta2.mensaje }}
                <template v-slot:action="{ attrs }">
                    <v-btn text v-bind="attrs" @click="alerta2.mostrar = false">Cerrar</v-btn>
                </template>
                </v-snackbar>
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
        titulo: "Datos iniciales",
        uniforme: [],
        otroUni: {
          otro: "",
        },
        transporte: [],
        otrotrans: {
          otro: "",
        },
  
        respon: ["Logistica", "Mantenimiento", "Seguridad"],
        status: ["Activo", "Inactivo"],
        periodo: ["Diario", "Semanal","Quincenal", "Mensual", "Anual"],
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
          areas: [],
          periodo: "",
          activo: "",
          estatus: "",
          inconformidad: ""
        },
        alerta: {
          mostrar: false,
          mensaje: "",
          timeout: 5000, // Duración de la alerta en milisegundos
        },
        alerta2: {
          mostrar: false,
          mensaje: "",
          timeout: 5000, // Duración de la alerta en milisegundos
        },
      };
    },
    mounted() {
      this.mostrar();
      this.FormDatos.responsable= this.nombre;
    },
  
    methods: {
      async mostrar() {
        try {
          const res = await fetch("http://192.168.1.210:3002/mostrarActivo");
          const datos = await res.json();
          if (res.status == 404) {
            console.error("Error al obtener los datos:");
          } else {
            this.activos = datos.respuesta.respuesta.map((activo) => [activo.nombre]);
  
            console.log(this.activos);
          }
          /* console.log(datos.respuesta.respuesta); */
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      },
      enviarFormulario() {
        // Verifica si todos los campos están llenos
        if (
          this.FormDatos.pregunta &&
          this.FormDatos.estatus &&
          this.FormDatos.areas.length > 0 &&
          this.FormDatos.periodo 
        ) {
          // Todos los campos están llenos, puedes enviar el formulario
          this.enviar(); // Llama a la función que maneja el envío del formulario
        } else {
          // Faltan campos por llenar, muestra un mensaje de error o haz lo que necesites
          this.mostrarAlerta("Por favor, llene todos los campos del formulario.");
        }
      },
      mostrarAlerta(mensaje) {
        this.alerta.mensaje = mensaje;
        this.alerta.mostrar = true;
      },
      async enviar() {
  
        console.log(this.FormDatos);
  
        const res = await fetch("http://192.168.1.210:3001/insertarForms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.FormDatos),
        })
          .then((res) => res.json())
          .then((datos) => {
            console.log(datos); // Muestra los datos recibidos desde el servidor
            // Muestra una alerta de éxito
            this.mostrarAlerta2("Datos insertados correctamente");
            // Limpia el formulario
            this.limpiarFormulario();
          })
          .catch((error) => {
            console.error("Error al insertar los datos:", error);
            // Muestra una alerta de error
            this.mostrarAlerta(
              "Error al insertar los datos. Por favor, inténtalo de nuevo."
            );
          });
      },
  
      mostrarAlerta2(mensaje) {
        this.alerta2.mensaje = mensaje;
        this.alerta2.mostrar = true;
      },
      // Método para limpiar el formulario
      limpiarFormulario() {
        this.FormDatos.pregunta = "";
        this.FormDatos.estatus = "";
        this.FormDatos.areas = [];
        this.FormDatos.periodo = "";
        this.FormDatos.activo = "";
        this.FormDatos.inconformidad = "";
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
    padding: 0px 50px 0px 50px;
}
.lineas{
    padding: 40px 50px 40px 50px;
}
.btnEnviar{
    margin-top: 30px;
    margin-bottom: 50px;
    width: 30%;
    font-size: 20px !important;
}
</style>
  