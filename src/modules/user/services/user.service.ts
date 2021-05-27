import express from 'express';
import debug from 'debug';
import userDbService from '../models/user-db.service';

const log: debug.IDebugger = debug('app:user-service');

class UserService {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await userDbService.list(100, 0);
    res.status(200).send(users);
  }

  async createUser(req: express.Request, res: express.Response) {
    const user = await userDbService.create(req.body);
    res.status(201).send({ id: user.id });
  }
}

export default new UserService();
