import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
  async index(req: Request, res: Response) {
    return res.send({ userId: req.userId });
  }

  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const repository = getRepository(User);

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({ email, password });
    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();