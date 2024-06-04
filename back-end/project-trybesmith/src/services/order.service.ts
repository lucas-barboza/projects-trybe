import modelOrder from '../models/order.model';
import validToken from '../middlewares/token.validation';
import orderTs from '../middlewares/order.middleware';
import modelProducts from '../models/product.model';

const getAll = {
  getAll: async () => {
    const result = await modelOrder.getAll();
    return result;
  },
  create: async (productsIds: number[], authorization: string | undefined) => {
    const tokenValidation = validToken(authorization);
    const { id } = tokenValidation;

    if (!id) {
      const { code, message } = tokenValidation;
      return { code, message };
    }

    const { error } = orderTs.validate({ productsIds });

    if (error) {
      const requiredError = error.message.includes('required');

      if (requiredError) {
        return { code: 400, message: error.message };
      }

      return { code: 422, message: error.message };
    }

    const orderId = await modelOrder.create(id);
    await Promise.all(productsIds.map((pId) => modelProducts.update(pId, orderId)));

    return { code: 201, data: { userId: id, productsIds } };
  },
};

export default getAll;