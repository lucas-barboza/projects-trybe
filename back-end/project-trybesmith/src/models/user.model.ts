import { ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import IUser from '../interfaces/user.interface';

const modelUsers = {
  create: async (data: IUser): Promise<IUser> => {
    const query = `INSERT INTO Trybesmith.Users
    (username, classe, level, password) VALUES (?, ?, ?, ?);`;
    const [newUser] = await connection
      .execute<ResultSetHeader>(query, [data.username, data.classe, data.level, data.password]);
    return {
      id: newUser.insertId,
      username: data.username,
      classe: data.classe,
      level: data.level,
      password: data.password,
    };
  },

  getUser: async (username: string): Promise<IUser | null> => {
    const query = 'SELECT * FROM Trybesmith.Users WHERE username = ?';
    const [data] = await connection.execute(query, [username]);
    const [user] = data as IUser[];

    return user || null;
  },
};

export default modelUsers;