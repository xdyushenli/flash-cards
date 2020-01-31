const { Schema } = require('mongoose');
const { mongoInstance } = require('../server/db');

const CardSchema = new Schema({
    userID: {
        type: String, 
        required: true,
    },
    type: {
        type: Number,
        required: true,
        // 0 代表通识卡片, 1 代表代码卡片
        enum: [0, 1],
    },
    title: String,
    content: String,
    unknown: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoInstance.model('cards', CardSchema);