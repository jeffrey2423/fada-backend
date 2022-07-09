import Utils from "../utils/Utils";
import { Response } from "express";
import { IProcedimiento } from "../interfaces/IProcedimiento";

import SalaOperacionesController from "../controllers/SalaOperacionesController"

class SalaOperacionesServices {
  private salaOperacionescontroller: SalaOperacionesController;

  constructor() {
    this.salaOperacionescontroller = new SalaOperacionesController();
  }

  /**
   * Soluciona el problema de la sala de operaciones usando el algoritmo de divide y vencerás
   * @param req  Solicitud de la peticion
   * @param res  Respuesta de la peticion
   */
  public SolutionDivideAndConquer(req: any, res: Response): void {
    try {
      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res.status(Utils.HTTPStatus.BAD_REQUEST).send("No se ha enviado ningun archivo");
        return;
      }
      this.salaOperacionescontroller.InitializeProblemData(req.files?.file.data);
      Utils.SendSolutionFile(
        req,
        res,
        Utils.CreateSolutionFileData("hola", "hola", "hola")
      );
    } catch (error: any) {
      res.status(Utils.HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  /**
   * Soluciona el problema de la sala de operaciones usando el algoritmo de programacion dinamica
   * @param req Solicitud de la peticion
   * @param res Respuesta de la peticion
   */
  public SolutionDynamicProgramming(req: any, res: Response): void {
    try {
      if (Utils.IsUndefinedOrNullOrEmptyOrFalse(req.files?.file)) {
        res.status(Utils.HTTPStatus.BAD_REQUEST).send("No se ha enviado ningun archivo");
        return;
      }
      this.salaOperacionescontroller.InitializeProblemData(req.files?.file.data);
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
export default SalaOperacionesServices;
