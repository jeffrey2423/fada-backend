import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import SalaOperaciones from "./routes/SalaOperacionesRouter";
import CopiaLibros from "./routes/CopiaLibrosRouter";
import fileupload from "express-fileupload";

class App {
  private app: Express;
  private config: any;

  constructor(config: any) {
    this.app = express();
    this.config = config;

    this.InitApp();
  }

  public getApp(): Express {
    return this.app;
  }

  private InitApp(): void {
    try {
      this.app.set("port", process.env.PORT || this.config.SERVER_PORT);
      this.InitAppMiddlewares();
      this.InitAppRoutes();
    } catch (error) {
      throw error;
    }
  }

  private InitAppMiddlewares(): void {
    this.InitDevModules();
    this.InitProdModules();
  }

  private InitDevModules(): void {
    this.app.use(morgan("dev"));
  }

  private InitProdModules(): void {
    this.app.use(cors(this.config.application.cors.server)); // Configurar el cors
    this.app.use(express.json()); // for parsing application/json
    this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    this.app.use((_req: Request, res: Response, next: NextFunction) => {
      // Configurar el cors
      res.set(this.config.application.responseHeaders);
      next();
    });
    this.app.use(fileupload()); // Configurar el fileupload
  }

  private InitAppRoutes(): void {
    this.app.use(
      `${this.config.application.BASE_URL}/SalaOperaciones`,
      new SalaOperaciones().getRouter()
    );
    this.app.use(
      `${this.config.application.BASE_URL}/CopiaLibros`,
      new CopiaLibros().getRouter()
    );
  }

  public Listen(): void {
    this.app.listen(this.app.get("port"));
    console.log(`Server on port ${this.app.get("port")}`);
  }
}

export default App;
