import { CommonRoutesConfig } from '../common/common.routes.config';
import authService from './auth.service';
import authMiddleware from './middlewares/auth.middleware';
import express from 'express';
import jwtMiddleware from './middlewares/jwt.middleware';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    this.app.post(
      '/auth',
      authMiddleware.validateEmailPasswordField,
      authMiddleware.verifyUserPassword,
      authService.createJWT
    );

    this.app.post(`/auth/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authService.createJWT
    ]);

    return this.app;
  }
}
