
export const state = () =>({
    nombre :null,
    Area:null,
    usuario :null,
    nivel:null,
    foto:null,

  
    }); 
export const mutations = {
    nombre(state, text) {
     state.nombre = text
},
  Area(state, text) {
     state.Area = text
},
  usuario(state, text) {
     state.usuario = text
},
  puesto(state, text) {
     state.puesto = text
},
foto(state, text) {
     state.foto = text
},
}


