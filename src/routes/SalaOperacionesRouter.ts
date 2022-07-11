import { Router } from "express";
import { IRouter } from "../interfaces/IRouter";

import SalaOperacionesServices from "../services/SalaOperacionesServices";

class CopiaLibros implements IRouter {
  private router: Router;
  private salaOperacionesServices: SalaOperacionesServices;

  constructor() {
    this.salaOperacionesServices = new SalaOperacionesServices();
    this.router = Router();
    this.registerRoutes();
  }
  public getRouter(): Router {
    return this.router;
  }
  private registerRoutes(): void {
    this.router
      .route("/SolucionRecursiva")
      .post(
        this.salaOperacionesServices.SolucionRecursiva.bind(
          this.salaOperacionesServices
        )
      ); //Se agrega el this porque la instancia original se estaba perdiendo al ser llamado desde una funcion tercera

    this.router
      .route("/SolucionDinamica")
      .post(
        this.salaOperacionesServices.SolucionDinamica.bind(
          this.salaOperacionesServices
        )
      );
  }
}

export default CopiaLibros;
