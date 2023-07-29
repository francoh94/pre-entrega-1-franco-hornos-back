import fs from "fs"

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoArchivo = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(infoArchivo);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }
  async addProduct(producto) {
    try {
      const listaDeProductos = await this.getProducts();
      let id;
      if (!listaDeProductos.length) {
        id = 1;
      } else {
        id = listaDeProductos[listaDeProductos.length - 1].id + 1;
      }
      const productoId = { ...producto, id };
      listaDeProductos.push(productoId);
      await fs.promises.writeFile(this.path, JSON.stringify(listaDeProductos));
      return listaDeProductos
    } catch (error) {
      return error;
    }
  }
  async getProductById(idB) {
    try {
      const listaDeProductos = await this.getProducts();
      const productoId = listaDeProductos.find(
        (producto) => producto.id === idB
      );
      if (!productoId) {
        return "producto no encontrado";
      }
      return productoId;
    } catch (error) {
      return error;
    }
  }
  async updateProduct(idU, obj) {
    try {
      const listaDeProductos = await this.getProducts();
      const productoIndex = listaDeProductos.findIndex(
        (producto) => producto.id === idU
      );
      if (productoIndex === -1) {
        return "no hay un producto con ese id";
      }
      const productoM = listaDeProductos[productoIndex];
      listaDeProductos[productoIndex] = { ...productoM, ...obj };
      await fs.promises.writeFile(this.path, JSON.stringify(listaDeProductos));
      return updatedProduct;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(pid) {
    try {
      const listaDeProductos = await this.getProducts();
      const listaNueva = listaDeProductos.filter(
        (productos) => productos.id !== pid
      );
      await fs.promises.writeFile(this.path, JSON.stringify(listaNueva));
    } catch (error) {
      return error;
    }
  }
}
const producto1 = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

async function simuladorProductos() {
  const manager = new ProductManager("../productos.json");
  await manager.addProduct(producto1);
  const productos = await manager.getProducts();
  console.log(productos);
  const productoId = await manager.getProductById();
  console.log(productoId);
  await manager.deleteProduct(1);
  await manager.updateUser(2, modifico2);
}

export default ProductManager;