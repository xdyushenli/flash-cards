const fs = require("fs");
const path = require('path');
const queryString = require('querystring');
const { db_createUser, db_deleteCard, db_createCard, db_readCards, db_testUser, db_updateCard } = require('./db.js');

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

// 注册 todo 返回数据
function signUp(request, response) {
    console.log('signUp request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end',function () {
        let { username, password } = queryString.parse(data);

        db_createUser(username, password)
        .then(result => {
            console.log(result);
        }, result => {
            console.log(result);                    
        })
    });
}

// 登录 todo 返回数据
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

        // 查询用户名和密码是否正确
        db_testUser(username, password)
        .then(result => {
            console.log(result);
        }, result => {
            console.log(result);
        })
    })
}

// 创建卡片 todo 返回请求
function createCard(request, response) {
    console.log('createCard request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        // 默认 1 为 通识卡片, 0 为代码卡片
        const { userId, type = 1, title = '', content = '', unknown = true } = queryString.parse(data);

        // 用户名为空或卡片类型为空
        if (!userId) {
            returnResponse(response, 500, {}, {
                code: 0,
                msg: 'user not found!',
            })
        } else if (type === undefined) { 
            returnResponse(response, 500, {}, {
                code: 0,
                msg: 'card type required!',
            })
        } else {
            // 创建卡片
            db_createCard(userId, type, title, content, unknown)
            .then(result => {
                console.log(result);
            }, result => {
                console.log(result);
            });
        }
    })
}

// 查询卡片 todo 返回请求
function readCards(request, response) {
    console.log('readCards request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        const { userId } = queryString.parse(data);

        db_readCards(userId)
        .then(result => {
            console.log(result);
        }, result => {
            console.log(result);                    
        })
    })
}

// 修改卡片 todo 返回请求
function updateCard(request, response) {
    console.log('updateCard request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        const { cardId, type = 1, title = '', content = '', unknown = true } = queryString.parse(data);

        db_updateCard(cardId, type, title, content, unknown)
        .then(result => {
            console.log(result);
        }, result => {
            console.log(result);
        })
    })
}

// 删除卡片 todo 返回请求
function deleteCard(request, response) {
    console.log('deleteCard request handlers has been called!');

    // 读取数据
    let data = '';
    request.addListener('data', function (chunk) {
        data += chunk;
    });

    // 数据传输完毕
    request.addListener('end', function () {
        const { cardId } = queryString.parse(data);

        db_deleteCard(cardId)
        .then(result => {
            console.log(result);
        }, result => {
            console.log(result);
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