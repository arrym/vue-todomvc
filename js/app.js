(function(exports) {
  'use strict';
  var filters = {
    all: function(todos) {
      return todos;
    },
    active: function(todos) {
      return todos.filter(function(todo) {
        return !todo.completed;
      });
    },
    completed: function(todos) {
      return todos.filter(function(todo) {
        return todo.completed;
      });
    }
  };
  exports.app = new Vue({
    el: '.container',
    data: {
      todos: todoStorage.fetch(),
      visibility: 'all',
      query: '',
      title: '',
      detail: '',
      editing: false
    },
    watch: {
      todos: {
        handler: function() {
          todoStorage.save(this.todos);
        },
        deep: true
      }
    },
    computed: {
      filteredTodos: function() {
        return filters[this.visibility](this.todos);
      },
      remaining: function() {
        return filters.active(this.todos).length;
      },
      allDone: {
        get: function() {
          return this.remaining === 0;
        }
      }
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
      },
      toggleStatus: function(todo) {
        todo.completed = !todo.completed;
      },
      toggleAll() {
        const done = this.allDone;
        this.todos.forEach(function(todo) {
          todo.completed = !done;
        });
      },
      save: function() {
        const title = this.title.trim();
        const detail = this.detail.trim();
        if (!title || !detail) return;
        this.todos.push({
          title: title,
          detail: detail,
          completed: false
        });
        this.title = '';
        this.detail = '';
      },
      removeTodo: function(todo) {
        this.todos.$remove(todo);
      },
      cancelEdit: function(todo) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache;
      },
      removeCompleted: function() {
        this.todos = filters.active(this.todos);
      },
      changeEditing: function() {
        this.editing = !this.editing;
      }
    },
    directives: {
      'todo-focus': function(value) {
        if (!value) return;
        var el = this.el;
        Vue.nextTick(function() {
          el.focus();
        });
      }
    },
    filters: {
      marked: marked
    }
  });
})(window);
