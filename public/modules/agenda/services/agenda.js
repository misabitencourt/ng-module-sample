'use strict';

angular.module('agenda').service('AgendaService', function () {

  return {
    prefix: 'sample_agenda_event_',
    onSave: [],
    onRemove: [],

    getEvents: function(day) {
      var events = localStorage[this.prefix+day];
      return events ? JSON.parse(events) : [];
    },

    createEvent: function(day, event) {
      var events = this.getEvents(day);
      events.push(event);
      localStorage[this.prefix+day] = JSON.stringify(events);
      this.onSave.forEach(function(e) {
        (typeof(e) === 'function') && e();
      });
    },

    removeEvent: function(day, eventIndex) {
      var events = this.getEvents(day);
      events.splice(eventIndex, 1);
      localStorage[this.prefix+day] = JSON.stringify(events);
      this.onRemove.forEach(function(e) {
        (typeof(e) === 'function') && e();
      });
    }

  }

});
