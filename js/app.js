(function(exports) {
  'use strict';
  exports.app = new Vue({
    el: '.todoapp',
    data: {
      todos: todoStorage.fetch(),
      newTodo: 'this is init',
      visibility: 'all'
    },
    watch: {
      handler: function() {
        todoStorage.save(this.todos);
      },
      deep: true
    },
    methods: {
      addTodo: function() {
        var value = this.newTodo && this.newTodo.trim();
        if (!value) return;
        this.todos.push({
          title: value,
          completed: false
        });
        this.newTodo = '';
      }
    }
  });
})(window);
