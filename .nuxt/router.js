import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _74f9e757 = () => interopDefault(import('..\\pages\\inicio.vue' /* webpackChunkName: "pages/inicio" */))
const _5e3a3608 = () => interopDefault(import('..\\pages\\actividades\\actdiarias.vue' /* webpackChunkName: "pages/actividades/actdiarias" */))
const _024ce13a = () => interopDefault(import('..\\pages\\actividades\\actForaneas.vue' /* webpackChunkName: "pages/actividades/actForaneas" */))
const _2c0b7c1e = () => interopDefault(import('..\\pages\\actividades\\asignacion.vue' /* webpackChunkName: "pages/actividades/asignacion" */))
const _9d1964f8 = () => interopDefault(import('..\\pages\\actividades\\control.vue' /* webpackChunkName: "pages/actividades/control" */))
const _2afd93b3 = () => interopDefault(import('..\\pages\\actividades\\editeficienciakg.vue' /* webpackChunkName: "pages/actividades/editeficienciakg" */))
const _4f257e9e = () => interopDefault(import('..\\pages\\actividades\\eficacia.vue' /* webpackChunkName: "pages/actividades/eficacia" */))
const _b3d66ac0 = () => interopDefault(import('..\\pages\\actividades\\pdm.vue' /* webpackChunkName: "pages/actividades/pdm" */))
const _329c3024 = () => interopDefault(import('..\\pages\\actividades\\porusuario.vue' /* webpackChunkName: "pages/actividades/porusuario" */))
const _39f3443f = () => interopDefault(import('..\\pages\\actividades\\tablerologistica.vue' /* webpackChunkName: "pages/actividades/tablerologistica" */))
const _64883dae = () => interopDefault(import('..\\pages\\activos\\activosFijos.vue' /* webpackChunkName: "pages/activos/activosFijos" */))
const _0f9582cf = () => interopDefault(import('..\\pages\\activos\\entregaactivosfijos.vue' /* webpackChunkName: "pages/activos/entregaactivosfijos" */))
const _de6c314e = () => interopDefault(import('..\\pages\\activos\\insumos.vue' /* webpackChunkName: "pages/activos/insumos" */))
const _4ea36e16 = () => interopDefault(import('..\\pages\\activos\\mantenimiento.vue' /* webpackChunkName: "pages/activos/mantenimiento" */))
const _ec095468 = () => interopDefault(import('..\\pages\\activos\\mostActmantt.vue' /* webpackChunkName: "pages/activos/mostActmantt" */))
const _13c93b66 = () => interopDefault(import('..\\pages\\activos\\mostmantt.vue' /* webpackChunkName: "pages/activos/mostmantt" */))
const _35847f64 = () => interopDefault(import('..\\pages\\activos\\ubicacion.vue' /* webpackChunkName: "pages/activos/ubicacion" */))
const _b1c0ac36 = () => interopDefault(import('..\\pages\\capital_humano\\asistencia.vue' /* webpackChunkName: "pages/capital_humano/asistencia" */))
const _4838cede = () => interopDefault(import('..\\pages\\capital_humano\\reconomiento-facial.vue' /* webpackChunkName: "pages/capital_humano/reconomiento-facial" */))
const _14fd6e2b = () => interopDefault(import('..\\pages\\capital_humano\\todoasistencia.vue' /* webpackChunkName: "pages/capital_humano/todoasistencia" */))
const _f0bd7928 = () => interopDefault(import('..\\pages\\capital_humano\\user_registro.vue' /* webpackChunkName: "pages/capital_humano/user_registro" */))
const _01ac8500 = () => interopDefault(import('..\\pages\\consumibles\\codigobarras.vue' /* webpackChunkName: "pages/consumibles/codigobarras" */))
const _590682d1 = () => interopDefault(import('..\\pages\\consumibles\\consumible.vue' /* webpackChunkName: "pages/consumibles/consumible" */))
const _301e4f84 = () => interopDefault(import('..\\pages\\consumibles\\devolucion.vue' /* webpackChunkName: "pages/consumibles/devolucion" */))
const _396739e7 = () => interopDefault(import('..\\pages\\consumibles\\inventario.vue' /* webpackChunkName: "pages/consumibles/inventario" */))
const _6a298ca2 = () => interopDefault(import('..\\pages\\consumibles\\minimo.vue' /* webpackChunkName: "pages/consumibles/minimo" */))
const _657be076 = () => interopDefault(import('..\\pages\\consumibles\\verificar.vue' /* webpackChunkName: "pages/consumibles/verificar" */))
const _02551ed3 = () => interopDefault(import('..\\pages\\consumibles\\vigenciaprestamo.vue' /* webpackChunkName: "pages/consumibles/vigenciaprestamo" */))
const _5dae19ac = () => interopDefault(import('..\\pages\\graficas\\graficas.vue' /* webpackChunkName: "pages/graficas/graficas" */))
const _330252dd = () => interopDefault(import('..\\pages\\hojasviajeras\\registro_bascula.vue' /* webpackChunkName: "pages/hojasviajeras/registro_bascula" */))
const _b42e8db8 = () => interopDefault(import('..\\pages\\hojasviajeras\\revisar_hviajeras.vue' /* webpackChunkName: "pages/hojasviajeras/revisar_hviajeras" */))
const _0865f59c = () => interopDefault(import('..\\pages\\idusuarios\\idusuarios.vue' /* webpackChunkName: "pages/idusuarios/idusuarios" */))
const _878a8b58 = () => interopDefault(import('..\\pages\\logistica\\movimientopersonal.vue' /* webpackChunkName: "pages/logistica/movimientopersonal" */))
const _5a7be277 = () => interopDefault(import('..\\pages\\mantenimiento\\tablero.vue' /* webpackChunkName: "pages/mantenimiento/tablero" */))
const _452a8a7e = () => interopDefault(import('..\\pages\\menusemana\\Cargarimagen.vue' /* webpackChunkName: "pages/menusemana/Cargarimagen" */))
const _26c168ee = () => interopDefault(import('..\\pages\\menusemana\\form.vue' /* webpackChunkName: "pages/menusemana/form" */))
const _550a876e = () => interopDefault(import('..\\pages\\menusemana\\formenu.vue' /* webpackChunkName: "pages/menusemana/formenu" */))
const _3e4bf542 = () => interopDefault(import('..\\pages\\menusemana\\Semanamenu.vue' /* webpackChunkName: "pages/menusemana/Semanamenu" */))
const _7ab2faa3 = () => interopDefault(import('..\\pages\\menusemana\\solicitudIndividual.vue' /* webpackChunkName: "pages/menusemana/solicitudIndividual" */))
const _913981cc = () => interopDefault(import('..\\pages\\menusemana\\solicitudMultiple.vue' /* webpackChunkName: "pages/menusemana/solicitudMultiple" */))
const _4961270a = () => interopDefault(import('..\\pages\\preguntaSeg\\formulario.vue' /* webpackChunkName: "pages/preguntaSeg/formulario" */))
const _76579c6a = () => interopDefault(import('..\\pages\\preguntaSeg\\mostrarPreg.vue' /* webpackChunkName: "pages/preguntaSeg/mostrarPreg" */))
const _3b104d80 = () => interopDefault(import('..\\pages\\SGI\\noconformidad.vue' /* webpackChunkName: "pages/SGI/noconformidad" */))
const _fc00e0d8 = () => interopDefault(import('..\\pages\\socioscomerciales\\mostrarProv.vue' /* webpackChunkName: "pages/socioscomerciales/mostrarProv" */))
const _3356acd7 = () => interopDefault(import('..\\pages\\socioscomerciales\\proveedores.vue' /* webpackChunkName: "pages/socioscomerciales/proveedores" */))
const _0e7bf7f0 = () => interopDefault(import('..\\pages\\socioscomerciales\\provusuario.vue' /* webpackChunkName: "pages/socioscomerciales/provusuario" */))
const _f2d855b8 = () => interopDefault(import('..\\pages\\tikets\\vertickets.vue' /* webpackChunkName: "pages/tikets/vertickets" */))
const _3935de50 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inicio",
    component: _74f9e757,
    name: "inicio"
  }, {
    path: "/actividades/actdiarias",
    component: _5e3a3608,
    name: "actividades-actdiarias"
  }, {
    path: "/actividades/actForaneas",
    component: _024ce13a,
    name: "actividades-actForaneas"
  }, {
    path: "/actividades/asignacion",
    component: _2c0b7c1e,
    name: "actividades-asignacion"
  }, {
    path: "/actividades/control",
    component: _9d1964f8,
    name: "actividades-control"
  }, {
    path: "/actividades/editeficienciakg",
    component: _2afd93b3,
    name: "actividades-editeficienciakg"
  }, {
    path: "/actividades/eficacia",
    component: _4f257e9e,
    name: "actividades-eficacia"
  }, {
    path: "/actividades/pdm",
    component: _b3d66ac0,
    name: "actividades-pdm"
  }, {
    path: "/actividades/porusuario",
    component: _329c3024,
    name: "actividades-porusuario"
  }, {
    path: "/actividades/tablerologistica",
    component: _39f3443f,
    name: "actividades-tablerologistica"
  }, {
    path: "/activos/activosFijos",
    component: _64883dae,
    name: "activos-activosFijos"
  }, {
    path: "/activos/entregaactivosfijos",
    component: _0f9582cf,
    name: "activos-entregaactivosfijos"
  }, {
    path: "/activos/insumos",
    component: _de6c314e,
    name: "activos-insumos"
  }, {
    path: "/activos/mantenimiento",
    component: _4ea36e16,
    name: "activos-mantenimiento"
  }, {
    path: "/activos/mostActmantt",
    component: _ec095468,
    name: "activos-mostActmantt"
  }, {
    path: "/activos/mostmantt",
    component: _13c93b66,
    name: "activos-mostmantt"
  }, {
    path: "/activos/ubicacion",
    component: _35847f64,
    name: "activos-ubicacion"
  }, {
    path: "/capital_humano/asistencia",
    component: _b1c0ac36,
    name: "capital_humano-asistencia"
  }, {
    path: "/capital_humano/reconomiento-facial",
    component: _4838cede,
    name: "capital_humano-reconomiento-facial"
  }, {
    path: "/capital_humano/todoasistencia",
    component: _14fd6e2b,
    name: "capital_humano-todoasistencia"
  }, {
    path: "/capital_humano/user_registro",
    component: _f0bd7928,
    name: "capital_humano-user_registro"
  }, {
    path: "/consumibles/codigobarras",
    component: _01ac8500,
    name: "consumibles-codigobarras"
  }, {
    path: "/consumibles/consumible",
    component: _590682d1,
    name: "consumibles-consumible"
  }, {
    path: "/consumibles/devolucion",
    component: _301e4f84,
    name: "consumibles-devolucion"
  }, {
    path: "/consumibles/inventario",
    component: _396739e7,
    name: "consumibles-inventario"
  }, {
    path: "/consumibles/minimo",
    component: _6a298ca2,
    name: "consumibles-minimo"
  }, {
    path: "/consumibles/verificar",
    component: _657be076,
    name: "consumibles-verificar"
  }, {
    path: "/consumibles/vigenciaprestamo",
    component: _02551ed3,
    name: "consumibles-vigenciaprestamo"
  }, {
    path: "/graficas/graficas",
    component: _5dae19ac,
    name: "graficas-graficas"
  }, {
    path: "/hojasviajeras/registro_bascula",
    component: _330252dd,
    name: "hojasviajeras-registro_bascula"
  }, {
    path: "/hojasviajeras/revisar_hviajeras",
    component: _b42e8db8,
    name: "hojasviajeras-revisar_hviajeras"
  }, {
    path: "/idusuarios/idusuarios",
    component: _0865f59c,
    name: "idusuarios-idusuarios"
  }, {
    path: "/logistica/movimientopersonal",
    component: _878a8b58,
    name: "logistica-movimientopersonal"
  }, {
    path: "/mantenimiento/tablero",
    component: _5a7be277,
    name: "mantenimiento-tablero"
  }, {
    path: "/menusemana/Cargarimagen",
    component: _452a8a7e,
    name: "menusemana-Cargarimagen"
  }, {
    path: "/menusemana/form",
    component: _26c168ee,
    name: "menusemana-form"
  }, {
    path: "/menusemana/formenu",
    component: _550a876e,
    name: "menusemana-formenu"
  }, {
    path: "/menusemana/Semanamenu",
    component: _3e4bf542,
    name: "menusemana-Semanamenu"
  }, {
    path: "/menusemana/solicitudIndividual",
    component: _7ab2faa3,
    name: "menusemana-solicitudIndividual"
  }, {
    path: "/menusemana/solicitudMultiple",
    component: _913981cc,
    name: "menusemana-solicitudMultiple"
  }, {
    path: "/preguntaSeg/formulario",
    component: _4961270a,
    name: "preguntaSeg-formulario"
  }, {
    path: "/preguntaSeg/mostrarPreg",
    component: _76579c6a,
    name: "preguntaSeg-mostrarPreg"
  }, {
    path: "/SGI/noconformidad",
    component: _3b104d80,
    name: "SGI-noconformidad"
  }, {
    path: "/socioscomerciales/mostrarProv",
    component: _fc00e0d8,
    name: "socioscomerciales-mostrarProv"
  }, {
    path: "/socioscomerciales/proveedores",
    component: _3356acd7,
    name: "socioscomerciales-proveedores"
  }, {
    path: "/socioscomerciales/provusuario",
    component: _0e7bf7f0,
    name: "socioscomerciales-provusuario"
  }, {
    path: "/tikets/vertickets",
    component: _f2d855b8,
    name: "tikets-vertickets"
  }, {
    path: "/",
    component: _3935de50,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
