const mongoose = require('mongoose')
const config = require('./config')

const db = config.dev.mongoURI

const connectDB = () =>
	mongoose
		.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
		.then(() => {
			console.log('DB connected')
		})
		.catch(err => {
			console.log(err.message)
			process.exit(1)
		})
export default connectDB
