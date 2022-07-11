import { Response } from "express";
import Utils from "../utils/Utils";

import CopiaLibrosController from "../controllers/CopiaLibrosController";

class CopiaLibrosServices {
  private copiaLibrosController: CopiaLibrosController;

  constructor() {
   this.copiaLibrosController = new CopiaLibrosController();
  }

  public SolutionDivideAndConquer(req: any, res: Response): void {
    try {

      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res.status(400).send("No se ha enviado ningun archivo");
        return;
      }

      this.copiaLibrosController.InitializeProblemData(req.files?.file.data);

      Utils.SendSolutionFile(
        req,
        res,
        Utils.CreateSolutionFileData("hola", "hola", "hola")
      );
    } catch (error: any) {
      res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public SolutionDynamicProgramming(req: any, res: Response): void {
    try {
      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send("No se ha enviado ningun archivo");
        return;
      }
      this.copiaLibrosController.InitializeProblemData(req.files?.file.data);
      Utils.SendSolutionFile(
        req,
        res,
        Utils.CreateSolutionFileData("hola", "hola", "hola")
      );
    } catch (error: any) {
      res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}

export default CopiaLibrosServices;
