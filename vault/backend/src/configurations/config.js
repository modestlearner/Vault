const config = {

    dev:{
        mongoURI:"mongodb+srv://harshit:harshit@cluster0-grjws.mongodb.net/test?retryWrites=true&w=majority",
        jwtSecret:"mysecret",
        algorithm:"aes-128-cbc",
        // mongoURI:"mongodb+srv://harshit@cluster0-grjws.mongodb.net/admin?replicaSet=Cluster0-shard-0&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=Test&3t.databases=admin,test"

    }
}
module.exports = config