import { config } from 'dotenv';
config();

import cors from 'cors';
import express from 'express';
import { envs } from './core/config';
import router from './core/routes';
import { logger } from './core/utils/logger';

class Server {
  private readonly app = express();
  private readonly port: number;

  constructor({ port }: { port: number }) {
    this.port = port;

    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configureRoutes(): void {
    this.app.use('/api/v1/', router);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server is running on port ${this.port}`);
    });
  }
}

const port = envs.PORT;

new Server({ port }).start();
