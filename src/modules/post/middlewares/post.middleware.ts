import express from 'express';
import slug from 'slug';
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

  async validatePatchSlug(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.body.slug) {
      req.body.slug = slug(req.body.title);
    }
    next();
  }

  async validateRequiredPostBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const check = fastestValidator.compile(CreatePostRule);

    if (typeof check(req.body) !== 'boolean') {
      res.status(400).send({
        error: 'Validate errors',
        data: check(req.body)
      });
    } else {
      next();
    }
  }
}

export default new PostMiddleware();
