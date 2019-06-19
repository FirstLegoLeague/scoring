import '@first-lego-league/user-interface/current/semantic.js'
import '@first-lego-league/user-interface/current/semantic.css'

import angular from 'angular'
import 'angular-sanitize'
import 'angular-animate'
import 'angular-cookies'
import 'angular-signature'
import 'angular-xeditable'
import 'angular-inview'

import 'semantic-ui-angular-jquery/angular-semantic-ui.min.js'

import SignaturePad from 'signature_pad/dist/signature_pad.min'

import config from './config'
import factories from './factories/**'
import directives from './directives/**'
import services from './services/**'
import components from './components/**'

global['SignaturePad'] = SignaturePad

const main = angular.module('scoring', ['semantic-ui', 'ngSanitize', 'ngAnimate', 'ngCookies', 'signature', 'xeditable', 'angular-inview'])
  .config(config)

console.debug('--- services ---')
Object.entries(services).forEach(([serviceName, service]) => {
  console.debug(serviceName)
  main.service(serviceName, service.default)
})

console.debug('--- factories ---')
Object.entries(factories).forEach(([factoryName, factory]) => {
  console.debug(factoryName)
  main.factory(factoryName, factory.default)
})

console.debug('--- directives ---')
Object.entries(directives).forEach(([directiveName, directive]) => {
  console.debug(directiveName)
  main.directive(directiveName, directive.default)
})

console.debug('--- components ---')
Object.entries(components).forEach(([componentName, component]) => {
  if (componentName.endsWith('Controller')) {
    console.debug(`controller: ${componentName}`)
    main.controller(componentName, component.default)
  } else {
    console.debug(componentName)
    main.component(componentName, component.default)
  }
})
