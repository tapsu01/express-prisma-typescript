/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { CommonRoutesConfig } from './modules/common/common.routes.config';
import { UsersRoutes } from './modules/user/user.routes.config';
import { PostsRoutes } from './modules/post/post.routes.config';

const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${NODE_ENV}` });

/**
 * App Variables
 */
const port: number = +(process.env.PORT || 3000);
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  )
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

/**
 * App Configuration
 */
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(expressWinston.logger(loggerOptions));

/**
 * Routes Definitions
 */
routes.push(new UsersRoutes(app));
routes.push(new PostsRoutes(app));

/**
 * Server Activation
 */
server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(`Server running at http://localhost:${port}`);
});

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;
interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
