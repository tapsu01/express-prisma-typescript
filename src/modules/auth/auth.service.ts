import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const log: debug.IDebugger = debug('app:auth-service');
const jwtSecret: string = process.env.JWT_SECRET!;
const tokenExpirationInSeconds = 36000;

class AuthService {
  async createJWT(req: express.Request, res: express.Response) {
    try {
      const refreshId = `${req.body.userId}${jwtSecret}`;
      const salt = crypto.createSecretKey(crypto.randomBytes(16));
      const hash = crypto
        .createHmac('sha512', salt)
        .update(refreshId)
        .digest('base64');
      req.body.refreshKey = salt.export();
      const token = jwt.sign(req.body, jwtSecret, {
        expiresIn: tokenExpirationInSeconds
      });

      res.status(201).send({ accessToken: token, refreshToken: hash });
    } catch (err) {
      console.log('createJWT error: ', err);
      res.status(500).send();
    }
  }
}

export default new AuthService();
