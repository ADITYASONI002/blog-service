import config from './config/index.js';
import ExpressLoader from './loaders/express.loader.js';
import DatabaseLoader from './loaders/database.loader.js';

class Server {
  private expressLoader;
  private port = config.port;
  constructor() {
    this.expressLoader = new ExpressLoader();
  }
  async startServer() {
    await DatabaseLoader.connectDb();
    this.expressLoader.loadRoutes();
    this.expressLoader.app.listen(this.port, () =>
      console.log(`Blog service server started on port : ${this.port}`)
    );
  }
}

const server = new Server();
server.startServer();
