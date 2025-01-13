import { DbUser} from '../interfaces/users.interface.js';
import DatabaseLoader from '../../loaders/database.loader.js';

export default class UsersService {
  private dbInstance: ReturnType<typeof DatabaseLoader.getInstance>;
  constructor() {
    this.dbInstance = DatabaseLoader.getInstance();
  }

  async find(query: { [key: string]: any }): Promise<DbUser | null> {
    const { Users } = this.dbInstance;
    return Users.findOne({ where: query });
  }
}
