const express = require('express');
const authRouter = express.Router();
const { validateSignupDto } = require('../dto/SignupDto');
const { validateLoginDto } = require('../dto/LoginDto');
const { AuthController } = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/AuthMiddleware');
const authController = new AuthController();

authRouter.post('/signup', validateSignupDto, authController.signup);
authRouter.post('/login', validateLoginDto, authController.login);
authRouter.get('/me', authenticate, authController.getMe);

module.exports = { authRouter };
