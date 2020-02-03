const sqlite3 = require('sqlite3');
const crypto = require('crypto');

// 新建并打开数据库
const database = new sqlite3.Database('./db/cards.db', function (err) {
    if (err) {
        throw err;
    } else {
        console.log('database connect successed!');

        // 创建用户表
        database.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            salt TEXT NOT NULL
        )`)

        // 创建卡片表
        database.run(`CREATE TABLE IF NOT EXISTS cards (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            userId TEXT NOT NULL,
            type INT NOT NULL,
            unknown BOOLEAN NOT NULL,
            title TEXT,
            content TEXT,
            FOREIGN KEY (userId)
            REFERENCES users (id)
        )`)
    }
});

// 生成加密数据用的盐
function generateSalt(length = 256) {
    return crypto.randomBytes(length).toString('hex');
}

// 使用盐加密数据
function sha512(str, salt) {
    return crypto.createHmac('sha512', salt).update(str).digest('hex');
}

// 加密函数, 用于加密敏感信息
function encryptData(str) {
    // 生成盐
    const salt = generateSalt(256);
    // 对数据进行加密
    const hash = sha512(str, salt);

    return {
        salt,
        hash,
    }
}

// 根据用户名获取用户信息
function __getUserInfoByUsername(username) {
    return new Promise((resolve, reject) => {
        database.get(`SELECT salt, password FROM users WHERE username = ?`, username, function (err, result) {
            if (err) {
                reject(err);
            }

            resolve(result)
        })
    })
}

// 校验用户
function testUser(username, password) {
    // 根据用户名查找用户
    return __getUserInfoByUsername(username)
    .then((result) => {
        // 判断用户名和密码是否符合
        if (!result) {
            return Promise.reject(false);
        }

        const { salt: db_salt, password: db_password } = result;

        if (sha512(password, db_salt) !== db_password) {
            return Promise.reject(false);
        } else {
            return Promise.resolve(true);
        }
    });
}

// 创建用户
function createUser(username, password) {
    return __getUserInfoByUsername(username)
    .then((result) => {
        // 用户已存在
        if (result) {
            return new Promise.reject(false);
        }

        // 用户不存在
        return new Promise((resolve, reject) => {
            let { salt, hash: db_password } = encryptData(password);

            database.run(`INSERT INTO users (username, salt, password) VALUES (?, ?, ?)`, [username, salt, db_password], (err) => {
                if (err) {
                    reject(err);
                }

                resolve(true);
            })
        });
    })
}

// 创建卡片
function createCard(userId, type, title, content, unknown) {
    return new Promise((resolve, reject) => {
        database.run(`INSERT INTO cards (userId, type, title, content, unknown) VALUES (?, ?, ?, ?, ?)`, [userId, type, title, content, unknown], err => {
            if (err) {
                reject(err);
            }

            resolve(true);
        })
    })
}

// 读取卡片
function readCards(userId) {
    return new Promise((resolve, reject) => {
        database.all(`SELECT * FROM cards WHERE userId = ?`, userId, (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        })
    })
}

// 修改卡片
function updateCard(cardId, type, title, content, unknown) {
    return new Promise((resolve, reject) => {
        database.run(`UPDATE cards SET type = ?, title = ?, content = ?, unknown = ? WHERE id = ?`, [type, title, content, unknown, cardId], err => {
            if (err) {
                reject(err);
            }

            resolve(true);
        })
    })
}

// 删除卡片
function deleteCard(cardId) {
    return new Promise((resolve, reject) => {
        database.run(`DELETE FROM cards WHERE id = ?`, cardId, err => {
            if (err) {
                reject(err);
            }

            resolve(true);
        })
    })
}

exports.db_testUser = testUser;
exports.db_createUser = createUser;
exports.db_createCard = createCard;
exports.db_readCards = readCards;
exports.db_updateCard = updateCard;
exports.db_deleteCard = deleteCard;
