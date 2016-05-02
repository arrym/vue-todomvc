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
      newTodo: '',
      editedTodo: null,
      visibility: 'all',
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
        const todos = filters[this.visibility](this.todos);
        console.log(todos);
        return todos;
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
      removeTodo: function(todo) {
        this.todos.$remove(todo);
      },
      editTodo: function(todo) {
        // 在html中使用的数据必须在data上定义，否则在调试工具中也看不到
        this.beforeEditCache = todo.title;
        this.editedTodo = todo;
      },
      doneEdit: function(todo) {
        if (!this.editedTodo) return;
        this.editedTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
          this.removeTodo(todo);
        }
      },
      cancelEdit: function(todo) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache;
      },
      removeCompleted: function() {
        this.todos = filters.active(this.todos);
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
    }
  });
})(window);
