'use strict'

import angular from 'angular'
import 'angular-animate'
import 'angular-cookies'
import 'angular-xeditable'

import '@first-lego-league/user-interface/current/assets/js/app.js'
import '@first-lego-league/user-interface/current/assets/css/app.css'
import './css/index.css'

import SignaturePad from 'signature_pad/dist/signature_pad.min'
global['SignaturePad'] = SignaturePad
import 'angular-signature'

import services from './services'
import components from './components'
import controllers from './controllers'

const main = angular.module('scoring', ['ngAnimate', 'ngCookies', 'signature', 'xeditable'])

Object.keys(services).forEach(serviceName => {
	main.service(serviceName, services[serviceName])
})

Object.keys(controllers).forEach(controllerName => {
	main.controller(controllerName, controllers[controllerName])
})

Object.keys(components).forEach(componentName => {
	main.component(componentName, components[componentName])
})
