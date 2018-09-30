import angular from 'angular'
import 'angular-animate'
import 'angular-cookies'
import 'angular-xeditable'

import '@first-lego-league/user-interface/current/assets/js/app.js'
import '@first-lego-league/user-interface/current/assets/css/app.css'
import './css/index.css'
import 'angular-signature'

import SignaturePad from 'signature_pad/dist/signature_pad.min'

import config from './config'
import factories from './factories'
import directives from './directives'
import services from './services'
import components from './components'
import controllers from './controllers'

global['SignaturePad'] = SignaturePad

const main = angular.module('scoring', ['ngAnimate', 'ngCookies', 'signature', 'xeditable'])
  .config(config)

Object.entries(services).forEach(([serviceName, service]) => {
  main.service(serviceName, service)
})

Object.entries(factories).forEach(([factoryName, factory]) => {
  main.factory(factoryName, factory)
})

Object.entries(directives).forEach(([directiveName, directive]) => {
  main.directive(directiveName, directive)
})

Object.entries(controllers).forEach(([controllerName, controller]) => {
  main.controller(controllerName, controller)
})

Object.entries(components).forEach(([componentName, component]) => {
  main.component(componentName, component)
})
