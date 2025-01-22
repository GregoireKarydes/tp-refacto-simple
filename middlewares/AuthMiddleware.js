
const jwt = require('jsonwebtoken')

authenticate = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if(!token) {
        return res.status(401).json('Token not provided')
    }
    try {
        jwt.verify(token, process.env.JWT_TOKEN)
    } catch (error) {
        return res.status(401).json('Invalid token')
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    req.user = decodedToken.id
    next()
}


module.exports = {authenticate}