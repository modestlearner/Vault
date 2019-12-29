const mongoose = require('mongoose')

const KeySchema = new mongoose.Schema({
    encryptionkey:{
        type:String,
        unique:true,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = KeyDoc = mongoose.model('keydoc',KeySchema)