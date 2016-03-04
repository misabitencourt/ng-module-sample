'use strict';

angular.module('client')
       .directive('client', function(ClientService) {

  return {
    restrict: 'E',
    templateUrl: 'views/client/client.html',
    scope: { data: '=' },

    link: function(scope) {

      /*
       * Scope
       */
      scope.clients = [];

      scope.save = function() {
        var name = prompt('Digite o nome do cliente');
        if (!name) {
          return;
        }
        ClientService.createClient(name);
        this.refresh();
      }.bind(scope);

      scope.remove = function(index) {
        confirm('Deseja mesmo excluir?') && ClientService.removeClient(index);
        this.refresh();
      }.bind(scope);

      scope.refresh = function() {
        this.clients.splice(0, this.clients.length);
        ClientService.getClients().forEach(function(client) {
          this.clients.push(client);
        }.bind(this));
      }.bind(scope);

      scope.refresh();
    }
  };
});