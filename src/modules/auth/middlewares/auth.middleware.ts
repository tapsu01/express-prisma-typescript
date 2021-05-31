import express, { NextFunction } from 'express';
import userDbService from '../../user/user-db.service';
import fastestValidator from '../../../lib/fastest-validator';
import { AuthEmailPasswordRule } from '../validators/auth.validator';
import * as argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:auth-middleware');

class AuthMiddleware {
  async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const { email, password } = req.body;
    const user = await userDbService.getUserByEmail(email);
    if (user) {
      const passwordHash = user.password!;
      if (await argon2.verify(passwordHash, password)) {
        req.body = {
          userId: user.id,
          email: user.email,
          role: user.role
        };
        return next();
      }
    }
    res.status(400).send({ error: ['Invalid email and/or password'] });
  }

  async validateEmailPasswordField(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const check = fastestValidator.compile(AuthEmailPasswordRule);

    if (check(req.body) !== true) {
      res.status(400).send({
        error: 'Validate errors',
        data: check(req.body)
      });
    } else {
      return next();
    }
  }
}

export default new AuthMiddleware();
