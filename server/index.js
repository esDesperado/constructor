require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const path = require('path')
const bcrypt = require('bcrypt')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const PORT = 443 || process.env.PORT || 7000
const app = express()
const request = require("request");
const fs = require('fs')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static/componentImages')))
app.use(express.static(path.resolve(__dirname,'static/systemImages')))
app.use(express.static(path.resolve(__dirname,'static/mailImages')))
app.use(express.static(path.resolve(__dirname,'static/interfaceImages')))
app.use(express.static(path.resolve(__dirname,'static/favicon')))
app.use(express.static(path.resolve(__dirname,'static/videos')))
app.use(express.static(path.resolve(__dirname,'static/3d')))
app.use(fileUpload({}))
app.use('/api', router)

//идёт последний всегда
app.use(errorHandler)
const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        //let proxy = require('http-proxy').createProxyServer();

        let SSloptions = {
            key:    fs.readFileSync('/etc/letsencrypt/live/stroidiskont.com/privkey.pem'),
            cert:   fs.readFileSync('/etc/letsencrypt/live/stroidiskont.com/fullchain.pem'),
            ca: [
                fs.readFileSync('/etc/letsencrypt/live/stroidiskont.com/cert.pem')
            ],
            rejectUnauthorized: false,
            requestCert: true,
            agent: false,
            strictSSL: false
        };

        app.https(SSloptions).io();

        app.listen(14443, () => console.log(`server started on port ${14443}`));

    }catch(e){
        console.log(e)
    }

}


start()