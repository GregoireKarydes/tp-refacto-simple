const express = require('express');
const { authRouter } = require('./AuthRouter');
const publicRouter = express.Router();

publicRouter.use(authRouter);

module.exports = { publicRouter };
