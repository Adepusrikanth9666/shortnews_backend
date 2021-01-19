const jwt =require("jsonwebtoken");

const auth = (req,res,next)=>{

    try {

        const token  =req.header("x-auth-token");
        if(!token){
            return res.status(401).json({msg:"no authentication is denined"});

        }  
        console.log("hello");
        const verified = jwt.verify(token,process.env.JWT_SERECT);
        if(!verified){

            return res.status(401).json({msg:'token verification is faileed'});


        }
        req.user = verified.id;
        console.log(verified.id);
        next();
    } catch (error) {

        res.status(500).json({error:error.message})
        
    }
}

module.exports = auth