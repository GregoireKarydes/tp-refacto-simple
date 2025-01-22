

const validateLoginDto = (req,res,next) => {
    const {email, password} = req.body
    if(!email ||!password) {
        return res.status(400).json('Email, password and name are mandatory')
    }

    next()
}


module.exports = {validateLoginDto}