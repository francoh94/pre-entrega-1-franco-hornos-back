import fs from 'fs'

class CartManager {
    constructor(path){
    this.path = path}
    
    async getCarts(){
        try{if (fs.existsSync(this.path)){
            const carts = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(carts)
        }else{
            return[]
        }}catch(error){
          return error
        }
    }
    
async getCart(id) {
  try{
    const carts = await this.getCarts()
    const cart = carts.find(e=>e.id===id)
    return cart
}catch (error) {
  return error;
}}

async createCart() {
    const carts = await this.getCarts();
    let id;
    try{
    if (!carts.length) {
      id = 1;
    } else {
      id = carts[carts.length - 1].id + 1;
    }
    const newCarts= { products: [], id };
    carts.push(newCarts);
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
    return newCarts;
  }catch (error) {
    return error;
  }}

  async addCart(cid, pid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(c => c.id === cid);
      const productIndex = cart.products.findIndex(p => p.id === pid);
  
      if (productIndex === -1) {
        cart.products.push({ id: pid, quantity: 1 });
      } else {
        cart.products[productIndex].quantity++;
      }
  
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      return error;
  }}
}
export const cartManager = new CartManager('cart.json')