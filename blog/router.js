// 导入模块
var express = require('express')
var User = require('./models/user')
// var md5 = require('blueimp-md5')

//  创建路由容器
var router = express.Router()

router.get('/', function(req, res) {
  // console.log(req.session.user)
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', function(req, res) {
  res.render('login.html')
})

router.post('/login', function(req, res) {
  // 获取表单数据
  var body = req.body
  // console.log(body)
  // 查询数据库，判断用户是否存在
  User.findOne({
    email: body.email,
    // password: md5(md5(body.password))
    password: body.password
  }, function(err, user) {
    if(err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }

    if(!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid'
      })
    }

    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: 'Ok'
    })
  })
})

router.get('/register', function(req, res) {
  res.render('register.html')
})

router.post('/register', function(req, res) {
  // 获取表单提交信息
  var body = req.body
  // 判断邮箱昵称是否存在
  User.findOne({
    $or: [
      { email: body.email },
      { nickname: body.nickname }
    ]
  }, function(err, data) {
    if(err) {
      return res.status(500).json({
        success: false,
        message: '服务端错误'
      })
    }
    if(data) {
      return res.status(200).json({
        err_code: 1,
        message: 'email or nickname aleady exists'
      })
    } 
    
    // body.password = md5(md5(body.password))
    new User(body).save(function(err, user) {
      if(err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal error'
        })
      }

      // 注册成功，使用session记录数据
      req.session.user = user

      res.status(200).json({
        err_code: 0,
        message: 'ok'
      })
    })
    
  })
})

router.get('/logout', function(req, res) {
  req.session.user = null
  res.redirect('/login')
})

//  导出router
module.exports = router