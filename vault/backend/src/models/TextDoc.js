const mongoose = require('mongoose')

const TextSchema = new mongoose.Schema({
    secret:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'keydoc',
    },
    encrypted:{
        type:String,
        unique:true
    },
    property:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    machines:{
        type:[String],
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = TextDoc = mongoose.model('textdoc',TextSchema)