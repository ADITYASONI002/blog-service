import { Request, Response, Router } from 'express';
import {
  blogSchema,
  blogUpdateSchema,
  querySchema,
} from '../middlewares/validators.js';
import BlogController from '../controllers/blog.controller.js';
import { HttpStatus } from '../enums/http-status.js';

export default class BlogRouter {
  public router: Router;
  private blogController: BlogController;
  constructor() {
    this.router = Router();
    this.initializedRoutes();

    this.blogController = new BlogController();
  }
  private initializedRoutes() {
    this.router.get('/', (req: Request, res: Response) => {
      querySchema
        .validateAsync(req.query)
        .then(() => {
          return this.blogController.getAllBlogs(req, res);
        })
        .catch((error: Error) => {
          console.error('router:blog:getAllBlogs:catch', error);
          return res
            .status(HttpStatus.BadRequest)
            .json({ success: false, error: error.message, data: {} });
        });
    });

    this.router.get('/:id', (req: Request, res: Response) => {
      this.blogController.getBlog(req, res);
    });

    this.router.post('/', (req: Request, res: Response) => {
      blogSchema
        .validateAsync(req.body, { convert: false })
        .then(() => {
          return this.blogController.createBlog(req, res);
        })
        .catch((error: Error) => {
          console.error('router:blog:create:catch', error);
          return res
            .status(HttpStatus.BadRequest)
            .json({ success: false, error: error.message, data: {} });
        });
    });

    this.router.put('/:id', (req: Request, res: Response) => {
      blogUpdateSchema
        .validateAsync(req.body, { convert: false })
        .then(() => {
          return this.blogController.updateBlog(req, res);
        })
        .catch((error: Error) => {
          console.error('router:blog:update-blog:catch', error);
          return res
            .status(HttpStatus.BadRequest)
            .json({ success: false, error: error.message, data: {} });
        });
    });

    this.router.delete('/:id', (req: Request, res: Response) => {
      this.blogController.deleteBlog(req, res);
    });
  }
}
