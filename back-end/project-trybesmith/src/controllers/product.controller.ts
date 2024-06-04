import { Request, Response } from 'express';
import servicesProducts from '../services/product.service';

const controllerProducts = {
  create: async (req: Request, res: Response): Promise<Response> => {
    const product = await servicesProducts.create(req.body);
    return res.status(201).json(product);
  },
  getProducts: async (req: Request, res: Response): Promise<Response> => {
    const products = await servicesProducts.getProducts();
    return res.status(200).json(products);
  },
};

export default controllerProducts;