import express from 'express';
import UserController from '../controllers/user.controller';
import { validClass, validLevel, validName, validPassword } from '../middlewares/user.validation';

const routerUsers = express.Router();

routerUsers.post(
  '/',
  validName,
  validClass,
  validLevel,
  validPassword,
  UserController.create,
);

export default routerUsers;