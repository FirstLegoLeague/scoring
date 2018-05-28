'use strict'

import angular from 'angular'
import 'angular-animate'
import components from './components'
import controllers from './controllers'

const main = angular.module('scoring', ['ngAnimate'])

Object.keys(components).forEach(componentName => {
	main.component(componentName, components[componentName])
})

Object.keys(controllers).forEach(controllerName => {
	main.controller(controllerName, controllers[controllerName])
})
