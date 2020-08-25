module.exports = (req, res, next) => {
    if (req.user.credits < 1){
        return res.status(403).send({error:"You must have enough credits"})
    }
    // we need to do call 'next' if user is present

    next()
}