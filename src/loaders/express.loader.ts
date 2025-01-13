import express, { Express, json, urlencoded } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import config from '../config/index.js';
import BlogRouter from '../api/routes/blog.routes.js';
import requestLogger from '../logger/logger.js';
export default class ExpressLoader {
  public app: Express;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
  }
  initializeMiddlewares() {
    this.app.use(morgan('dev'));
    this.app.use(
      cors({
        origin: config.allowedOrigin,
        methods: 'GET, POST, PUT, PATCH, DELETE',
        allowedHeaders: 'Authorization, Content-Type',
      })
    );
    this.app.use(helmet());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message:
          'Too many requests from this IP, please try again after 15 minutes',
      })
    );
    this.app.use((req, res, next) => requestLogger(req, res, next));
  }
  loadRoutes() {
    const blogRouter = new BlogRouter();
    this.app.use(config.baseUrl, blogRouter.router);
  }
}
