import Utils from "../utils/Utils";
import { Response } from "express";
import { IProcedimiento } from "../interfaces/IProcedimiento";
class SalaOperacionesServices {
  private problemData: string;
  private problemDataArray: string[];
  private procedimientos: IProcedimiento[];
  private cantidadProcedimientos: number;

  constructor() {
    this.problemData = "";
    this.problemDataArray = [];
    this.procedimientos = [];
    this.cantidadProcedimientos = 0;
  }

  //#region DIVIDE Y CONQUISTAR
  /**
   * Soluciona el problema de la sala de operaciones usando el algoritmo de divide y vencerás
   * @param req  Solicitud de la peticion
   * @param res  Respuesta de la peticion
   */
  public SolutionDivideAndConquer(req: any, res: Response): void {
    try {
      this.InitializeProblemData(req.files?.file.data);
      res.json("Hola");
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  //#region PROGRAMACION DINAMICA
  /**
   * Soluciona el problema de la sala de operaciones usando el algoritmo de programacion dinamica
   * @param req Solicitud de la peticion
   * @param res Respuesta de la peticion
   */
  public SolutionDynamicProgramming(req: any, res: Response): void {
    try {
      this.InitializeProblemData(req.files?.file.data);
      res.json("Hola");
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  /**
   * Inicializa los datos del problema
   * @param fileData Datos del problema
   * @returns void
   * @throws Error
   */
  private InitializeProblemData(fileData: any): void {
    try {
      this.problemData = Utils.ReadFileData(fileData);
      let objCadenaDividida: any = Utils.DividirCadena(
        this.problemData,
        "",
        true
      );
      if (!objCadenaDividida.status) {
        throw new Error("Error al dividir la cadena, verifique el archivo");
      }
      this.problemDataArray = objCadenaDividida.cadena;
      this.ObtenerOtrosDatos();
      this.ObtenerProcedimientos();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene los procedimientos del problema
   * @returns void
   * @throws Error
   */
  private ObtenerProcedimientos(): void {
    let procedimiento: IProcedimiento;
    try {
      for (let i = 1; i < this.problemDataArray.length; i++) {
        let linea: string = this.problemDataArray[i];

        let objCadenaDividida: any = Utils.DividirCadena(linea, ",");
        if (!objCadenaDividida.status) {
          throw new Error(
            "Error al obtener el nombre del procedimeinto y sus horas, verifique el archivo"
          );
        }
        let arrayDeCadenas: string[] = objCadenaDividida.cadena;
        procedimiento = {
          nombre: arrayDeCadenas[0],
          horaInicio: parseInt(arrayDeCadenas[1]),
          horaFin: parseInt(arrayDeCadenas[2]),
        };
        this.procedimientos.push(procedimiento);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene los datos generales del problema
   * @returns void
   * @throws Error
   */
  private ObtenerOtrosDatos(): void {
    try {
      this.cantidadProcedimientos = parseInt(this.problemDataArray[0]);
    } catch (error) {
      throw error;
    }
  }
}
export default SalaOperacionesServices;
