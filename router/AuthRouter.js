
const express = require('express');
const UserModel = require('../models/UserModel');
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const { validateSignupDto } = require('../dto/SignupDto');


authRouter.post('/signup', validateSignupDto, async (req, res)=> {
    const {name, email, password} = req.body
    const userInDb = await UserModel.findOne({
        where : {
            email
        }
    })

    if(userInDb) {
        return res.status(400).json('Email already used')
    }

    const hash = bcrypt.hashSync(password, 11);

    const user = await UserModel.create({
        name,
        email, 
        password : hash
    })
    
    return res.status(201).json(user)
}) 





module.exports = {authRouter}