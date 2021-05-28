import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import postService from './post.service';
import postMiddleware from './middlewares/post.middleware';

export class PostsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'PostsRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/posts')
      .get(postService.list)
      .post(
        postMiddleware.validateRequiredPostBodyFields,
        postMiddleware.validatePatchSlug,
        postService.storePost
      );

    this.app.param('postId', postMiddleware.extractPostId);

    this.app
      .route('/posts/:postId')
      .get(postService.getPostById)
      .delete(postService.removePost);

    this.app
      .route('/posts/:postId')
      .put(postService.updatePost)
      .patch(postService.updatePost);

    return this.app;
  }
}
