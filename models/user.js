const { Schema } = require('mongoose');
const { mongoInstance } = require('../server/db');

const UserSchema = new Schema({
    username: String,
    password: String,
})

module.exports = mongoInstance.model('users', UserSchema)