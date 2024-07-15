<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                    hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search" :footer-props="{
                'items-per-page-options': [10, 20, 30, 40, 50,] 
            }" :items-per-page="10" :sort-desc="true" :sort-by.sync="sortBy"> 
                <template v-slot:item.actions="{ item }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="white" dark v-bind="attrs" v-on="on" @click="abrir_Ticket(item)" small
                                class="mr-2">
                                mdi-eye
                            </v-icon>
                        </template>
                        <span>Visualizar</span>
                    </v-tooltip>
                </template>

            </v-data-table>
        </v-card>
    </v-container>
</template>
<script>
export default {
    layout: "barra",
    middleware: 'auth',
    data() {
        return {
            datos: [],
            search: '',
            Tipo:"No conformidad",
            headers: [
                {
                    text: 'Folio',
                    align: 'start',
                    filterable: true,
                    value: 'Folio',
                },
                { text: 'Creado Por', value: 'Creado_Por' },
                { text: 'Proceso Interno', value: 'Proceso_Interno' },
                { text: 'Fecha de creación', value: 'Fecha_Creada' },
                { text: 'Hora de creación', value: 'Hora_Creada' },
                { text: 'Acciones', value: 'actions' },

            ],
            sortBy: 'Folio', 
                 sortDescending: true, 
            desserts: [],
        }
    },
    methods: {
        abrir_Ticket(item) {
        
            this.$router.push('/SGC/Asignados_A/' + item.Folio);
            
            
        },
        async Solicitudes() {
            const res = await fetch('https://192.168.1.250:3002/SolicitudesOm/' + this.Tipo, {
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.token
                },
            })
            const datos = await res.json()
            this.desserts = datos.datos.resultados
        },

    },
    created() {
        this.Solicitudes();
    },

}
</script>
