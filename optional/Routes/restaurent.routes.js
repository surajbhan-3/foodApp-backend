const {Router}= require("express")
const restaurentRoutes=Router()

const {RestaurentModel}=require("../Model/restaurent.model")







restaurentRoutes.get("/restaurants",async(req,res)=>{

    try {
          
         const allRest= await RestaurentModel.find()

          return res.statusCode(201).send(allRest)
       
    } catch (error) {
        return res.send({"msg":error.message})
    }
})




restaurentRoutes.get("/restarants/:id",async(req,res)=>{
    const {id}=req.params


    try {
           const resbyId= await RestaurentModel.findById({_id:id})
           return   res.send(resbyId)
       
    } catch (error) {
        return res.send({"msg":error.message})

    }
})




restaurentRoutes.get("/restarants/:id/menu",async(req,res)=>{

    try {

        const {id}=req.params

        const  resMenu= await RestaurentModel.findById({_id:id})

           if(resMenu){
             res.send(resMenu.menu)
           }else{
            res.status(404).send({"msg":"Not found"})
           }
       
    } catch (error) {
       
        return res.send({"msg":error.message})

    }
})



restaurentRoutes.post("/restaurants",async(req,res)=>{

   try {

    const {name,address,menu} = req.body;

    const restaurant = new RestaurentModel({name, address, menu, });
      restaurant.save()
      res.send("restaurant added successfully")
    
   } catch (error) {
    
     res.send("erorr")
   }
  
})


restaurentRoutes.post("/restaurants/:id/menu",async(req,res)=>{

    const {id} = req.params;
    const { name,description,price,image }= req.body;
    
    const menuItems={
        name,description,price,image
    }

    
    try {
         
        const  updataMenu= await RestaurentModel.findByIdAndUpdate({$push:{menu:menuItems}})
                 
        return res.send("data is updated")
             
 
    } catch (error) {
        return res.send({"msg":error.message})
        
    }
})



restaurentRoutes.delete("/restaurants/:rid/menu/:mid",async(req,res)=>{
 const {rid,mid}= req.params
  


    try {

        const deleteMenu= await RestaurentModel.findByIdAndDelete(rid,{$pull:{menu:{_id:mid}}})
              if(deleteMenu){
               return  res.send("item deleted successfully")
              }else{
               return  res.send("erorr")
              }
       
    } catch (error) {
       
    }
})









module.exports={restaurentRoutes}