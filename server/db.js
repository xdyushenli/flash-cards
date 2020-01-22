const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/flash-cards";

// 连接数据库
function connectMongoDB(address) {
    // 开启 debug
    if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
    }

    // 未连接到数据库时操作直接返回失败
    mongoose.set('bufferCommands', false);

    try {
        mongoose.connect(address, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // 未连接到数据库时操作直接返回失败
            bufferMaxEntries: 0,
        })

        const db = mongoose.connection;

        db.on('error', (error) => {
            console.log(`MongoDB connecting failed: ${error}`);
        })
        db.once('open', () => {
            console.log('MongoDB connecting succeeded!');
        })

        return db;
    } catch (error) {
        console.log(`MongoDB connecting failed: ${error}`);
    }
}

// 数据库实例
const mongoInstance = connectMongoDB(url);

// 查询数据
function readData(collectionName, filter) {
    return new Promise((resolve, reject) => {
        mongoInstance.collection(collectionName).find(filter).toArray(function (err, result) {
            if (err) {
                console.log('数据读取失败!');
                reject(err)
            }

            console.log('数据读取成功!');
            resolve(result);
        })
    });
}

// 修改数据
function updateData(collectionName, filter, data) {
    return new Promise((resolve, reject) => {
        mongoInstance.collection(collectionName).updateMany(filter, data, function (err, result) {
            if (err) {
                console.log('数据修改失败!');
                reject(err)
            }

            console.log('数据修改成功!');
            resolve(result);
        })
    });
}

// 创建数据
function createData(collectionName, data) {
    data = Array.isArray(data) ? data : [data];

    return new Promise((resolve, reject) => {
        mongoInstance.collection(collectionName).insertMany(data, function (err, result) {
            if (err) {
                console.log('数据创建失败!');
                reject(err)
            }

            console.log('数据创建成功!');
            resolve(result);
        })
    });
}

// 删除数据
function deleteData(collectionName, filter) {
    return new Promise((resolve, reject) => {
        mongoInstance.collection(collectionName).deleteMany(filter, function (err, result) {
            if (err) {
                console.log("数据删除失败!");
                reject(err)
            }

            console.log('数据删除成功!');
            resolve(result);
        })
    });
}

module.exports = {
    mongoInstance,
    readData,
    updateData,
    createData,
    deleteData,
}
