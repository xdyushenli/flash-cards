const { Schema } = require('mongoose');
const { mongoInstance } = require('../server/db');

const CardSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true,
    },
    title: String,
    content: String,
    unknown: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoInstance.model('cards', CardSchema);