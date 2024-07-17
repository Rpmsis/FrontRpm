import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e3df6410 = () => interopDefault(import('..\\pages\\ayuda.vue' /* webpackChunkName: "pages/ayuda" */))
const _74f9e757 = () => interopDefault(import('..\\pages\\inicio.vue' /* webpackChunkName: "pages/inicio" */))
const _1ace9570 = () => interopDefault(import('..\\pages\\tabla.vue' /* webpackChunkName: "pages/tabla" */))
const _024ce13a = () => interopDefault(import('..\\pages\\actividades\\actForaneas.vue' /* webpackChunkName: "pages/actividades/actForaneas" */))
const _64883dae = () => interopDefault(import('..\\pages\\activos\\activosFijos.vue' /* webpackChunkName: "pages/activos/activosFijos" */))
const _de6c314e = () => interopDefault(import('..\\pages\\activos\\insumos.vue' /* webpackChunkName: "pages/activos/insumos" */))
const _4ea36e16 = () => interopDefault(import('..\\pages\\activos\\mantenimiento.vue' /* webpackChunkName: "pages/activos/mantenimiento" */))
const _ec095468 = () => interopDefault(import('..\\pages\\activos\\mostActmantt.vue' /* webpackChunkName: "pages/activos/mostActmantt" */))
const _13c93b66 = () => interopDefault(import('..\\pages\\activos\\mostmantt.vue' /* webpackChunkName: "pages/activos/mostmantt" */))
const _35847f64 = () => interopDefault(import('..\\pages\\activos\\ubicacion.vue' /* webpackChunkName: "pages/activos/ubicacion" */))
const _590682d1 = () => interopDefault(import('..\\pages\\consumibles\\consumible.vue' /* webpackChunkName: "pages/consumibles/consumible" */))
const _4961270a = () => interopDefault(import('..\\pages\\preguntaSeg\\formulario.vue' /* webpackChunkName: "pages/preguntaSeg/formulario" */))
const _76579c6a = () => interopDefault(import('..\\pages\\preguntaSeg\\mostrarPreg.vue' /* webpackChunkName: "pages/preguntaSeg/mostrarPreg" */))
const _ffe58dba = () => interopDefault(import('..\\pages\\SGI\\ejejmplo.vue' /* webpackChunkName: "pages/SGI/ejejmplo" */))
const _3b104d80 = () => interopDefault(import('..\\pages\\SGI\\noconformidad.vue' /* webpackChunkName: "pages/SGI/noconformidad" */))
const _3356acd7 = () => interopDefault(import('..\\pages\\socioscomerciales\\proveedores.vue' /* webpackChunkName: "pages/socioscomerciales/proveedores" */))
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
    path: "/actividades/actForaneas",
    component: _024ce13a,
    name: "actividades-actForaneas"
  }, {
    path: "/activos/activosFijos",
    component: _64883dae,
    name: "activos-activosFijos"
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
    path: "/consumibles/consumible",
    component: _590682d1,
    name: "consumibles-consumible"
  }, {
    path: "/preguntaSeg/formulario",
    component: _4961270a,
    name: "preguntaSeg-formulario"
  }, {
    path: "/preguntaSeg/mostrarPreg",
    component: _76579c6a,
    name: "preguntaSeg-mostrarPreg"
  }, {
    path: "/SGI/ejejmplo",
    component: _ffe58dba,
    name: "SGI-ejejmplo"
  }, {
    path: "/SGI/noconformidad",
    component: _3b104d80,
    name: "SGI-noconformidad"
  }, {
    path: "/socioscomerciales/proveedores",
    component: _3356acd7,
    name: "socioscomerciales-proveedores"
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
