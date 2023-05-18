const { verify } = require('jsonwebtoken')

module.exports ={
    userJWT: async  (req, res, next) => {
        const token = req.headers['usertoken'];
        if (!token) {
            console.log("You need token");
        } else {
            verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
                if (err) {
                    console.log(err);
                    res.json({auth:false,status:"failed"})
                } else {
                    req.userId =decoded.userId
                    next();
                }
            })
        }
    }
}