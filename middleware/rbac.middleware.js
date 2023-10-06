const rolefunction = (...arr)=>{
    return (req, res, next)=>{
        try {
            if(arr.includes(req.role)){
                next();
            }else {
                res.send('you are not authorized to access this end point')
            }
        } catch (error) {
            res.send({error:error.message})
        }
    }
}

module.exports = {rolefunction}