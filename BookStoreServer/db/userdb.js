const mysqlPool = require('../utiles/mysqlPool.js');

function selectByloginAndPwd(loginname, pwd, cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			let sql = `select * from user where
            username='${loginname}' and password='${pwd}'`;
			connection.query(sql, function(err2, results) {
				if(results.length) {
					mysqlPool.pool.getConnection(function(erro, connection) {
						if(erro) {
							console.log(erro);
						} else {
							let sqll = `select * from shopping where userid='${results[0].id}'`;
							connection.query(sqll, (erro, result) => {
								cb(results, result);
							});
						}
						connection.release();
					});
				} else {
					cb(false);
				}
			});
		}
		connection.release();
	});
}

function selectByloginname(loginname, cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			let sql = `select * from user where username='${loginname}'`;
			connection.query(sql, (erro, results) => {
				cb(results);
			});
		}
		connection.release();
	});
}

function insert(username, pwd, cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			let sql = `insert into user(username,password) values ('${username}','${pwd}')`;
			connection.query(sql, (erro, results) => {
				if(erro) {
					cb('erro');
				} else {
					cb('success');
				}
			});
		}
		connection.release();
	});
}

function search(cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			let sql = `select * from music`;
			connection.query(sql, (erro, results) => {
				if(erro) {
					cb('erro');
				} else {
					cb(results);
				}
			});
		}
		connection.release();
	});
}

function selectBook(data, cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			let sql = `select * from bookmenu where bookname=? and author=? and press=?`;
			connection.query(sql, [data.bookname, data.author, data.press], (erro, results) => {
				if(erro) {
					cb('erro');
				} else {
					cb(results);
				}
			});
		}
		connection.release();
	});
}

function insertBook(data, cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			selectBook(data, function(res) {
				if(res.length) {
					let inven = parseInt(res[0].inventory) + parseInt(data.num);
					let sql = `update bookmenu set inventory=${inven} where id=${res[0].id}`;
					connection.query(sql, (erro, results) => {
						if(erro) {
							cb(erro);
						} else {
							cb(true);
						}
					});
				} else {
					let sqll = `insert into bookmenu(bookname,author,press,presstime,mainurl,smurlo,smurlt,price,oldprice,inventory,discount,introduce,introd,cid) 
            		values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
					connection.query(sqll, [data.bookname, data.author, data.press, data.presstime, data.mainurl, data.smurlo, data.smurlt, data.price, data.oldprice, 1, data.discount, data.introduce, data.introd, data.cid], (erro, results) => {
						if(erro) {
							cb(erro);
						} else {
							cb(true);
						}
					});
				}
			})
		}
		connection.release();
	});
}

function selectAll(data, cb) {
	let start = Number(data.start);
	let end = Number(data.end);
	let classfy = data.classfy;
	let sql = '';
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			if(classfy != '0') {
				sql = `select bookmenu.*,bookclass.class from bookmenu,
	            bookclass where inventory>0 and bookmenu.cid=bookclass.id and 
	            bookmenu.id between ${start} and ${end} and bookmenu.cid=${Number(classfy)}`;
			} else {
				sql = `select bookmenu.*,bookclass.class from bookmenu,
	            bookclass where inventory>0 and bookmenu.cid=bookclass.id and 
	            bookmenu.id between ${start} and ${end}`;
			}
			connection.query(sql, (erro, results) => {
				if(erro) {
					cb('erro');
				} else {
					cb(results);
				}
			});
		}
		connection.release();
	});
}

function selectKeywords(data, cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			let sql = `select bookmenu.*,bookclass.class from bookmenu,bookclass where inventory>0 and bookmenu.cid=bookclass.id`;
			connection.query(sql, (erro, results) => {
				if(erro) {
					cb('erro');
				} else {
					var res = [];
					results.forEach(function(item) {
						if(item.bookname.indexOf(data) >= 0 || item.introd.indexOf(data) >= 0 || item.press.indexOf(data) >= 0 || item.author.indexOf(data) >= 0 || item.introduce.indexOf(data) >= 0 || item.author.indexOf(data) >= 0 || item.class.indexOf(data) >= 0) {
							res.push(item);
						}
					})
					cb(res);
				}
			});
		}
		connection.release();
	});
}

function selectShopping(id, cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			let sql = `select * from shopping where userid=${id}`;
			connection.query(sql, (erro, results) => {
				if(erro) {
					cb('erro');
				} else {
					cb(results);
				}
			});
		}
		connection.release();
	});
}

function searchShopping(userid,bookid, cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			let sql = `select * from shopping where userid=${userid} and bookid=${bookid}`;
			connection.query(sql, (erro, results) => {
				if(erro) {
					cb(0);
				} else {
					cb(results);
				}
			});
		}
		connection.release();
	});
}


function insertShopping(data, cb) {
	console.log(data)
	searchShopping(data.userid,data.bookid,function(results){
		if(!results.length){
			mysqlPool.pool.getConnection(function(erro, connection) {
				if(erro) {
					console.log(erro);
				} else {
					let sql = `insert into shopping(bookid,userid,number) values (?,?,?)`;
					connection.query(sql, [data.bookid, data.userid, data.num], (erro, results) => {
						if(erro) {
							cb('erro');
						} else {
							selectShopping(data.userid, function(res) {
								cb(res.length);
							})
						}
					});
				}
				connection.release();
			});
		}else{
			mysqlPool.pool.getConnection(function(erro, connection) {
				if(erro) {
					console.log(erro);
				} else {
					let num=results[0].number+1;
					let sqll = `update shopping set number=${num} where userid=${data.userid}`;
					connection.query(sqll,(erro, results) => {
						if(erro) {
							cb('erro');
						} else {
							selectShopping(data.userid, function(res) {
								cb(res.length);
							})
						}
					});
				}
				connection.release();
			});
		}
	})
}

function changephoto(data, cb) {
	mysqlPool.pool.getConnection(function(erro, connection) {
		if(erro) {
			console.log(erro);
		} else {
			let sql = `update user set headphoto='${data.headphoto}' where id=${Number(data.userid)}`;
			connection.query(sql, (erro, results) => {
				if(erro) {
					cb(false);
				} else {
					cb(true);
				}
			});
		}
		connection.release();
	});
}

//获取 购物车中的信息
function getShoppingCardb(uid, bc) {
	/**
	 * 1.当连接成功时，err的值为null. 失败时
	 * 2.conn是连接对象
	 */
	mysqlPool.pool.getConnection(function(err, conn) {
		if(err) { //失败
			console.log(err);
		} else { //连接成功
			var sql = `select a.bookid,a.inventory,a.bookname,a.introd,a.mainurl,a.price,a.number,sum(a.number) as anumber from
(select shopping.bookid,bookmenu.inventory,bookmenu.bookname,bookmenu.introd,bookmenu.mainurl,bookmenu.price,shopping.number 
from shopping,bookmenu where shopping.bookid=bookmenu.id and shopping.userid=?) as a
group by bookid
`;
			conn.query(sql, [uid], function(err2, results) {
				//将返回的结果告诉service
//				console.log(results);
				bc(results);
				conn.release(); //释放连接
			});
		}
	});
}

//删除 单个商品
function delSingleShoppingCardb(uid,bookid,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `delete from shopping where userid=? and bookid=?`;
            conn.query(sql,[uid,bookid], function (err2, results) {
                //将返回的结果告诉service
                selectShopping(uid,function(res){
                	bc(res);
                })
                conn.release(); //释放连接
            });
        }
    });
}

//获取商品管理 的数据
function getSmallPictureUrldb(id,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select mainurl,smurlo,smurlt from bookmenu where id=?`;
            conn.query(sql,[id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取 图书名字 简介
function getBookNameDescribedb(id,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select introduce,bookname from bookmenu where id=?`;
            conn.query(sql,[id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取书的 作者 出版社 出版时间
function getAuthorPublishPublishTimedb(id,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select author,press,presstime from bookmenu where id=?`;
            conn.query(sql,[id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取书的 作者 出版社 出版时间
function getOldPricePricedb(id,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select price,oldprice from bookmenu where id=?`;
            conn.query(sql,[id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取 销量
function getSalesdb(id,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select sales from bookmenu where id=?`;
            conn.query(sql,[id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取 库存
function getKunCundb(id,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select inventory from bookmenu where id=?`;
            conn.query(sql,[id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取 推荐图书 3本
function getTuiJiandb(cid,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select bookname,mainurl,price,id from bookmenu where cid=? order by rand() limit 3`;
            conn.query(sql,[cid], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取 送货清单
function getDeliveryListdb(temBookidArray,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = "select mainurl,bookname,price from bookmenu where id in (";
            for(var i=0;i<temBookidArray.length;i++){
                sql+=temBookidArray[i]+","
            }
            sql=sql.substring(0,sql.lastIndexOf(","))+")"
            // console.log(sql)
            conn.query(sql, function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//将用户的id 书的id 商品的数量  加入购物车表中
function addShoppingCardb(uid,bookid,booknum,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `insert into shopping(userid,bookid,number) values(?,?,?)`;
            conn.query(sql,[uid,bookid,booknum], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//删除 选中商品
function delShoppingCardb(uid,numbookidArray,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = "delete from shopping where userid = ? and bookid in (";
            for(var i=0;i<numbookidArray.length;i++){
                sql+=numbookidArray[i]+","
            }
            sql=sql.substring(0,sql.lastIndexOf(","))+")"
            // console.log(sql)
            conn.query(sql,[uid], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//添加交易 清单
function addJiaoyiListdb(userid,time,money,name,contact,address,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql=`insert into jiaoyi(userid,time,money,shouhuoName,shouhuoTel,shouhuoaddress) values(?,?,?,?,?,?)`
            
            conn.query(sql,[userid,time,money,name,contact,address], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取送货清单中 每本书的数量 然后改变库存
function getBooknumKucundb(temBookidArray,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = "select inventory,id from bookmenu where id in (";
            for(var i=0;i<temBookidArray.length;i++){
                sql+=temBookidArray[i]+","
            }
            sql=sql.substring(0,sql.lastIndexOf(","))+")"
            
            conn.query(sql, function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//修改对应书的 库存
function getBooknumKucundb(id,kucun,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `update bookmenu set kucun=? where id=?`
            conn.query(sql,[kucun,id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取送货清单中 每本书的数量 然后改变销量
function getBooksalesSalesdb(temBookidArray,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = "select sales,id from bookmenu where id in (";
            for(var i=0;i<temBookidArray.length;i++){
                sql+=temBookidArray[i]+","
            }
            sql=sql.substring(0,sql.lastIndexOf(","))+")"
            // console.log(sql)
            conn.query(sql, function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//修改对应书的 销量
function updateSalesdb(id,sales,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `update bookmenu set sales=? where id=?`
            conn.query(sql,[sales,id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

function searchShopping1(id,bc) {
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { 
            console.log(err);
        } else { 
            var sql = `select * from shopping where userid=${id}`
            conn.query(sql,function (err2, results) {
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取 总共 交易记录表的数据
function getAllMoneydb(bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = "select * from jiaoyi";
            conn.query(sql, function (err2, results) {
                //将返回的结果告诉service
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取获取分类图书的库存数据
function getKucundb(bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select sum(a.inventory) as allnum,a.id,a.class from 
            (select  bookmenu.inventory,bookclass.id,bookclass.class from bookmenu,bookclass 
            where bookmenu.cid=bookclass.id) as a
            group by a.id`;
            conn.query(sql, function (err2, results) {
                //将返回的结果告诉service
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
    
}

//获取商品管理 的数据
function getShangPinGuanlidb(bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select bookmenu.id,bookclass.class,bookmenu.bookname,bookmenu.oldprice,bookmenu.price,
            bookmenu.inventory,discountlist.discountText,bookmenu.mainurl from bookmenu,bookclass,discountlist
            where bookclass.id=bookmenu.cid and bookmenu.discount=discountlist.discountNum`;
            conn.query(sql, function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//搜索类名 或 书名 或 是否打折
function searchClassNameBookNamedb(searchText,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select bookmenu.id,bookclass.class,bookmenu.bookname,bookmenu.oldprice,bookmenu.price,
            bookmenu.inventory,discountlist.discountText,bookmenu.mainurl from bookmenu,bookclass,discountlist
            where bookclass.id=bookmenu.cid and bookmenu.discount=discountlist.discountNum and 
            (bookmenu.bookname like '%${searchText}%' or bookclass.class like '%${searchText}%' 
            or discountlist.discountText like '%${searchText}%')`;
            conn.query(sql, function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//保存修改过后的商品数据
function saveShangPindb(id,bookclass,bookname,oldprice,price,kucun,discountText,mainurl,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `update bookmenu set cid=?,bookname=?,oldprice=?,price=?,inventory=?,discount=?,mainurl=? where id=?`;
            conn.query(sql,[bookclass,bookname,oldprice,price,kucun,discountText,mainurl,id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

function deleteGoodsByIddb(id,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `delete from bookmenu where id=?`;
            conn.query(sql,[id], function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//管理员 登录
function serverLogindb(username,pwd,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select aid from administrator where username=? and pwd=?`;
            conn.query(sql,[username,pwd],function (err2, results) {
                //将返回的结果告诉service
                // console.log(results);
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

//获取 今日 交易记录表的数据
function getTodayMoneydb(time,bc) {
    /**
     * 1.当连接成功时，err的值为null. 失败时
     * 2.conn是连接对象
     */
    mysqlPool.pool.getConnection(function (err, conn) {
        if (err) { //失败
            console.log(err);
        } else { //连接成功
            var sql = `select time,money from jiaoyi where time=?`;
            conn.query(sql,[time], function (err2, results) {
                //将返回的结果告诉service
                bc(results);
                conn.release(); //释放连接
            });
        }
    });
}

exports.getTodayMoneydb = getTodayMoneydb;
exports.serverLogindb = serverLogindb;
exports.deleteGoodsByIddb = deleteGoodsByIddb;
exports.saveShangPindb = saveShangPindb;
exports.searchClassNameBookNamedb = searchClassNameBookNamedb;
exports.getShangPinGuanlidb = getShangPinGuanlidb;
exports.getKucundb = getKucundb;
exports.getAllMoneydb = getAllMoneydb;
exports.searchShopping1 = searchShopping1;
exports.updateSalesdb = updateSalesdb;
exports.getBooksalesSalesdb = getBooksalesSalesdb;
exports.getBooknumKucundb = getBooknumKucundb;
exports.addJiaoyiListdb = addJiaoyiListdb;
exports.delShoppingCardb = delShoppingCardb;
exports.addShoppingCardb = addShoppingCardb;
exports.getDeliveryListdb = getDeliveryListdb;
exports.getTuiJiandb = getTuiJiandb;
exports.getKunCundb = getKunCundb;
exports.getSalesdb = getSalesdb;
exports.getOldPricePricedb = getOldPricePricedb;
exports.getAuthorPublishPublishTimedb = getAuthorPublishPublishTimedb;
exports.getBookNameDescribedb = getBookNameDescribedb;
exports.getSmallPictureUrldb = getSmallPictureUrldb;
exports.delSingleShoppingCardb = delSingleShoppingCardb;
exports.getShoppingCardb = getShoppingCardb;
exports.changephoto = changephoto;
exports.insertShopping = insertShopping;
exports.selectAll = selectAll;
exports.selectKeywords = selectKeywords;
exports.selectByloginAndPwd = selectByloginAndPwd;
exports.selectByloginname = selectByloginname;
exports.insert = insert;
exports.search = search;
exports.selectBook = selectBook;
exports.insertBook = insertBook;