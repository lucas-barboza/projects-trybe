import express from 'express';
import orderController from '../controllers/order.controller';

const routerOrder = express.Router();

routerOrder
  .route('/')
  .get(orderController.getAll)
  .post(orderController.create);

export default routerOrder;