import { Request, Response } from 'express';
import serviceLogin from '../services/login.service';

const login = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const { code, message, token } = await serviceLogin.login(username, password);

    if (message) return res.status(code).json({ message });

    req.headers.authorization = token;

    res.status(code).json({ token });
  },
};

export default login;