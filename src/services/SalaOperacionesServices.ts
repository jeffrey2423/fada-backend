import Utils from "../utils/Utils";
import { Response } from "express";
import { IProcedimiento } from "../interfaces/IProcedimiento";

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
      res.send(this.salaOperacionescontroller.getSolutionFileData());
      // Utils.SendSolutionFile(
      //   req,
      //   res,
      //   this.salaOperacionescontroller.getSolutionFileData()
      // );
    } catch (error: any) {
      res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
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
      res.send(this.salaOperacionescontroller.getSolutionFileData());

      // Utils.SendSolutionFile(
      //   req,
      //   res,
      //   Utils.CreateSolutionFileData("hola", "hola", "hola")
      // );
    } catch (error: any) {
      res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
export default SalaOperacionesServices;
