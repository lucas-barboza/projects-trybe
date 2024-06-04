import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import IProduct from '../interfaces/product.interface';

interface DataPacket extends IProduct, RowDataPacket{}

const modelProducts = {
  create: async ({ name, amount }: IProduct): Promise<IProduct> => {
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)';
    const [{ insertId }] = await
    connection.query<ResultSetHeader>(query, [name, amount]);

    return { id: insertId, name, amount };
  },
  getProducts: async (): Promise<DataPacket[]> => {
    const query = 'SELECT * FROM Trybesmith.Products;';
    const [products] = await connection.query<DataPacket[]>(query);

    return products;
  },
  update: async (productId: number, orderId: number): Promise<void> => {
    const query = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?;';
    await connection.execute(query, [orderId, productId]);
  },
};

export default modelProducts;