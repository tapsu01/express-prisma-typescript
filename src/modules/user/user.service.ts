import express from 'express';
import debug from 'debug';
import argon2 from 'argon2';
import userDbService from './user-db.service';

const log: debug.IDebugger = debug('app:user-service');

class UserService {
  async listUsers(req: express.Request, res: express.Response) {
    const limit = +(req.query?.limit || 50);
    const page = +(req.query?.page || 1);
    const users = await userDbService.list(limit, page);
    res.status(200).send(users);
  }

  async createUser(req: express.Request, res: express.Response) {
    res.render(`user/create`);
  }

  async storeUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const user = await userDbService.create(req.body);
    res.status(201).send({ id: user.id });
  }

  async updateUser(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }

    const { id: userId, ...resource } = req.body;
    let user;
    log((user = await userDbService.updateById(userId, resource)));
    res.status(200).send(user);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const { id: userId } = req.body;
    const user = await userDbService.findById(userId);
    res.status(200).send(user);
  }

  async removeUser(req: express.Request, res: express.Response) {
    const { id: userId } = req.body;
    log(await userDbService.deleteById(userId));
    res.status(204).send();
  }
}

export default new UserService();
