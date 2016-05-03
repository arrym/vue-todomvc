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
      detail: '',
      adding: false
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
        const detail = this.detail.trim();
        if (!detail) return;
        this.todos.unshift({
          detail: detail,
          completed: false
        });
        this.detail = '';
        this.adding = false;
        const cacheTodo = this.cacheTodo;
        if (cacheTodo) {
          this.todos.$remove(cacheTodo);
          this.cacheTodo = null;
        }
      },
      removeTodo: function(todo) {
        this.todos.$remove(todo);
      },
      cancelAdd: function() {
        const cacheTodo = this.cacheTodo;
        if (cacheTodo) {
          this.cacheTodo = null;
        }
        this.detail = '';
        this.adding = false;
      },
      removeCompleted: function() {
        this.todos = filters.active(this.todos);
      },
      changeAdding: function() {
        this.adding = !this.adding;
      },
      editedTodo: function(todo) {
        this.cacheTodo = todo;
        this.adding = true;
        this.detail = todo.detail;
      },
      exportTodo: function(todo) {
        let now = new Date();
        now = now.getTime() + '.md';
        doSave(todo.detail, "text/latex", now);
      },
      toTop: function() {
        top();
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
