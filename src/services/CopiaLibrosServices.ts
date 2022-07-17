import { Response } from "express";
import Utils from "../utils/Utils";

import CopiaLibrosController from "../controllers/CopiaLibrosController";

class CopiaLibrosServices {
  private copiaLibrosController!: CopiaLibrosController;

  constructor() {
   this.copiaLibrosController = new CopiaLibrosController();
  }

  public SolucionRecursiva(req: any, res: Response): void {
    try {

      this.copiaLibrosController = new CopiaLibrosController();

      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res.status(400).send("No se ha enviado ningun archivo");
        return;
      }
      this.copiaLibrosController.InitializeProblemData(req.files?.file.data);
      this.copiaLibrosController.LlamarSolucionGreedyPartition();
      Utils.SendSolutionFile(
        req,
        res,
        this.copiaLibrosController.getSolutionFileData(),
        "RecursivaCopiaLibros"
      );
    } catch (error: any) {
      res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public SolucionDinamica(req: any, res: Response): void {
    try {

      this.copiaLibrosController = new CopiaLibrosController();

      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send("No se ha enviado ningun archivo");
        return;
      }
      this.copiaLibrosController.InitializeProblemData(req.files?.file.data);
      this.copiaLibrosController.LlamarSolucionDinamica();
      Utils.SendSolutionFile(
        req,
        res,
        this.copiaLibrosController.getSolutionFileData(),
        "DinamicaCopiaLibros"
      );
    } catch (error: any) {
      res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}

export default CopiaLibrosServices;
