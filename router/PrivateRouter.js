
const express = require('express');
const { userRouter } = require('./UserRouter');
const { authenticate } = require('../middlewares/AuthMiddleware');
const privateRouter = express.Router();


privateRouter.use(authenticate)
privateRouter.use(userRouter)

module.exports = {privateRouter}