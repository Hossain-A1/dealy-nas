const isAdmin = async(req,res,next)=>{

  if(req.user?.username === "admin"){
    next()
  }else{
  res.status(400).json({error:err.message})
 }
}

module.exports = isAdmin