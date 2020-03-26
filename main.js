var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

var goods = [
  {
    name:'ショートケーキ',
    price:400,
    quantity:0
  },
  {
    name:'チョコケーキ',
    price:500,
    quantity:0
  },
  {
    name:'いちごタルト',
    price:350,
    quantity:0
  }
]

var vm =new Vue({
  el: '#app',
  data: {
    goods:goods,
    todos: [],
    options: [
      { value: 0, label: '会計' },
      { value: 1, label: '会計済み' }
    ],
    current:0,
    oazukari:0,
  },

  computed: {
    computedTodos: function () {
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },

    totalPrice:function(){
      return this.goods.reduce(function(sum,item){
        return sum + (item.price*item.quantity)
      },0)
    },

    siki:function(){
      var siki = "ショート:"+this.goods[0].quantity+"チョコ:"+this.goods[1].quantity+"いちご:"+this.goods[2].quantity;
      return siki
      },

    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    },

    vif:function(){
      return this.current==0
    }
  },

  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  created() {
    this.todos = todoStorage.fetch()
  },

  methods: {
    doAdd: function() {
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 1
      })
      comment.value = ''
    },

    doRemove: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  }
})
