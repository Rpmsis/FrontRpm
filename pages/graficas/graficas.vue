<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mt-5" color="#f3f3ef">
          <template>
            <div>
              <VueApexCharts
                max-width="100%"
                type="line"
                :options="options"
                :series="series"
                style="padding: 10px"
              ></VueApexCharts>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

/* Fijoo */
<script>
import io from "socket.io-client";
import ImageZoom from "~/components/ImageZoom.vue";
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    ImageZoom,
    VueApexCharts,
  },
  layout: "barra",
  data() {
    return {
      // Datos de las series
      series: [
        {
          name: "ASIGNADAS", // Serie para las barras
          type: "line", // Tipo barra
          data: [], // Datos de ejemplo para barras
        },
        {
          name: "TERMINADAS", // Serie para las líneas
          type: "bar", // Tipo línea
          data: [], // Datos de ejemplo para líneas
        },
      ],

      // Opciones del gráfico
      options: {
        chart: {
          id: "line-chart",
        },
        stroke: {
          curve: 'smooth', // Tipo de línea (puede ser 'smooth' o 'straight')
          width: 3, // Grosor de la línea
          colors: ["#FF5733"], // Aquí puedes poner el color que desees, por ejemplo, un código hexadecimal
        },
        title: {
          text: "EFICACIA DE ACTIVIDADES",
          align: "center",
          style: {
            fontSize: "20px", // Tamaño de la fuente
            fontFamily: "Arial, sans-serif", // Tipo de letra
            fontWeight: "bold", // Grosor de la fuente
            color: "#39382c", // Color del título
          },
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "normal",
              color: "#FFFFFF !important", // Aseguramos que las etiquetas del eje X sean blancas
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "normal",
              color: "#FFFFFF !important", // Aseguramos que las etiquetas del eje Y sean blancas
            },
          },
        },
        //colors: ["#786C3803"], // Aquí puedes especificar los colores para las series
        tooltip: {
          theme: "dark", // 'dark' o 'light' para el tema del tooltip
          style: {
            fontSize: "14px", // Tamaño de fuente del texto
            fontFamily: "Arial, sans-serif", // Tipo de letra
            fontWeight: 600, // Grosor de la fuente
            color: "#FFFFFF", // Color del texto del tooltip
          },
          x: {
            show: true, // Mostrar o no el valor en el eje X
          },
          y: {
            formatter: (value) => `${value}`, // Formato del valor en el tooltip
          },
        },
        
        dataLabels: {
          enabled: true, // Habilita los dataLabels
          style: {
            padding:15,
            fontSize: "14px", // Tamaño de la fuente de los dataLabels
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold", // Grosor de la fuente
            colors: ["#000"], // Color de los números sobre la línea
          },
          background: {
            enabled: false, // Si quieres fondo detrás de los números, cambia a true
          },
        },
        legend: {
          position: "bottom",
        },
      },
    };
  },
  mounted() {
    this.mostrarAsignadas();
    this.mostrarTerminadas();
  },

  computed: {},
  methods: {
    async mostrarAsignadas() {
      try {
        const res = await fetch("http://localhost:3005/asignadasmes", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        console.log(datos);
        const asignados = datos.asignados;
        const mes = ["septiembre", "octubre", "noviembre"];
        console.log(mes);
        this.options.xaxis.categories= mes;
        this.options = { ...this.options };
        this.$set(this.series, 0, { ...this.series[0], data: asignados });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async mostrarTerminadas() {
      try {
        const res = await fetch("http://localhost:3005/terminadasmes", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        console.log(datos);
        const terminadas = datos.terminadas;
        this.$set(this.series, 1, { ...this.series[1], data: terminadas });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
  },
};
</script>

<style></style>
