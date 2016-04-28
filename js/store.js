(function(exports) {
  'use strict';
  var STORAGE_KEY = 'todos-vuejs';
  exports.todoStorage = {
    save: function(todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    },
    fetch: function() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }
  };
})(window);
