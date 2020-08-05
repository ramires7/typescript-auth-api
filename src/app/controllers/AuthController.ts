import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class AuthController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const repository = getRepository(User);

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    delete user.password;

    return res.json({ user, token });
  }
}

export default new AuthController();