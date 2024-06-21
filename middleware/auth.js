export default async function ({redirect, store}){
      const res = await fetch('https://steelpro.ddns.net:3002/Extraer_Token',{
        headers:{
              token:localStorage.token
            }
      })

      if(res.status == 403){
        redirect({ name: 'token' })
      }
      else if(res.status == 404){
        redirect({ name: 'index' })
      } else {
        const resp = await res.json()
        store.commit('nombre',resp.Dato.nombre)
        store.commit('Area',resp.Dato.Area)
        store.commit('usuario',resp.Dato.usuario)
        store.commit('puesto',resp.Dato.puesto)
        store.commit('foto',resp.Dato.foto)
        
      }
  
  }