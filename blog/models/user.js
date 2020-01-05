// 导入模块
var mongoose = require('mongoose')

// 新建模型
var Schema = mongoose.Schema

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', {useMongoClient: true });


// 建立模板
var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  }
})

// 连接数据库


// 导出模型
module.exports = mongoose.model('User', userSchema)
