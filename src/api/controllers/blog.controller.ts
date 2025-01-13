import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { HttpStatus } from '../enums/http-status.js';
import UsersService from '../services/users.service.js';
import BlogService from '../services/blog.service.js';
import { Pagination } from 'api/interfaces/common.interface.js';

export default class BlogController {
  private userService: UsersService;
  private blogService: BlogService;
  constructor() {
    this.userService = new UsersService();
    this.blogService = new BlogService();
  }

  async getAllBlogs(req: Request, res: Response) {
    try {
      const count = parseInt(req.query.count as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const orderBy = (req.query.orderBy as string) || 'createdAt';
      const sort = (req.query.sort as 'ASC' | 'DESC') || 'DESC';
      const search = req.query.search as string;
      const options: Pagination = {
        limit: count,
        offset: page * count,
        order: [[orderBy, sort]],
      };
      const blogs = await this.blogService.findAll(options, search);
      return res.status(HttpStatus.OK).json({
        success: false,
        message: 'Blogs Fetched Successfully',
        data: blogs,
      });
    } catch (error: any) {
      console.error('controller:blog:getAllBlogs:catch', {
        stack: error.stack,
        message: error.message,
      });
      return res.status(HttpStatus.InternalServerError).json({
        success: false,
        error: error.message,
        data: {},
      });
    }
  }

  async getBlog(req: Request, res: Response) {
    try {
      const blog = await this.blogService.findOne(req.params.id);
      return res.status(HttpStatus.Created).json({
        success: false,
        message: 'Blog Fetched Successfully',
        data: blog,
      });
    } catch (error: any) {
      console.error('controller:blog:getBLog:catch', {
        stack: error.stack,
        message: error.message,
      });
      return res.status(HttpStatus.InternalServerError).json({
        success: false,
        error: error.message,
        data: {},
      });
    }
  }

  async createBlog(req: Request, res: Response) {
    try {
      const newBlog = await this.blogService.create(req.body);
      return res.status(HttpStatus.Created).json({
        success: false,
        message: 'Blog Created Successfully',
        data: newBlog,
      });
    } catch (error: any) {
      console.error('controller:blog:createBlog:catch', {
        stack: error.stack,
        message: error.message,
      });
      return res.status(HttpStatus.InternalServerError).json({
        success: false,
        error: error.message,
        data: {},
      });
    }
  }

  async updateBlog(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const blog = await this.blogService.findOne(req.params.id);
      if (!blog) {
        return res.status(HttpStatus.NotFound).json({
          success: false,
          message: 'Blog Does Not Exists',
          data: {},
        });
      }
      await this.blogService.update({ title, content }, { id: req.params.id });
      return res.status(HttpStatus.OK).json({
        success: false,
        message: 'Blog Updated Successfully',
        data: {},
      });
    } catch (error: any) {
      console.error('controller:blog:updateBlog:catch', {
        stack: error.stack,
        message: error.message,
      });
      return res.status(HttpStatus.InternalServerError).json({
        success: false,
        error: error.message,
        data: {},
      });
    }
  }

  async deleteBlog(req: Request, res: Response) {
    try {
      const blog = await this.blogService.findOne(req.params.id);
      if (!blog) {
        return res.status(HttpStatus.NotFound).json({
          success: false,
          message: 'Blog Does Not Exists',
          data: {},
        });
      }
      await this.blogService.delete(req.params.id);
      return res.status(HttpStatus.OK).json({
        success: false,
        message: 'Blog Deleted Successfully',
        data: {},
      });
    } catch (error: any) {
      console.error('controller:blog:deleteBlog:catch', {
        stack: error.stack,
        message: error.message,
      });
      return res.status(HttpStatus.InternalServerError).json({
        success: false,
        error: error.message,
        data: {},
      });
    }
  }
}
