import angular from 'angular'
import 'angular-animate'
import 'angular-cookies'
import 'angular-xeditable'
import 'angular-sanitize'
import 'angular-inview'
import 'angular-signature'

import '@first-lego-league/user-interface/current/semantic.js'
import '@first-lego-league/user-interface/current/semantic.css'

import SignaturePad from 'signature_pad/dist/signature_pad.min'

import config from './config'
import factories from './factories'
import directives from './directives'
import services from './services'
import components from './components'
import controllers from './controllers'

global['SignaturePad'] = SignaturePad

const main = angular.module('scoring', ['ngSanitize', 'ngAnimate', 'ngCookies', 'signature', 'xeditable', 'angular-inview'])
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
