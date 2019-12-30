const config = {

    dev:{
        // mongoURI:"mongodb+srv://harshit:harshit@cluster0-grjws.mongodb.net/test?retryWrites=true&w=majority",
        jwtSecret:"mysecret",
        algorithm:"aes-128-cbc",
        mongoURI:"mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=Vault"

    }
}
module.exports = config