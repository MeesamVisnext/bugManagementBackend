const jwt = require('jsonwebtoken');
const config = require('config')

const authenticateToken = (req,res,next)=>{
    try{
        let token= req.headers.authorization;
        if(token){
            token =token.split(" ")[1];
            let user = jwt.verify(token,config.secretKey)
            req.userId = user.user.user_id;
        }
        else{
            res.status(403).json({message:'Forbidden user'})
        }
        next();
    }
    catch (error){
        console.log(error)
        res.status(403).json({message:'Forbidden user'})
    }
}
module.exports =authenticateToken;
