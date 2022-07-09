import { Router } from 'express';
import { IRouter } from '../interfaces/IRouter';

import SalaOperacionesServices from "../services/SalaOperacionesServices";

class SalaOperaciones implements IRouter {

    private router: Router;

    constructor() {
        this.router = Router();
        this.InitRouter();
    }

    public getRouter(): Router {
        return this.router;
    }

    private InitRouter(): void {
        this.HelloWorld();
    }

    private HelloWorld(): void {
        this.router.get('/', (_req, res) => {
            res.send('Hello World');
        });
    }

}

export default SalaOperaciones;