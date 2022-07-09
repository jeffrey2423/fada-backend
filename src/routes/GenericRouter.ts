import { Router } from "express";

class GenericRouter{

    private router: Router;

    constructor(){
        this.router = Router();
        this.registerRoutes();
    }

    public getRouter():Router{
        return this.router;
    }
    private registerRoutes():void {

    }
}

export default GenericRouter;