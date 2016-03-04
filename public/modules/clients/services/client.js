'use strict';

angular.module('client').service('ClientService', function () {

  return {
    prefix: 'sample_agenda_client_',

    getClients: function() {
      var clients = localStorage[this.prefix];
      return clients ? JSON.parse(clients) : [];
    },

    createClient: function(name) {
      var clients = this.getClients();
      clients.push(name);
      localStorage[this.prefix] = JSON.stringify(clients);
    },

    removeClient: function(index) {
      var clients = this.getClients();
      clients.splice(index, 1);
      localStorage[this.prefix] = JSON.stringify(clients);
    }

  }

});
