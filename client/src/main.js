'use strict'

import angular from 'angular'
import 'angular-animate'

import services from './services'
import components from './components'
import controllers from './controllers'

const main = angular.module('scoring', ['ngAnimate'])

Object.keys(services).forEach(serviceName => {
	main.service(serviceName, services[serviceName])
})

Object.keys(controllers).forEach(controllerName => {
	main.controller(controllerName, controllers[controllerName])
})

Object.keys(components).forEach(componentName => {
	main.component(componentName, components[componentName])
})
