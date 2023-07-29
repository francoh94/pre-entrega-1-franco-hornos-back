import { Router } from "express";
import {cartManager} from "../cartsManager.js";

const router = Router()


router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartManager.getCart(+cid)
      res.status(200).json({message:'Products', cart})
    }
    catch (erro){
      res.status(500).json({message: "Error interno del servidor"});
    }
  });
 
  router.post('/',async(req,res )=>{
    try{
    const createCart = await cartManager.createCart()
    res.status(200).json({message: 'Carts', cart:createCart})
  }
  catch (error){
    res.status(500).json({ error });
  }})

  router.post('/:cid/product/:pid',async(req,res )=>{
    const {cid, pid} = req.params
    try{
    const addProduct = await cartManager.addCart(+cid, +pid)
    res.status(200).json({message: 'producto agregado', cart:addProduct})
  }
  catch (error){
    res.status(500).json({ message: "Error interno del servidor" });
  }})


export default router