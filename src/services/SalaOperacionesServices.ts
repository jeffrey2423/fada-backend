import Utils from "../utils/Utils";
import { Response } from "express";

import SalaOperacionesController from "../controllers/SalaOperacionesController";

class SalaOperacionesServices {
  private salaOperacionescontroller!: SalaOperacionesController;

  constructor() {
    this.salaOperacionescontroller = new SalaOperacionesController();
  }

  public SolucionRecursiva(req: any, res: Response): void {
    try {
      this.salaOperacionescontroller = new SalaOperacionesController();

      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res
          .status(Utils.HTTPStatus.BAD_REQUEST)
          .send("No se ha enviado ningun archivo");
        return;
      }
      this.salaOperacionescontroller.InitializeProblemData(
        req.files?.file.data
      );
      this.salaOperacionescontroller.LlamarSolucionRecursiva();
      Utils.SendSolutionFile(
        req,
        res,
        this.salaOperacionescontroller.getSolutionFileData(),
        "RecursivaSalaOperaciones"
      );
    } catch (error: any) {
      res.json({error_message:error.message, error_status:true});
    }
  }

  public SolucionDinamica(req: any, res: Response): void {
    try {
      this.salaOperacionescontroller = new SalaOperacionesController();

      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res
          .status(Utils.HTTPStatus.BAD_REQUEST)
          .send("No se ha enviado ningun archivo");
        return;
      }
      this.salaOperacionescontroller.InitializeProblemData(
        req.files?.file.data
      );
      this.salaOperacionescontroller.LlamarSolucionDinamica();
      Utils.SendSolutionFile(
        req,
        res,
        this.salaOperacionescontroller.getSolutionFileData(),
        "DinamicaSalaOperaciones"
      );
    } catch (error: any) {
      res.json({error_message:error.message, error_status:true});
    }
  }
}
export default SalaOperacionesServices;
