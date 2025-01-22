require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const DbConfigurator = require('./config/Database');
const { publicRouter } = require('./router/PublicRouter');
const { privateRouter } = require('./router/PrivateRouter');

const start = async () => {
    await new DbConfigurator().connect()
    app.use(bodyParser.json())
    app.use(publicRouter)
    app.use(privateRouter)
    app.use('*', (req, res) => {
        res.status(404).json('Not found')
    })
    app.listen(process.env.PORT, () => {
        console.info(`Application est en cours sur le port ${process.env.PORT}`)
    })
    
} 

start()



