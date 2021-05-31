import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Jwt } from '../../common/types/jwt';
import userDbService from '../../user/user-db.service';
import fastestValidator from '../../../lib/fastest-validator';
import { RefreshTokenRule } from '../validators/jwt.validator';

const jwtSecret: string = process.env.JWT_SECRET!;

class JwtMiddleware {
  verifyRefreshBodyField(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const check = fastestValidator.compile(RefreshTokenRule);

    if (check(req.body) !== true) {
      return res.status(400).send({
        error: 'Validate errors',
        data: check(req.body)
      });
    }

    return next();
  }

  async validRefreshNeeded(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const { email } = res.locals.jwt;
    const user = await userDbService.getUserByEmail(email);
    const salt = crypto.createSecretKey(
      Buffer.from(res.locals.jwt.refreshKey.data)
    );
    const hash = crypto
      .createHmac('sha512', salt)
      .update(res.locals.jwt.userId + jwtSecret)
      .digest('base64');

    if (hash === req.body.refreshToken) {
      req.body = {
        userId: user?.id,
        email: user?.email,
        role: user?.role
      };
      return next();
    }

    return res.status(400).send({ errors: ['Invalid refresh token'] });
  }

  validJWTNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send();
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
          next();
        }
      } catch (err) {
        return res.status(403).send();
      }
    } else {
      return res.status(401).send();
    }
  }
}

export default new JwtMiddleware();
