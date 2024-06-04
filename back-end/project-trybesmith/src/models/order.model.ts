import { RowDataPacket } from 'mysql2';
import IOrder from '../interfaces/order.interface';
import connection from './connection';

const getOrder = {
  getAll: async (): Promise<IOrder[]> => {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) as productsIds
      FROM Trybesmith.Orders AS o INNER JOIN Trybesmith.Products as p ON o.id = p.orderId
      GROUP BY id ORDER BY userId`,
    );
    return rows as IOrder[];
  },
  create: async (userId: number) => {
    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?);';
    const [result] = await connection.execute(query, [userId]);
    const { insertId: id } = result as { insertId: number };

    return id;
  },
};

export default getOrder;