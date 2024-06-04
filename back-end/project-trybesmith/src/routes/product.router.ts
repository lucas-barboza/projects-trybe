import express from 'express';
import controllerProducts from '../controllers/product.controller';
import { validName, validAmount } from '../middlewares/product.validation';

const routerProducts = express.Router();

routerProducts
  .route('/')
  .get(controllerProducts.getProducts)
  .post(validName, validAmount, controllerProducts.create);

export default routerProducts;