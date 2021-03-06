import bar from './bar';
import Vue from 'vue';

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    created: function(){
        // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
        window.onbeforeunload = ()=>{
            let dataString = JSON.stringify(this.todoList) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
            window.localStorage.setItem('myTodos', dataString) // 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
        }

        let oldDataString = window.localStorage.getItem('myTodos')
        console.log(oldDataString)
        let oldData = JSON.parse(oldDataString)
        console.log(oldData)
        this.todoList = oldData || []

    },
    methods:{
        addTodo(){
            this.todoList.push({
                title: this.newTodo,
                time: new Date(),
                done: false // 添加一个 done 属性
            })
            this.newTodo = ''
        },
        removeTodo(todo){
            let index = this.todoList.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
            this.todoList.splice(index,1)
        }
    }
})

