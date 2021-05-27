import express from 'express';
import debug from 'debug';
import userDbService from './user-db.service';

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

  async updateUser(req: express.Request, res: express.Response) {
    // TODO: Hash password
    log(await userDbService.updateById(req.body.id, req.body));
    res.status(200).send();
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await userDbService.findById(req.body.id);
    res.status(200).send(user);
  }

  async removeUser(req: express.Request, res: express.Response) {
    // req.body.passwordHash
    //  TODO: hash password
    log(await userDbService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new UserService();
