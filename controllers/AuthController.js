const UserModel = require("../models/UserModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userAttributes = ["id","name","email","avatar","createdAt","updatedAt"]

class AuthController {
    constructor() {}

    login = async (req, res, next) => {
        const {email, password} = req.body
        const user = await UserModel.findOne({
            where : {
                email
            }
        })
        if(!user) {
            return res.status(401).json('Mail or password incorrect')
        }
    
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword) {
            return res.status(401).json('Mail or password incorrect')
        }
       
        const token = this.#generateToken({
            id: user.id
        })
    
        return res.status(200).json(token)
    }

    signup = async (req, res, next) => {
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
        const token = this.#generateToken({
            id: user.id
        })
        
        return res.status(201).json(token)
    }

    getMe = async (req, res, next) => {
        const user = await UserModel.findByPk(req.user, {attributes : userAttributes} )
        return res.status(200).json(user)
    }

    #generateToken = async (payload) => {
        const token =  jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1h' })
    }
}


module.exports = {AuthController}

