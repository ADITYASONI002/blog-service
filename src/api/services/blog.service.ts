import { Blog, DbBlog } from '../interfaces/blog.interface.js';
import DatabaseLoader from '../../loaders/database.loader.js';
import { Pagination } from 'api/interfaces/common.interface.js';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

export default class BLogService {
  private dbInstance: ReturnType<typeof DatabaseLoader.getInstance>;
  constructor() {
    this.dbInstance = DatabaseLoader.getInstance();
  }
  async findAll(
    options: Pagination,
    search: string | null = null,
    query: { [key: string]: any } = {}
  ) {
    const { Blogs, Users } = this.dbInstance;
    const searchQuery = search
      ? {
          [Op.or]: [
            sequelize.literal(`LOWER(Blogs.title) LIKE LOWER("%${search}%")`),
            sequelize.literal(`LOWER(User.fullName) LIKE LOWER("%${search}%")`),
          ],
        }
      : {};
    return Blogs.findAndCountAll({
      attributes: [
        'id',
        'title',
        'content',
        'likes',
        'createdAt',
        [sequelize.col('User.fullName'), 'author'],
      ],
      where: { ...query, ...searchQuery },
      ...options,
      raw: true,
      include: [
        {
          model: Users,
          attributes: [],
        },
      ],
    });
  }

  async findOne(id: string) {
    const { Blogs } = this.dbInstance;
    return Blogs.findOne({ where: { id } });
  }

  async create(blog: Blog): Promise<DbBlog> {
    const { Blogs } = this.dbInstance;
    return Blogs.create(blog);
  }

  async update(data: { [key: string]: any }, query: { id: string }) {
    const { Blogs } = this.dbInstance;
    return Blogs.update(data, { where: query });
  }

  async delete(id: string) {
    const { Blogs } = this.dbInstance;
    return Blogs.destroy({ where: { id } });
  }
}
