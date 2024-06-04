import { Request, Response } from 'express';
import serviceUser from '../services/user.service';

const controllerUser = {
  create: async (req: Request, res: Response) => {
    const user = req.body;
    const token = await serviceUser.create(user);
    return res.status(201).json(token);
  },
};

export default controllerUser;