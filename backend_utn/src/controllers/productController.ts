// FUNCIONES QUE SANITIZAN DATOS DE ENTRADA Y RESPONDEN AL CLIENTE
// LA REQUEST Y EL RESPONSE SIEMPRE ESTARÁN SOLO EN LOS CONTROLLERS

import { Request, Response } from "express"
import { Types } from "mongoose"
import * as productService from "../services/productService";
import { createProductSchema, updatedProductSchema } from "../validators/productValidator"
import { productQuerySchema } from "../validators/productQueryValidator";



class ProductController {
  static getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const validator = productQuerySchema.safeParse(req.query);

    if (!validator.success) {
      res.status(400).json({
        success: false,
        error: validator.error.flatten().fieldErrors
      });
      return;
    }
      const { name, stock, category, minPrice, maxPrice } = validator.data;

      const filter:Record<string, any> = {}

      if (name) filter.name = new RegExp(String(name), "i")
      if (stock) filter.stock = Number(stock)
      if (category) filter.category = new RegExp(String(category), "i")
      if (minPrice || maxPrice) {
        filter.price = {}
        // maxPrice -> si tengo precio máximo quiero un objeto con un precio menor
        if (minPrice) filter.price.$gte = Number(minPrice)
        // minPrice -> si tengo un precio mínimo quiero un objeto con un precio mas grande.
        if (maxPrice) filter.price.$lte = Number(maxPrice)
      }

      const products = await productService.getAllProducts(filter);
      res.json({ success: true, data: products });
    } catch (e) {
      res.status(500).json({ success: false, error: (e as Error).message });
    }
  };

  static getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, error: "ID inválido" });
        return;
      }

      const product = await productService.getProductById(id);

      if (!product) {
        res.status(404).json({ success: false, error: "Producto no encontrado" });
        return;
      }

      res.json({ success: true, data: product });
    } catch (e) {
      res.status(500).json({ success: false, error: (e as Error).message });
    }
  };

  static addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { body, file } = req;

      const dataToValidate = {
        ...body,
        stock: Number(body.stock),
        price: Number(body.price),
        image: file?.path
      };

      const validator = createProductSchema.safeParse(dataToValidate);

      if (!validator.success) {
        res.status(400).json({
          success: false,
          error: validator.error.flatten().fieldErrors
        });
        return;
      }

      const newProduct = await productService.createProduct(validator.data);
      res.status(201).json({ success: true, data: newProduct });
    } catch (e) {
      res.status(500).json({ success: false, error: (e as Error).message });
    }
  };

  static updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, error: "ID inválido" });
        return;
      }

      const validator = updatedProductSchema.safeParse(req.body);

      if (!validator.success) {
        res.status(400).json({
          success: false,
          error: validator.error.flatten().fieldErrors
        });
        return;
      }

      const updatedProduct = await productService.updateProduct(id, validator.data);

      if (!updatedProduct) {
        res.status(404).json({ success: false, error: "Producto no encontrado" });
        return;
      }

      res.json({ success: true, data: updatedProduct });
    } catch (e) {
      res.status(500).json({ success: false, error: (e as Error).message });
    }
  };

  static deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, error: "ID inválido" });
        return;
      }

      const deletedProduct = await productService.deleteProduct(id);

      if (!deletedProduct) {
        res.status(404).json({ success: false, error: "Producto no encontrado" });
        return;
      }

      res.json({ success: true, data: deletedProduct });
    } catch (e) {
      res.status(500).json({ success: false, error: (e as Error).message });
    }
  };
}

export default ProductController;