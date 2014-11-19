// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/weixin',function(req, res){

	var WeixinUser = AV.Object.extend("WeixinUser");

	var weixinUser = new WeixinUser();
	var job = req.query.job;
	var salary = req.query.salary;
	var workYear = req.query.workYear;

	weixinUser.set('job',job);
	weixinUser.set('salary',parseInt(salary));
	weixinUser.set('workYear',parseInt(workYear));

	weixinUser.save(null, {
	  success: function(weixinUser) {
	    // Execute any logic that should take place after the object is saved.
	    console.log('New object created with objectId: ' + weixinUser.id);
	  },
	  error: function(weixinUser, error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a AV.Error with an error code and description.
	    console.log('Failed to create new object, with error code: ' + error.description);
	  }
	});

	// res.render('hello', { message: 'Congrats, you just set up your app!' });
	res.contentType('json');//返回的数据类型
    res.send(JSON.stringify({ success:"true" }));//给客户端返回一个json格式的数据
    res.end();
});

app.get('/anony-user',function(req,res){
	var AnonyUser = AV.Object.extend("AnonyUser");

	var anonyUser = new AnonyUser();

	anonyUser.save(null, {
	  success: function(anonyUser) {
	    // Execute any logic that should take place after the object is saved.
	    console.log('New object created'）;
	  },
	  error: function(anonyUser, error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a AV.Error with an error code and description.
	    console.log('Failed to create new object, with error code: ' + error.description);
	  }
	});

	res.contentType('json');//返回的数据类型
    res.send(JSON.stringify({ success:"true" }));//给客户端返回一个json格式的数据
    res.end();
})

app.get('/show',function(req,res){
	res.render('show',{});
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();