import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e3df6410 = () => interopDefault(import('..\\pages\\ayuda.vue' /* webpackChunkName: "pages/ayuda" */))
const _74f9e757 = () => interopDefault(import('..\\pages\\inicio.vue' /* webpackChunkName: "pages/inicio" */))
const _1ace9570 = () => interopDefault(import('..\\pages\\tabla.vue' /* webpackChunkName: "pages/tabla" */))
const _5e3a3608 = () => interopDefault(import('..\\pages\\actividades\\actdiarias.vue' /* webpackChunkName: "pages/actividades/actdiarias" */))
const _024ce13a = () => interopDefault(import('..\\pages\\actividades\\actForaneas.vue' /* webpackChunkName: "pages/actividades/actForaneas" */))
const _2c0b7c1e = () => interopDefault(import('..\\pages\\actividades\\asignacion.vue' /* webpackChunkName: "pages/actividades/asignacion" */))
const _9d1964f8 = () => interopDefault(import('..\\pages\\actividades\\control.vue' /* webpackChunkName: "pages/actividades/control" */))
const _2afd93b3 = () => interopDefault(import('..\\pages\\actividades\\editeficienciakg.vue' /* webpackChunkName: "pages/actividades/editeficienciakg" */))
const _329c3024 = () => interopDefault(import('..\\pages\\actividades\\porusuario.vue' /* webpackChunkName: "pages/actividades/porusuario" */))
const _64883dae = () => interopDefault(import('..\\pages\\activos\\activosFijos.vue' /* webpackChunkName: "pages/activos/activosFijos" */))
const _0f9582cf = () => interopDefault(import('..\\pages\\activos\\entregaactivosfijos.vue' /* webpackChunkName: "pages/activos/entregaactivosfijos" */))
const _de6c314e = () => interopDefault(import('..\\pages\\activos\\insumos.vue' /* webpackChunkName: "pages/activos/insumos" */))
const _4ea36e16 = () => interopDefault(import('..\\pages\\activos\\mantenimiento.vue' /* webpackChunkName: "pages/activos/mantenimiento" */))
const _ec095468 = () => interopDefault(import('..\\pages\\activos\\mostActmantt.vue' /* webpackChunkName: "pages/activos/mostActmantt" */))
const _13c93b66 = () => interopDefault(import('..\\pages\\activos\\mostmantt.vue' /* webpackChunkName: "pages/activos/mostmantt" */))
const _35847f64 = () => interopDefault(import('..\\pages\\activos\\ubicacion.vue' /* webpackChunkName: "pages/activos/ubicacion" */))
const _01ac8500 = () => interopDefault(import('..\\pages\\consumibles\\codigobarras.vue' /* webpackChunkName: "pages/consumibles/codigobarras" */))
const _590682d1 = () => interopDefault(import('..\\pages\\consumibles\\consumible.vue' /* webpackChunkName: "pages/consumibles/consumible" */))
const _301e4f84 = () => interopDefault(import('..\\pages\\consumibles\\devolucion.vue' /* webpackChunkName: "pages/consumibles/devolucion" */))
const _396739e7 = () => interopDefault(import('..\\pages\\consumibles\\inventario.vue' /* webpackChunkName: "pages/consumibles/inventario" */))
const _0865f59c = () => interopDefault(import('..\\pages\\idusuarios\\idusuarios.vue' /* webpackChunkName: "pages/idusuarios/idusuarios" */))
const _452a8a7e = () => interopDefault(import('..\\pages\\menusemana\\Cargarimagen.vue' /* webpackChunkName: "pages/menusemana/Cargarimagen" */))
const _26c168ee = () => interopDefault(import('..\\pages\\menusemana\\form.vue' /* webpackChunkName: "pages/menusemana/form" */))
const _550a876e = () => interopDefault(import('..\\pages\\menusemana\\formenu.vue' /* webpackChunkName: "pages/menusemana/formenu" */))
const _3e4bf542 = () => interopDefault(import('..\\pages\\menusemana\\Semanamenu.vue' /* webpackChunkName: "pages/menusemana/Semanamenu" */))
const _4961270a = () => interopDefault(import('..\\pages\\preguntaSeg\\formulario.vue' /* webpackChunkName: "pages/preguntaSeg/formulario" */))
const _76579c6a = () => interopDefault(import('..\\pages\\preguntaSeg\\mostrarPreg.vue' /* webpackChunkName: "pages/preguntaSeg/mostrarPreg" */))
const _3b104d80 = () => interopDefault(import('..\\pages\\SGI\\noconformidad.vue' /* webpackChunkName: "pages/SGI/noconformidad" */))
const _fc00e0d8 = () => interopDefault(import('..\\pages\\socioscomerciales\\mostrarProv.vue' /* webpackChunkName: "pages/socioscomerciales/mostrarProv" */))
const _3356acd7 = () => interopDefault(import('..\\pages\\socioscomerciales\\proveedores.vue' /* webpackChunkName: "pages/socioscomerciales/proveedores" */))
const _0e7bf7f0 = () => interopDefault(import('..\\pages\\socioscomerciales\\provusuario.vue' /* webpackChunkName: "pages/socioscomerciales/provusuario" */))
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
    path: "/ayuda",
    component: _e3df6410,
    name: "ayuda"
  }, {
    path: "/inicio",
    component: _74f9e757,
    name: "inicio"
  }, {
    path: "/tabla",
    component: _1ace9570,
    name: "tabla"
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
    path: "/actividades/porusuario",
    component: _329c3024,
    name: "actividades-porusuario"
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
    path: "/idusuarios/idusuarios",
    component: _0865f59c,
    name: "idusuarios-idusuarios"
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
