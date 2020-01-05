// 导入模块
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')

// 创建App服务器
var app = express()

// 开放公共资源路径
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname,'./node_modules/')))

// 配置模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views')) // 默认就是views

// 配置中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 挂载路由
app.use(router)

// 监听端口号
app.listen(5000, function() {
  console.log('5000 is running...')
})