
authenticate = (req, res, next) => {
        if(process.env.PASSWORD !== req.headers.authorization) {
            return res.status(401).json("Le password est différent ou non défini")
        }
        next()
}


module.exports = {authenticate}