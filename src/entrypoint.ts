/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${NODE_ENV}` });

/**
 * App Variables
 */
const PORT: number = +(process.env.PORT || 3000);
const app = express();

/**
 * App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Routes Definitions
 */

/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
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
