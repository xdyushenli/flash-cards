const fs = require("fs");
const path = require('path');
const queryString = require('querystring');
const crypto = require('crypto');
const { readData, updateData, createData, deleteData } = require('./db.js');
const { UserModel, CardModel } = require('../models');

// todo 过滤非法字符串
function filterInvaildStr(str) {
    return str;
}

// 返回请求
function returnResponse(response, statusCode, head, body) {
    // 头部默认设置
    Object.assign(head, {
        "Content-Type": "application/json",
    })

    response.writeHead(statusCode, head);
    response.write(JSON.stringify(body));
    response.end();
}

// hash函数, 用于加密字符串
function hash(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

// todo
// 获取 post 方法返回的数据
// function getPostData(request, data) {
//     request.addListener('data', function (chunk) {
//         data =;
//     });
// }

// 注册
function signUp(request, response) {
    console.log('signUp request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        const { username, password } = queryString.parse(data);
        // 加密数据
        username = hash(username);
        password = hash(password);

        UserModel.find({ username }, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            // 有同名用户
            if (result.length !== 0) {
                // 返回创建失败请求
                returnResponse(response, 200, {}, {
                    code: 0,
                    msg: 'username has been taken!',
                });

                console.log('username has been taken!');
            } else {
            // 无同名用户
                const newUser = new UserModel({
                    username,
                    password,
                });

                // 创建新用户
                newUser.save((err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    // 返回创建成功的请求
                    returnResponse(response, 200, {}, {
                        code: 1,
                        msg: 'user created successfully!',
                    });

                    console.log('user created successfully!');
                });
            }
        });
    });
}

// 登录 todo 测试
function logIn(request, response) {
    console.log('login request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        const { username, password } = queryString.parse(data);
        // 加密数据
        username = hash(username);
        password = hash(password);

        // 查询用户名和密码是否正确
        UserModel.find({ username, password }, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            // todo 将登录态保存到本地, 下次无需登录即可直接使用, 在创建卡片时自带 cookie
            if (result.length !== 0) {
                // 登录成功
                returnResponse(response, 200, {}, {
                    code: 1,
                    msg: 'login successed!',
                })
            } else {
                // 登录失败
                returnResponse(response, 200, {}, {
                    code: 0,
                    msg: 'user not found!',
                })
            }
        })
    })
}

// 创建卡片 todo 测试
function createCard(request, response) {
    console.log('createCard request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        const { username = '', type, title = '', content = '', unknown = true } = queryString.parse(data);
        
        // 用户名为空或卡片类型为空
        if (!username) {
            returnResponse(response, 500, {}, {
                code: 0,
                msg: 'username not found!',
            })
        } else if (type === undefined) { 
            returnResponse(response, 500, {}, {
                code: 0,
                msg: 'card type required!',
            })
        } else {
            // 创建卡片
            const newCard = new CardModel({
                username,
                type,
                title,
                content,
                unknown,
            });

            // 存储卡片
            newCard.save((err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                // 返回创建成功的请求
                returnResponse(response, 200, {}, {
                    code: 1,
                    msg: 'card created successfully!',
                });

                console.log('user created successfully!');
            });
        }
    })
}

// 查询卡片 todo 测试
function readCards(request, response) {
    console.log('readCards request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        const queryObj = queryString(data);

        UserModel.find(queryObj, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            // 返回卡片的查询结果
            returnResponse(response, 200, {}, {
                code: 1,
                msg: 'card list found!',
                data: {
                    cardlist: result,
                }
            })
        })
    })
}

// 修改卡片 todo 测试
function updateCard(request, response) {
    console.log('updateCard request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        const { cardID, ...cardInfo } = queryString(data);

        CardModel.update({ _id: cardID }, cardInfo, function (err) {
            if (err) {
                console.log(err);
            } else {
                returnResponse(response, 200, {}, {
                    code: 1,
                    msg: 'card updated!',
                })
            }
        })
    })
}

// 删除卡片 todo 测试
function deleteCard(request, response) {
    console.log('deleteCard request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        const { cardID } = queryString(data);

        CardModel.remove({ _id: cardID }, function (err) {
            if (err) {
                console.log(err);
            } else {
                returnResponse(response, 200, {}, {
                    code: 1,
                    msg: 'card removed!',
                })
            }
        })
    })
}

// todo 删除 测试页面
function start(request, response) {
    console.log('start request handlers has been called!');

    fs.readFile(path.join(__dirname, './test.html'), 'utf8', (err, data) => {
        if (err) {
            throw(err)
        }

        response.writeHead(200, {
            'Content-Type': 'text/html',
        });

        response.write(data);
        response.end();
    });
}

module.exports = {
    // todo 删除start
    start,
    signUp,
    logIn,
    createCard,
    readCards,
    updateCard,
    deleteCard,
}