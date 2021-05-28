import express from 'express';
import fastestValidator from '../../../lib/fastest-validator';
import { CreatePostRule } from '../validators/post.validator';

class PostMiddleware {
  async extractPostId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = +req.params.postId;
    next();
  }

  async validateRequiredPostBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log('body >> ', req.body);
    console.log('rule >> ', CreatePostRule);
    const check = fastestValidator.compile(CreatePostRule);
    check(req.body);

    if (check(req.body)) {
      next();
    } else {
      res.send('xxx');
    }
  }
}

export default new PostMiddleware();
