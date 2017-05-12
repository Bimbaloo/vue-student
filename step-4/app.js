import Vue from 'vue'
import AV from 'leancloud-storage'

let APP_ID = 'DcOc5cGIJ6nL7b2ts8s2Xrbs-gzGzoHsz';
let APP_KEY = 'CHB0asUCF3qYoH5x4naPvrtB';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


var app = new Vue({
    el: '#app',
    data: {
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        newTodo: '',
        todoList: [],
        currentUser: null,
    },
    created: function () {
        // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
        window.onbeforeunload = ()=> {//当窗口即将被关闭时,会触发该事件.
            let dataString = JSON.stringify(this.todoList) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
            window.localStorage.setItem('myTodos', dataString) // 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
        }

        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []

        this.currentUser = this.getCurrentUser();


    },
    methods: {
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date(),
                done: false // 添加一个 done 属性
            })
            this.newTodo = ''
        },
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
            this.todoList.splice(index, 1) // 不懂 splice？赶紧看 MDN 文档！
        },

        signUp: function () {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => { // 👈，将 function 改成箭头函数，方便使用 this
                this.currentUser = this.getCurrentUser() // 👈
            }, (error) => {
                alert('注册失败') // 👈
            });
        },
        login: function () {
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                console.log(loginedUser);
                this.currentUser = this.getCurrentUser() // 👈
                //console.log(AV.User.current())
            }, function (error) {
                console.log("登录失败");
            });
        },
        getCurrentUser: function () { // 👈
            var current = _leancloudStorage2.default.User.current();
            if (current) {
                var id = current.id,
                    createdAt = current.createdAt,
                    username = current.attributes.username;
                // 上面这句话看不懂就得看 MDN 文档了
                // 我的《ES 6 新特性列表》里面有链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

                return {id: id, username: username, createdAt: createdAt}; // 看文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0
            } else {
                return null;
            }
        },
        logout: function () {
            _leancloudStorage2.default.User.logOut();  //退出API

        }
    }
})
