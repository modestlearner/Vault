const express = require('express')

const app = express()

app.use(express.json())

const PORT = process.env.port || 9000

app.listen(PORT,function(){
    console.log(`Server is running on ${PORT}`)
})