<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="mt-10" style="padding: 10px">
          <v-select
            v-model="empresa"
            :items="empresas"
            label="Buscar por empresa.."
            :menu-props="{ maxHeight: '150px' }"
            @input="mostrarAsignadas(), mostrarTerminadas(), mostrarActividades()"
          ></v-select>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mt-10" style="padding: 10px">
          <v-select
            v-model="id"
            :items="actividades"
            item-text="text"
            item-value="id"
            label="Buscar por actividad.."
            :menu-props="{ maxHeight: '100px' }"
            @input="mostrarAsigactivi_mes(), mostrarControl_mes()"
          ></v-select>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mt-10" style="padding: 10px">
          <v-select
            v-model="mes"
            :items="meses"
            item-text="text"
            item-value="value"
            label="Buscar por mes.."
            :menu-props="{ maxHeight: '100px' }"
            @input="mostrarAsigactivi_mes(), mostrarControl_mes()"
          ></v-select>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="mt-10" style="padding: 10px" color="#f3f3ef">
          <div class="tkcajas">
            <h2>TIEMPO DE LA ACTIVIDAD POR MES</h2>
            <h1>{{ horas }}hr con {{ minutos }}min</h1>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mt-10" style="padding: 10px" color="#f3f3ef">
          <div class="tkcajas">
            <h2>KILOS DE LA ACTIVIDAD POR MES</h2>
            <h1>{{ kilos }}kg</h1>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mt-5" color="#f3f3ef">
          <template>
            <div>
              <VueApexCharts
                max-width="50%"
                type="line"
                :options="options3"
                :series="series3"
                style="padding: 10px"
              ></VueApexCharts>
            </div>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mt-5" color="#f3f3ef">
          <template>
            <div>
              <VueApexCharts
                max-width="50%"
                type="line"
                :options="options4"
                :series="series4"
                style="padding: 10px"
              ></VueApexCharts>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
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
      <v-col cols="12" md="6">
        <v-card class="mt-5" color="#f3f3ef">
          <template>
            <div>
              <VueApexCharts
                max-width="100%"
                type="line"
                :options="options2"
                :series="series2"
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
          name: "ASIGNADAS",
          type: "line",
          data: [],
        },
        {
          name: "TERMINADAS",
          type: "bar",
          data: [],
        },
      ],

      // Opciones del gráfico
      options: {
        chart: {
          id: "EFICACIA-ACTIVIDADES",
        },
        stroke: {
          curve: "smooth", // 'smooth' o 'straight'
          width: 3,
          colors: ["#FF5733"],
        },
        title: {
          text: "EFICACIA DE ACTIVIDADES POR NAVE",
          align: "center",
          style: {
            fontSize: "15px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            color: "#39382c",
          },
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "normal",
              color: "#FFFFFF !important",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "normal",
              color: "#FFFFFF !important",
            },
          },
        },

        tooltip: {
          theme: "dark",
          style: {
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 600,
            color: "#FFFFFF",
          },
          x: {
            show: true,
          },
          y: {
            formatter: (value) => `${value}`,
          },
        },

        dataLabels: {
          enabled: true,
          style: {
            padding: 15,
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            colors: ["#000"],
          },
          background: {
            enabled: false,
          },
        },
        legend: {
          position: "bottom",
        },
        grid: {
          borderColor: "#111",
          strokeDashArray: 7,
        },
      },

      // Datos de las series2
      series2: [
        {
          name: "tiempo",
          type: "bar",
          data: [],
        },
        {
          name: "timpo",
          type: "bar",
          data: [],
        },
      ],

      // Opciones del gráfico2
      options2: {
        chart: {
          id: "EFICIENCIA-ACTIVIDADES",
        },
        stroke: {
          curve: "smooth", // Tipo de línea (puede ser 'smooth' o 'straight')
          width: 3, // Grosor de la línea
          colors: ["#FF5733"], // Aquí puedes poner el color que desees, por ejemplo, un código hexadecimal
        },
        title: {
          text: "EFICIENCIA DE ACTIVIDADES POR NAVE",
          align: "center",
          style: {
            fontSize: "15px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            color: "#39382c",
          },
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "normal",
              color: "#FFFFFF !important",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "normal",
              color: "#FFFFFF !important",
            },
          },
        },
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 600,
            color: "#FFFFFF",
          },
          x: {
            show: true,
          },
          y: {
            formatter: (value) => `${value}`,
          },
        },

        dataLabels: {
          enabled: true,
          style: {
            padding: 15,
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            colors: ["#000"],
          },
          background: {
            enabled: false,
          },
        },
        legend: {
          position: "bottom",
        },
        grid: {
          borderColor: "#111",
          strokeDashArray: 7,
        },
      },

      // Datos de las series3
      series3: [
        {
          name: "Tiempo en minutos",
          type: "bar",
          data: [],
        },
      ],

      // Opciones del gráfico3
      options3: {
        chart: {
          id: "EFICIENCIA-COLABORADORES",
        },
        title: {
          text: "TIEMPO REALIZADO POR COLABORADOR",
          align: "center",
          style: {
            fontSize: "15px", // Tamaño de la fuente
            fontFamily: "Arial, sans-serif", // Tipo de letra
            fontWeight: "bold", // Grosor de la fuente
            color: "#39382c", // Color del título
          },
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "15px", // Tamaño de fuente
              fontFamily: "Arial, sans-serif",
              fontWeight: "normal",
              color: "#FFFFFF !important",
              whiteSpace: "pre-line", // Permite saltos de línea
            },
            offsetX: 0,
            offsetY: 5,
            rotate: -30, // Ajusta el ángulo si es necesario
            align: "center",
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "normal",
              color: "#FFFFFF !important",
            },
          },
        },
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 600,
            color: "#FFFFFF",
          },
          x: {
            show: true,
          },
          y: {
            formatter: (value) => `${value}`,
          },
        },

        dataLabels: {
          enabled: true,
          style: {
            padding: 15,
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            colors: ["#000"],
          },
          background: {
            enabled: false,
          },
        },
        legend: {
          position: "bottom",
        },
        grid: {
          borderColor: "#111",
          strokeDashArray: 7,
        },
        
      },

      // Datos de las series4
      series4: [
        {
          name: "Kilogramos en minutos", // Serie para las barras
          type: "bar", // Tipo barra
          data: [], // Datos de ejemplo para barras
        },
      ],

      // Opciones del gráfico4
      options4: {
        chart: {
          id: "EFICIENCIA-COLABORADORES",
        },
        title: {
          text: "KILOGRAMOS REALIZADO POR COLABORADOR",
          align: "center",
          style: {
            fontSize: "15px", // Tamaño de la fuente
            fontFamily: "Arial, sans-serif", // Tipo de letra
            fontWeight: "bold", // Grosor de la fuente
            color: "#39382c", // Color del título
          },
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "10px",
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
            padding: 15,
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
        grid: {
          borderColor: "#111",
          strokeDashArray: 7,
        },
      },

      empresa: "",
      empresas: ["RPM NAVE 1", "RPM NAVE 2"],
      id: 0,
      actividades: [],
      mes: 0,
      meses: [
        { text: "Enero", value: 1 },
        { text: "Febrero", value: 2 },
        { text: "Marzo", value: 3 },
        { text: "Abril", value: 4 },
        { text: "Mayo", value: 5 },
        { text: "Junio", value: 6 },
        { text: "Julio", value: 7 },
        { text: "Agosto", value: 8 },
        { text: "Septiembre", value: 9 },
        { text: "Octubre", value: 10 },
        { text: "Noviembre", value: 11 },
        { text: "Diciembre", value: 12 },
      ],

      horas: 0,
      minutos: 0,
      kilos: 0,
    };
  },
  mounted() {},

  computed: {},
  methods: {
    async mostrarAsignadas() {
      try {
        const res = await fetch("http://localhost:3005/asignadasmes/" + this.empresa, {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        //console.log(datos);
        const asignados = datos.asignados;
        const mes = ["septiembre", "octubre", "noviembre"];
        //console.log(mes);
        this.options.xaxis.categories = mes;
        this.options = { ...this.options };
        this.$set(this.series, 0, { ...this.series[0], data: asignados });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async mostrarTerminadas() {
      try {
        const res = await fetch("http://localhost:3005/terminadasmes/" + this.empresa, {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        //console.log(datos);
        const terminadas = datos.terminadas;
        this.$set(this.series, 1, { ...this.series[1], data: terminadas });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    async mostrarAsigactivi_mes() {
      if (this.id && this.mes && this.empresa) {
        console.log(this.id , this.mes , this.empresa);
        try {
          const res = await fetch(
            "http://localhost:3005/asigactivimes/?id=" + this.id + "&mes=" + this.mes,
            {
              method: "GET",
              headers: {
                token: localStorage.token,
              },
            }
          );
          const datos = await res.json();
          //console.log(datos);
          this.horas = datos.horas;
          this.minutos = datos.minutos;
          this.kilos = datos.kilos;
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      } else {
        console.log("falta uno");
      }
    },

    async mostrarActividades() {
      try {
        const res = await fetch("http://localhost:3005/actividades", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        //console.log(datos);
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          const datosA = datos.respuesta.respuesta.filter(
            (filtro) => filtro.ubicacion === this.empresa
          );
          //console.log(datosA);
          this.actividades = datosA.map((filtro) => ({
            id: filtro.idactividades,
            text: filtro.actividad,
          }));
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async mostrarControl_mes() {
      if (this.id && this.mes && this.empresa && this.kilos) {
        //console.log("si existen");
        try {
          const res = await fetch(
            "http://localhost:3005/controlmes/?id=" + this.id + "&mes=" + this.mes + "&kilos=" + this.kilos,
            {
              method: "GET",
              headers: {
                token: localStorage.token,
              },
            }
          );
          const datos = await res.json();
          console.log(datos);

          const nombres = datos.nombre;
          //console.log(nombres);
          this.options3.xaxis.categories = nombres;
          this.options3 = { ...this.options3 };

          //tooltip
          

          const tiempo = datos.tiempo;
          this.$set(this.series3, 0, { ...this.series3[0], data: tiempo });
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      } else {
        console.log("falta uno");
      }
    },
  },
};
</script>

<style>
.apexcharts-menu.apexcharts-menu-open {
  color: black;
}
.tkcajas {
  color: black;
  text-align: center;
}
</style>
