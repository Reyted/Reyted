const userdb=require('../db/userdb.js');

function login(username,pwd,cb){
    userdb.selectByloginAndPwd(username,pwd,function(a,b){
         cb(a,b);
    });
}

function vertifyUsername(username,cb){
    userdb.selectByloginname(username,function(results){
        if(results.length){
            cb('username_exit');
        }else{
            cb('true');
        }
    });
}

function reg(username,pwd,cb){
    userdb.selectByloginname(username,function(results){
        if(results.length){
            cb('username_exit');
        }else{
            userdb.insert(username,pwd,function(result){
                if(result=='erro'){
                    cb('erro');
                }else{
                    cb('success');
                }
            });
        }
    });
}

function insertBook(data,cb){
	userdb.insertBook(data,function(res){
		cb(res);
	})
}

function selectAll(data,cb){
	userdb.selectAll(data,function(res){
		cb(res);
	})
}

function selectKeywords(data,cb){
	userdb.selectKeywords(data,function(res){
		cb(res);
	})
}

function insertShopping(data,cb){
	userdb.insertShopping(data,function(res){
		cb(res);
	})
}

function changephoto(data,cb){
	userdb.changephoto(data,function(res){
		cb(res);
	})
}

//获取 购物车中的信息
function getShoppingCarsv(uid,bc) {
    //让数据库层做事
    userdb.getShoppingCardb(uid,function(results){
        bc(results)
    })
}
//删除 单个商品
function delSingleShoppingCarsv(uid,bookid,bc) {
    //让数据库层做事
    userdb.delSingleShoppingCardb(uid,bookid,function(results){
        bc(results)
    })
}

//获取商品管理 的数据
function getSmallPictureUrlsv(id,bc) {
    //让数据库层做事
    userdb.getSmallPictureUrldb(id,function(results){
        bc(results)
    })
}

//获取 图书名字 简介
function getBookNameDescribesv(id,bc) {
    //让数据库层做事
    userdb.getBookNameDescribedb(id,function(results){
        bc(results)
    })
}

//获取书的 作者 出版社 出版时间
function getAuthorPublishPublishTimesv(id,bc) {
    //让数据库层做事
    userdb.getAuthorPublishPublishTimedb(id,function(results){
        bc(results)
    })
}

//获取书的 原价 现价
function getOldPricePricesv(id,bc) {
    //让数据库层做事
    userdb.getOldPricePricedb(id,function(results){
        bc(results)
    })
}

//获取 销量
function getSalessv(id,bc) {
    //让数据库层做事
    userdb.getSalesdb(id,function(results){
        bc(results)
    })
}

//获取 库存
function getKunCunsv(id,bc) {
    //让数据库层做事
    userdb.getKunCundb(id,function(results){
        bc(results)
    })
}

//获取 推荐图书 3本
function getTuiJiansv(cid,bc) {
    //让数据库层做事
    userdb.getTuiJiandb(cid,function(results){
        bc(results)
    })
}

//获取 送货清单
function getDeliveryListsv(temBookidArray,bc) {
    //让数据库层做事
    userdb.getDeliveryListdb(temBookidArray,function(results){
        bc(results)
    })
}

//将用户的id 书的id 商品的数量  加入购物车表中
function addShoppingCarsv(uid,bookid,booknum,bc) {
    //让数据库层做事
    userdb.addShoppingCardb(uid,bookid,booknum,function(results){
        bc(results)
    })
}

//删除 选中商品
function delShoppingCarsv(uid,numbookidArray,bc) {
    //让数据库层做事
    userdb.delShoppingCardb(uid,numbookidArray,function(results){
        bc(results)
    })
}

//添加交易 清单
function addJiaoyiListsv(userid,time,money,name,contact,address,bc) {
    //让数据库层做事
    userdb.addJiaoyiListdb(userid,time,money,name,contact,address,function(results){
        bc(results)
    })
}

//获取送货清单中 每本书的数量 然后改变库存
function getBooknumKucunsv(temBookidArray,bc) {
    //让数据库层做事
    userdb.getBooknumKucundb(temBookidArray,function(results){
        bc(results)
    })
}

//修改对应书的 库存
function updateKucunsv(id,kucun,bc) {
    //让数据库层做事
    userdb.updateKucundb(id,kucun,function(results){
        bc(results)
    })
}

//获取送货清单中 每本书的数量 然后改变 销量
function getBooksalesSalessv(temBookidArray,bc) {
    //让数据库层做事
    userdb.getBooksalesSalesdb(temBookidArray,function(results){
        bc(results)
    })
}

//修改对应书的 销量
function updateSalessv(id,sales,bc) {
    //让数据库层做事
    userdb.updateSalesdb(id,sales,function(results){
        bc(results)
    })
}

function searchShopping(id,bc) {
    //让数据库层做事
    userdb.searchShopping1(id,function(results){
        bc(results)
    })
}

//获取 总共 交易记录表的数据
function getAllMoneysv(bc) {
    //让数据库层做事
    userdb.getAllMoneydb(function(results){
        bc(results)
    })
}

//获取获取分类图书的库存数据
function getKucunsv(bc) {
    //让数据库层做事
    userdb.getKucundb(function(results){
        bc(results)
    })
}

//获取商品管理 的数据
function getShangPinGuanlisv(bc) {
    //让数据库层做事
    userdb.getShangPinGuanlidb(function(results){
        bc(results)
    })
}

//搜索类名 或 书名 或 是否打折
function searchClassNameBookNamesv(searchText,bc) {
    //让数据库层做事
    userdb.searchClassNameBookNamedb(searchText,function(results){
        bc(results)
    })
}

//保存修改过后的商品数据
function saveShangPinsv(id,bookclass,bookname,oldprice,price,kucun,discountText,mainurl,bc) {
    //让数据库层做事
    userdb.saveShangPindb(id,bookclass,bookname,oldprice,price,kucun,discountText,mainurl,function(results){
        bc(results)
    })
}

//根据商品Id删除商品
function deleteGoodsByIdsv(id,bc) {
    //让数据库层做事
    userdb.deleteGoodsByIddb(id,function(results){
        bc(results)
    })
}

//管理员 登录
function serverLoginsv(username,pwd,bc) {
    //让数据库层做事
    userdb.serverLogindb(username,pwd,function(results){
        bc(results)
    })
}

//获取 今日 交易记录表的数据
function getTodayMoneysv(time,bc) {
    //让数据库层做事
    userdb.getTodayMoneydb(time,function(results){
        bc(results)
    })
}

exports.getTodayMoneysv=getTodayMoneysv;
exports.serverLoginsv=serverLoginsv;
exports.deleteGoodsByIdsv=deleteGoodsByIdsv;
exports.saveShangPinsv=saveShangPinsv;
exports.searchClassNameBookNamesv=searchClassNameBookNamesv;
exports.getShangPinGuanlisv=getShangPinGuanlisv;
exports.getKucunsv=getKucunsv;
exports.getAllMoneysv=getAllMoneysv;
exports.searchShopping=searchShopping;
exports.updateSalessv=updateSalessv;
exports.getBooksalesSalessv=getBooksalesSalessv;
exports.updateKucunsv=updateKucunsv;
exports.getBooknumKucunsv=getBooknumKucunsv;
exports.addJiaoyiListsv=addJiaoyiListsv;
exports.delShoppingCarsv=delShoppingCarsv;
exports.addShoppingCarsv=addShoppingCarsv;
exports.getDeliveryListsv=getDeliveryListsv;
exports.getTuiJiansv=getTuiJiansv;
exports.getKunCunsv=getKunCunsv;
exports.getSalessv=getSalessv;
exports.getOldPricePricesv=getOldPricePricesv;
exports.getAuthorPublishPublishTimesv=getAuthorPublishPublishTimesv;
exports.getBookNameDescribesv=getBookNameDescribesv;
exports.getSmallPictureUrlsv=getSmallPictureUrlsv;
exports.delSingleShoppingCarsv=delSingleShoppingCarsv;
exports.getShoppingCarsv=getShoppingCarsv;
exports.changephoto=changephoto;
exports.insertShopping=insertShopping;
exports.selectAll=selectAll;
exports.selectKeywords=selectKeywords;
exports.login=login;
exports.reg=reg;
exports.vertifyUsername=vertifyUsername;
exports.insertBook=insertBook;