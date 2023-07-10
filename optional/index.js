const express  = require("express")
require("dotenv").config()

const {connection} = require("./Config/db")

const {userRoutes}= require("./Routes/users.routes")
const {restaurentRoutes} = require("./Routes/restaurent.routes")
const {orderRoutes} = require("./Routes/order.routes")






const app=express()
app.use(express.json())

app.get("/",(req,res)=>{

       res.send("Welcome to home page of foodapp")
})




app.use("/api",userRoutes)
app.use("/api",orderRoutes)
app.use("/api", restaurentRoutes)








app.listen(process.env.PORT,async()=>{


       try {
         await connection
         console.log("Connected to Database")
       } catch (error) {
         console.log(error)
        
       }

       console.log("Server is running")
})
