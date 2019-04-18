const userService=require('./service/userService.js');
const express=require('express');

const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.post('/username',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    let username=req.body.username;
    userService.vertifyUsername(username,function(results){
        res.json(results);
    })
});

app.post("/form",(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.send("log");
})

//管理员 登录
app.get("/server-login", function(req, res) {
    var username = req.query.username;
    var pwd = req.query.pwd;
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    // //让service层做事
    userService.serverLoginsv(username,pwd,function(results){
        // console.log(results)
        res.json(results)
        
    })
});

app.get('/log',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    let username=req.query.username;
    let pwd=req.query.pwd;
    userService.login(username,pwd,function(a,b){
        if(a){
            res.json([a,b]);
        }else{
            res.json(false);
        }
//		console.log(a);
//		console.log(b);
    });
});

app.get('/reg',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
     let username=req.query.username;
     let pwd=req.query.pwd;
     userService.reg(username,pwd,function(results){
         if(results=='erro'){
             res.json("system_erro");
             return;
         }
         if(results=='username_exit'){
             res.json("username_exit");
             return;
         }
         res.json(true);
     })
});


app.post('/insert',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
    let data=req.body;
    userService.insertBook(data,function(result){
    	res.json(result);
    })
})

//获取 今日 交易记录表的数据
app.get("/get-jiaoyi-todayData", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var time = req.query.time;

    // console.log(time);
    //让service层做事
    userService.getTodayMoneysv(time,function(results){
        // console.log(results)
        res.json(results)
    })
});

//获取 总共 交易记录表的数据
app.get("/get-jiaoyi-allData", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    //让service层做事
    userService.getAllMoneysv(function(results){
        // console.log(results)
        res.json(results)
    })
});

//获取获取分类图书的库存数据
app.get("/get-class-kucun", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    //让service层做事
    console.log(11)
    userService.getKucunsv(function(results){
        res.json(results)
    })
});

//获取商品管理 的数据
app.get("/get-ShangPinGuanLi-Data", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    // //让service层做事
    userService.getShangPinGuanlisv(function(results){
        // console.log(results)
        res.json(results)
    })
});

//搜索类名 或 书名 或 是否打折
app.get("/search-className-bookName", function(req, res) {
    var searchText = req.query.searchText;
    // console.log(searchText);
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    // //让service层做事
    userService.searchClassNameBookNamesv(searchText,function(results){
        // console.log(results)
        res.json(results)
    })
});

//保存修改过后的商品数据
app.get("/save-ShangPinGuanLi-Data", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    //让service层做事
    userService.saveShangPinsv(req.query.id,req.query.bookclass,req.query.bookname,req.query.oldprice,req.query.price,req.query.kucun,req.query.discountText,req.query.mainurl,function(results){
        // console.log(results)
        res.json(results)
    })
});

//根据商品Id删除商品
app.get("/delete-goods-byId", function(req, res) {
    var id = req.query.id;
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    // //让service层做事
    userService.deleteGoodsByIdsv(id,function(results){
        // console.log(results)
        res.json(results)
    })
});




app.get('/allproducts',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	let data=req.query;
	userService.selectAll(data,function(result){
		if(result.length){
			res.json(result);
		}else{
			res.json(false);
		}
	})
})

app.get("/searchProducts",(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	let data=req.query.keywords;
	userService.selectKeywords(data,function(result){
		res.json(result);
	})
})

app.get("/insertShopping",(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	let data=req.query;
	console.log(data);
	userService.insertShopping(data,function(result){
		res.json(result);
	})
})

app.get("/changephoto",(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	let data=req.query;
	userService.changephoto(data,function(result){
		res.json(result);
	})
})

//获取 购物车中的信息 Id 书名 简介 图片地址 单价 数量 
app.get("/get-shoppingcar", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var uid=req.query.uid;
    //让service层做事
    console.log(uid)
    userService.getShoppingCarsv(uid,function(results){
        // console.log(results)
        res.json(results)
    })
});

//删除 单个商品
app.get("/delete-singleShoppingCar", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var uid=req.query.uid;
    var bookid = req.query.bookid
    //让service层做事
    userService.delSingleShoppingCarsv(uid,bookid,function(results){
        // console.log(results)
        res.json(results)
    })
});

//删除 选中商品
app.get("/delete-selectShoppingCar", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var uid=req.query.uid;
    var bookid = req.query.bookid
    var numbookidArray=[]
    bookid.forEach(element => {
        numbookidArray.push(Number(element))
    });
    // console.log(uid,numbookidArray)
    //让service层做事
    userService.delShoppingCarsv(uid,numbookidArray,function(results){
        // console.log(results)
        res.json(results)
    })
});


//获取 小图片 的地址
app.get("/get-smallpicture-url", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var id=req.query.id;
    //让service层做事
    userService.getSmallPictureUrlsv(id,function(results){
        // console.log(results)
        res.json(results)
    })
});

//获取 图书名字 简介
app.get("/get-bookname-describe", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var id=req.query.id;
    //让service层做事
    userService.getBookNameDescribesv(id,function(results){
        // console.log(results)
        res.json(results)
    })
    
});

//获取书的 作者 出版社 出版时间
app.get("/get-author-publish-publishTime", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var id=req.query.id;
    //让service层做事
    userService.getAuthorPublishPublishTimesv(id,function(results){
        // console.log(results)
        res.json(results)
    })
    
});

//获取书的 原价 现价
app.get("/get-oldprice-price", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var id=req.query.id;
    //让service层做事
    userService.getOldPricePricesv(id,function(results){
        // console.log(results)
        res.json(results)
    })
});


//获取 销量
app.get("/get-sales", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var id=req.query.id;
    //让service层做事
    userService.getSalessv(id,function(results){
        // console.log(results)
        res.json(results)
    })
});

//获取 库存
app.get("/get-kucun", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var id=req.query.bookid;
    //让service层做事
    userService.getKunCunsv(id,function(results){
        // console.log(results)
        res.json(results)
    })
});

//获取 推荐图书 3本
app.get("/get-tuijian", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var cid=req.query.cid;
    //让service层做事
    userService.getTuiJiansv(cid,function(results){
        // console.log(results)
        res.json(results)
    })
});

//获取 送货清单
app.get("/get-delivery-list", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var bookid = req.query.bookid
    var temBookidArray=[]
    bookid.forEach(element => {
        temBookidArray.push(Number(element))
    });
    //让service层做事
    userService.getDeliveryListsv(temBookidArray,function(results){
        // console.log(results)
        res.json(results)
    })

});

//将用户的id 书的id 商品的数量  加入购物车表中
app.get("/add-shoppingCar", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var uid=req.query.uid;
    var bookid = req.query.bookid
    var booknum=req.query.booknum
    //让service层做事
    userService.addShoppingCarsv(uid,bookid,booknum,function(results){
        // console.log(results)
        res.json(results)
    })
});

//添加交易 清单
app.get("/add-jiaoyi-list", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    //让service层做事
    userService.addJiaoyiListsv(req.query.userid,req.query.time,req.query.money,req.query.name,req.query.contact,req.query.address,function(results){
        // console.log(results)
        res.json(results)
    })
});

//获取送货清单中 每本书的数量 然后改变库存
app.get("/get-booknum-kucun", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var changeKuCunBookidArray = req.query.changeKuCunBookidArray;
    var temBookidArray=[]
    changeKuCunBookidArray.forEach(element => {
        temBookidArray.push(Number(element))
    });
    //让service层做事
    userService.getBooknumKucunsv(temBookidArray,function(results){
        // console.log(results)
        res.json(results)
    })
});

//修改对应书的 库存
app.get("/update-kucun", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var id=req.query.id;
    var kucun = req.query.kucun;
    //让service层做事
    userService.updateKucunsv(id,kucun,function(results){
        // console.log(results)
        res.json(results)
    })
});

//获取送货清单中 每本书的数量 然后改变销量
app.get("/get-booksales-sales", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var changeSalesBookidArray = req.query.changeSalesBookidArray;
    var temBookidArray=[]
    changeSalesBookidArray.forEach(element => {
        temBookidArray.push(Number(element))
    });
    //让service层做事
    userService.getBooksalesSalessv(temBookidArray,function(results){
        // console.log(results)
        res.json(results)
    })
});

//修改对应书的 销量
app.get("/update-sales", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var id=req.query.id;
    var sales = req.query.sales;
    // console.log(id,kucun);

    //让service层做事
    userService.updateSalessv(id,sales,function(results){
        // console.log(results)
        res.json(results)
    })
});


app.get("/searchShopping", function(req, res) {
    //设置跨域响应头
    res.setHeader('Access-Control-Allow-Origin','*');
    var userid=req.query.userid;
    //让service层做事
    userService.searchShopping(userid,function(results){
        // console.log(results)
        res.json(results);
    })
});




app.listen(7778,()=>{
    console.log('ok');
});