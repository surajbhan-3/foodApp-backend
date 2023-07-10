const {Router}=require("express")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const {UserModel}= require("../Model/user.model")
require("dotenv").config()
const userRoutes=Router()






 userRoutes.post("/register", async(req,res)=>{

     const {name,email,password,address}= req.body;
    
    //  console.log(req.body)
                    try {
                      
                        const isUserPresent= await UserModel.findOne({email})

                        
                            //    console.log(isUserPresent.email)
                            console.log("hii")
                        
                         if(isUserPresent){
                            
                           return   res.send({"msg":"user already register please login"})
                         }

                        const hashPassword=  await bcrypt.hashSync(password,8)
                        console.log("ehhi")
                        const registerUser= new UserModel({name,email,password:hashPassword,address})
                          console.log(registerUser)
                          await registerUser.save()
                          console.log("hhe")
                         return  res.send("user registered successfully")

                        
                    } catch (error) {
                     return   res.send({"msg":error.message})
                    }
 })


 userRoutes.post("/login",async(req,res)=>{
    const {email,password}= req.body;
             try {
                 
                const isUserPresent = await UserModel.findOne({email:email})
                 
                 if(!isUserPresent){
                 
                 return   res.status(201).send({"msg":"User doesn0t exists please register"})

                 }

                 const  isUserpassword= await bcrypt.compare(password,isUserPresent.password)

                 if(!isUserpassword){
                    return res.send("Invalid username and password")
                 }
                 const token=jwt.sign({userId:isUserPresent._id,email:isUserPresent.email},process.env.skey)
                      return res.send({"msg":"Login sucessfull",token:token})
             } catch (error) {
                
                return   res.status(201).send({"msg":error.message})

             }
 })






    userRoutes.patch("/api/user/:id/reset",async(req,res)=>{
        const uid = req.params.id
        const {currpassword,newpassword} = req.body;
        try {
            const user = await UserModel.findOne({_id:uid})
            if(!user){
                return res.status(400).send({ "msg": "user does not exist please register" })  
            }
            bcrypt.compare(currpassword, user.password, async function (err, result) {
                  if (result) {
                          const hash = bcrypt.hashSync(newpassword, 8);
                        user.password = hash
                    await user.save()
                    res.status(204).send({"msg":"Password reset successfully", user })
                }else{
                    res.status(400).send({"msg": "Kindly Provide Correct Current Password"}) 
                }
            });
        } catch (error) {
            res.status(400).send({ "msg": error.message })
        }
    })










module.exports={userRoutes}