const mongoose = require('mongoose')

const db = process.env.MONGOURI

const connectDB=()=>mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false }).then(()=>{
    console.log("DB connected")
}).catch(err=>{
    console.log(err.message)
    process.exit(1)
})

module.exports = connectDB