'use strict'

import angular from 'angular'
import 'angular-animate'

import SignaturePad from 'signature_pad/dist/signature_pad.min'
global['SignaturePad'] = SignaturePad
import 'angular-signature'

import services from './services'
import components from './components'
import controllers from './controllers'

const main = angular.module('scoring', ['ngAnimate', 'signature'])

Object.keys(services).forEach(serviceName => {
	main.service(serviceName, services[serviceName])
})

Object.keys(controllers).forEach(controllerName => {
	main.controller(controllerName, controllers[controllerName])
})

Object.keys(components).forEach(componentName => {
	main.component(componentName, components[componentName])
})
