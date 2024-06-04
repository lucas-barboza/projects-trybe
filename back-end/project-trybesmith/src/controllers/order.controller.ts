import { Request, Response } from 'express';
import serviceOrder from '../services/order.service';

const getOrder = {
  getAll: async (req: Request, res: Response) => {
    const result = await serviceOrder.getAll();

    return res.status(200).json(result);
  },
  create: async (req: Request, res: Response) => {
    const { productsIds } = req.body;
    const { authorization } = req.headers;

    const result = await serviceOrder.create(productsIds, authorization);
    const { code, data, message } = result as { code: number, data?: object, message?: string };

    if (message) return res.status(code).json({ message });

    res.status(code).json(data);
  },
};

export default getOrder;