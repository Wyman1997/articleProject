var express = require('express');
var router = express.Router();
var model = require("../model/index")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource 登录成功');
});

//注册接口
router.post('/regist', function(req, res, next){
  var data ={
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2
  }
  //后台数据校验
  model.connect(function(db){
    db.collection('users').insertOne(data, function(err, doc){
      if(err){
          console.log('注册失败');
          res.redirect('/regist');
      }else{
          console.log("注册成功");
          res.redirect('/login');
      }
    })
  })
})


//登录接口
router.post("/login", function(req, res, next){
  var data = {
    username: req.body.username,
    password: req.body.password
  }
  model.connect(function(db){
    db.collection('users').find(data).toArray(function(err, docs){
      if(err){
        res.redirect('/login');
      }else{
        if(docs.length >0){
          //登录成功，进行session会话的存储
          req.session.username = data.username;
          res.redirect('/')
        }else{
          res.redirect('/login');
        }
      }
    })
  })
})

//退出登录
router.get('/logout', function(req, res, next){
  req.session.username = undefined;
  res.redirect('/login');
})

module.exports = router;
