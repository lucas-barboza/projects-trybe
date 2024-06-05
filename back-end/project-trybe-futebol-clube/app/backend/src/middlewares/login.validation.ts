import { NextFunction, Request, Response } from 'express';
import jwtUtils from '../utils/jwt.utils';

class loginValidation {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!regexEmail.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const verifyToken = jwtUtils.validateToken(authorization);

    if (!verifyToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.body.token = verifyToken;

    return next();
  }
}

export default loginValidation;
