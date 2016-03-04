'use strict';

angular.module('agenda')
       .directive('agenda', function(AgendaService) {

  return {
    restrict: 'E',
    templateUrl: 'views/agenda/agenda.html',
    scope: { data: '=' },

    link: function(scope, element, attrs) {

      var weekTime = 604800000,
          dayTime = 86400000,
          refresh;

      /*
       * Scope
       */
      scope.days = [];

      scope.event = {
        visible: false
      };

      scope.openClientModal = function(day) {
        this.event.visible = true;
        this.event.day = day;
      }.bind(scope);

      scope.refresh = function() {
        var date = new Date(),
            day,
            oneWeekLater = new Date(date.getTime() + weekTime);
        /*
         * Monta dias para apresentar
         */
        scope.days.splice(0, scope.days.length);
        while (date.getTime() < oneWeekLater.getTime()) {
          day = date.getDate() + '/' + (date.getMonth() + 1);
          scope.days.push({
            id: day,
            title: 'Dia ' + day,
            events: AgendaService.getEvents(day)
          });
          date.setTime(date.getTime() + dayTime);
        }
      };

      scope.remove = function(day, index) {
        confirm('Deseja mesmo excluir?') && AgendaService.removeEvent(day, index);
      }.bind(scope);

      refresh = function() {
        scope.refresh();
      };
      AgendaService.onSave.push(refresh);
      AgendaService.onRemove.push(refresh);
      refresh();
    }
  };
});