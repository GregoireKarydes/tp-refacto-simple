

const validateSignupDto = (req,res,next) => {
    const {name, email, password} = req.body
    if(!name || !email ||!password) {
        return res.status(400).json('Email, password and name are mandatory')
    }
    if(password.length<8) {
        return res.status(400).json('Password length must be > 8')
    }

    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
        return res.status(400).json('Incorrect email')
    }

    next()
}


module.exports = {validateSignupDto}