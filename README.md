# Vault      

Vault is a Secret management and distribution application which uses a symmetrical encryption algorithm to encrypt credentials and also needs machine IP addresses for whitelisting purposes.

It uses a JWT and Google Authenticator to protect the vault from intruders.



## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/modestlearner/Vault.git 
cd Vault/vault/backend
npm install
npm run dev # for dev environment
```

## Creating a prod.env file

#### Take reference from dev.env file present in configuration directory

```sh
cd src/configurations
mv sample.env prod.env #enter your jwt secret and mongoDB connection string here 
```


