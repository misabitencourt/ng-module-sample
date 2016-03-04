'use strict';

angular.module('agenda')
  .directive('event', function(AgendaService, ClientService) {

    return {
      restrict: 'E',
      templateUrl: 'views/agenda/event.html',
      scope: { data: '=data' },

      link: function(scope, element) {
        scope.model = {};
        scope.clients = ClientService.getClients();

        // Open/Hide trigger
        scope.$watch('data.visible', function(visible) {
          $(element).find('.modal').modal(visible ? 'show' : 'hide');
        });

        // Salva evento
        scope.save = function() {
          if (! (this.model.client && this.model.description)) {
            return alert('Informe os dados');
          }
          AgendaService.createEvent(this.data.day, this.model);
          this.cancel();
        }.bind(scope);

        // Cancela evento
        scope.cancel = function() {
          this.data.visible = this.model.client = this.model.description = null;
        }.bind(scope);
      }
    };
  });