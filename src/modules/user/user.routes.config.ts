import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import userService from './user.service';
import userMiddleware from './middleware/user.middleware';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/users')
      .get(userService.listUsers)
      .post(
        userMiddleware.validateRequiredUserBodyFields,
        userMiddleware.validateSameEmailDoesntExist,
        userService.createUser
      );

    this.app.param('userId', userMiddleware.extractUserId);

    this.app
      .route('/users/:userId')
      .all(userMiddleware.validateUserExists)
      .get(userService.getUserById)
      .delete(userService.removeUser);

    this.app
      .route('/users/:userId')
      .put(
        userMiddleware.validateRequiredUserBodyFields,
        userMiddleware.validateSameEmailBelongToSameUser,
        userService.updateUser
      )
      .patch(
        userMiddleware.validateRequiredUserBodyFields,
        userMiddleware.validateSameEmailBelongToSameUser,
        userService.updateUser
      );

    return this.app;
  }
}
