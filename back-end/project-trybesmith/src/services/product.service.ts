import IProduct from '../interfaces/product.interface';
import modelProducts from '../models/product.model';

const servicesProducts = {
  create: async (body: IProduct): Promise<IProduct> => {
    const product = await modelProducts.create(body);

    return product;
  },
  getProducts: async (): Promise<IProduct[]> => {
    const products = await modelProducts.getProducts();

    return products;
  },
};

export default servicesProducts;