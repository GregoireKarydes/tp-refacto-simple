require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const DbConfigurator = require('./config/Database');
const { authenticate } = require('./middlewares/AuthMiddleware');
const { userRouter } = require('./router/UserRouter');

const start = async () => {
    await new DbConfigurator().connect()
    app.use(bodyParser.json())
    app.use(authenticate)
    app.use(userRouter)
    app.use('*', (req, res) => {
        res.status(404).json('Not found')
    })
    app.listen(process.env.PORT, () => {
        console.info(`Application est en cours sur le port ${process.env.PORT}`)
    })
    
} 

start()



