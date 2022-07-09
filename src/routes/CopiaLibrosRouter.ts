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
        this.router.route('/')
            .post(this.copiaLibrosServices.SolutionDivideAndConquer);
    }
}

export default CopiaLibros;