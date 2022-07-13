import { Router } from "express";
import { IRouter } from "../interfaces/IRouter";

import CopiaLibrosServices from "../services/CopiaLibrosServices";

class CopiaLibros implements IRouter {
  private router: Router;
  private copiaLibrosServices: CopiaLibrosServices;

  constructor() {
    this.copiaLibrosServices = new CopiaLibrosServices();
    this.router = Router();
    this.registerRoutes();
  }
  public getRouter(): Router {
    return this.router;
  }
  private registerRoutes(): void {
    this.router
      .route("/SolutionDivideAndConquer")
      .post(
        this.copiaLibrosServices.SolucionRecursiva.bind(
          this.copiaLibrosServices
        )
      ); //Se agrega el this porque la instancia original se estaba perdiendo al ser llamado desde una funcion tercera

    this.router
      .route("/SolutionDynamicProgramming")
      .post(
        this.copiaLibrosServices.SolucionDinamica.bind(
          this.copiaLibrosServices
        )
      );
  }
}

export default CopiaLibros;
