const fs = require("fs");
const path = require('path');
const queryString = require('querystring');
const mongoose = require('mongoose');
const { readData, updateData, createData, deleteData } = require('./db.js');
const { UserModel } = require('../models');

// todo 过滤非法字符串
function filterInvaildStr(str) {
    return str;
}

// 返回请求
function returnResponse(response, statusCode, head, body) {
    response.writeHead(statusCode, head);
    response.write(JSON.stringify(body));
    response.end();
}

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
        // todo 加上hash值
        const { username, password } = queryString.parse(data);

        // 查询是否有同名用户
        UserModel.find({ username }, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            // 有同名用户
            if (result.length !== 0) {
                // 返回创建失败请求
                returnResponse(response, 200, {
                    "Content-Type": "application/json",
                }, {
                    code: '500',
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
                    returnResponse(response, 200, {
                        "Content-Type": "application/json",
                    }, {
                        code: '200',
                        msg: 'user created successfully!',
                    });

                    console.log('user created successfully!');
                });
            }
        });

        // // 查询是否有同名用户, 如果有返回错误
        // readData('user', { username })
        // .then((result) => {
        //     console.log(result);

        //     // 有同名用户
        //     if (result.length !== 0) {
        //         response.writeHead(200, {
        //             "Content-Type": "application/json",
        //         });
        //         response.write(JSON.stringify({
        //             success: false,
        //         }));
        //         response.end();
            
        //         throw new Error("username has been taken!")
        //     } else {
        //         // 无重名用户, 创建新用户
        //         createData('user', { username, password })
        //         .then(() => {
        //             response.writeHead(200, {
        //                 "Content-Type": "application/json",
        //             });
        //             response.write(JSON.stringify({
        //                 success: true,
        //             }));
        //             response.end();
        //         })
        //     }
        // });
    });
}

// 登录
function logIn(request, response) {
    
}

// 创建卡片
function createCard(request, response) {

}

// 查询卡片
function readCards(request, response) {

}

// 修改卡片
function updateCard(request, response) {

}

// 删除卡片
function deleteCard(request, response) {

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