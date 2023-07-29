import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();


const productosJSONPath = "productos.json";
const manager = new ProductManager(productosJSONPath);

router.get("/", async (req, res) => {
  const {limit} = req.query
  try{
  const products = await manager.getProducts();
  const result = +limit ? products.slice(0, limit) : products;
  res.send({ message: "Todos los productos:", data: result });}
  catch(error){
    res.status(500).json({message: error.message})
  }
});

router.get("/:pid", async (req, res) => {
  const {pid} = req.params;
  try{
  const ProductById = await manager.getProductById(+pid)
  res.send(ProductById);
}
  catch (erro){
    response.status(500).json({message:"Producto no encontrado"});
    return;
  }
});

router.post('/',async(req, res) =>{
  const { title, description, price, thumbnail, code, stock } = req.body;

  if (!title || !description || !price || !thumbnail || !code || !stock) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }
  if (thumbnail && !Array.isArray(thumbnail)) {
    return res.status(400).json({ message: "El campo 'thumbnail' debe ser un array de rutas de imagen." });
  }
  if (thumbnail) {
    for (const path of thumbnail) {
      if (typeof path !== "string") {
        return res.status(400).json({ message: "Las rutas de imagen en 'thumbnail' deben ser cadenas de texto." });
      }
    }
  }

  const status = req.body.status !== undefined ? req.body.status : true;
  const productAdd = {
    title,
    description,
    price,
    thumbnail: thumbnail || [],
    code,
    stock,
    status,
  };
  try{
    const product = await manager.addProduct(productAdd);
  res.status(200).json({message:'producto agregado con exito', product})
}
catch (erro){
  res.status(500).json({message:"Error, no se pudo agregar"});
}
});

router.put('/:pid',async(req, res) =>{
  const {pid} = req.params
  try{
  const productUpdate = await manager.updateProduct(+pid, req.body)
  res.status(200).json({message:'Producto modificado'})
  }
  catch (erro){
    res.status(500).json({message:"Error, no se pudo modificar el producto"});
  }
})
router.delete('/:pid',async(req, res) =>{
  const {pid} = req.params
  try{
  const productDelete = await manager.deleteProduct(+pid)
  res.status(200).json({message:'Producto eliminado'})
  }
  catch (error){
    res.status(500).json({message:"Error, no se pudo eliminar el producto"});   
}
})
export default router;
