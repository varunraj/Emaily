// middleware to check if used is logged in


module.exports = (req, res, next) => {
    if (!req.user){
        return res.status(401).send({error:"You must Login"})
    }
    // we need to do call 'next' if user is present

    next()
}