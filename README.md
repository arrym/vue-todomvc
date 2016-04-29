# vue-todomvc
第一步：实现页面样式，主要有三部分组成
1. header:输入框、enter事件、全选button
2. todo-list: todos的列表，v-for实现，并且应该可以双击修改
3. footer: 页脚实现过滤器的功能，选中改变过滤条件，回传给store

第二步：实现store和action功能
该部分主要实现redux的基本/核心功能，store树和action触发，主要包括两点
- save:保存到localstorage
- fetch:根据传入过滤条件不同获取不同数据

第三步：实现app功能

## 动态效果
使用 [animate.css](https://github.com/daneden/animate.css) 做动态效果真心好用
example
```javascript
Vue.transition('bounce', {
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight'
})

<li class="todo animated" v-for="todo in filteredTodos" transition="bounce">

```
