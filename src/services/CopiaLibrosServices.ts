import { Response } from "express";
import Utils from "../utils/Utils";

import CopiaLibrosController from "../controllers/CopiaLibrosController";

class CopiaLibrosServices {
  private copiaLibrosController: CopiaLibrosController;

  constructor() {
   this.copiaLibrosController = new CopiaLibrosController();
  }

  public SolucionRecursiva(req: any, res: Response): void {
    try {

      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res.status(400).send("No se ha enviado ningun archivo");
        return;
      }

      this.copiaLibrosController.InitializeProblemData(req.files?.file.data);

      Utils.SendSolutionFile(
        req,
        res,
        "",
        "RecursivaCopiaLibros"
      );
    } catch (error: any) {
      res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public SolucionDinamica(req: any, res: Response): void {
    try {
      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send("No se ha enviado ningun archivo");
        return;
      }
      this.copiaLibrosController.InitializeProblemData(req.files?.file.data);
      Utils.SendSolutionFile(
        req,
        res,
       '',
       "DinamicaCopiaLibros"
      );
    } catch (error: any) {
      res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}

export default CopiaLibrosServices;
