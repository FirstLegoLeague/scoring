'use strict'


class GenericController{
    constructor ($scope, $document, $timeout, Configuration, Scoresheet, Tournament, Notifications, User) {
        this.Tournament = Tournament
    }
    
    $onInit(){
        
    }
}

GenericController.$inject = ['Tournament']


export default GenericController