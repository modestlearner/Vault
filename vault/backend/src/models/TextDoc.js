const mongoose = require('mongoose')

const TextSchema = new mongoose.Schema({
    secret:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'keydoc'
    },
    plainTextCombined:{
        type:String,
        required:true,

    },
    property:{
        type:String,
        unique:true,
        required:true
    },
    clients:{
        type:String,
        unique:true,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = TextDoc = mongoose.model('textdoc',TextSchema)