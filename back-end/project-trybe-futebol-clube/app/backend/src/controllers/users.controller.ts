import { Request, Response } from 'express';
import UsersService from '../services/users.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) { }

  public async findUserByEmail(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.usersService.getUserByEmail(email, password);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
  }

  public async findUserRole(req: Request, res: Response) {
    const { token } = req.body;

    const serviceResponse = await this.usersService.getUserRole(token.email);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
