import express from 'express';
import debug from 'debug';
import postDbService from './post-db.service';
import { Post } from '@prisma/client';

const log: debug.IDebugger = debug('app:post-service');

class PostService {
  async list(req: express.Request, res: express.Response) {
    const limit = +(req.query?.limit || 50);
    const page = +(req.query?.page || 1);
    const posts = await postDbService.list(limit, page);

    res.status(200).send(posts);
  }

  async storePost(req: express.Request, res: express.Response) {
    let post: Post;
    log((post = await postDbService.create(req.body)));
    res.status(201).send(post);
  }

  async getPostById(req: express.Request, res: express.Response) {
    const postId = req.body.id;
    const post = await postDbService.findById(postId);

    res.status(200).send(post);
  }

  async updatePost(req: express.Request, res: express.Response) {
    let post: Post;
    log((post = await postDbService.updateById(req.body.id, req.body)));
    res.status(200).send(post);
  }

  async removePost(req: express.Request, res: express.Response) {
    log(await postDbService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new PostService();
