import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import userService from './services/user.service';
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

    this.app
      .route('/users/:userId')
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`Get requested for Id: ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for Id: ${req.params.userId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id: ${req.params.userId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for Id: ${req.params.userId}`);
      });

    return this.app;
  }
}
