const {Router} = require("express");
const { OrderModel } = require("../Model/order.model");
const orderRoutes=Router()



orderRoutes.post("/orders",async(req,res)=>{

   const {user, restaurant,items, totalPrice,deliveryAddress,status} = req.body;

     try {

   const order = new OrderModel({ user,restaurant, items, totalPrice,  deliveryAddress,status });
   await order.save()

   res.status(200).send("order posted successfully")
      
     } catch (error) {
          return res.send({"msg":error.message})
     }

})



orderRoutes.get("/orders/:id",async(req,res)=>{
    const {id}=req.params;

    try {
           const order= await OrderModel.findById({_id:id}).populate("user","name email").populate("restaurant","name address")
        
             if(order){
                res.send(order)
             }else{
                res.send("error")
             }

    } catch (error) {
        return res.send({"msg":error.message})
    }
})


orderRoutes.patch("/orders/:id",async(req,res)=>{

const {id} = req.params;
 const {status} = req.body;


    try {

        const orderUpdate= await OrderModel.findByIdAndUpdate(id,status)
         if(orderUpdate){
            res.send("order updatae")
         }else{
            res.send("error")
         }
       
    } catch (error) {
        return res.send({"msg":error.message})
    }
})














module.exports={orderRoutes}