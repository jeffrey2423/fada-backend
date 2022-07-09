import Utils from "../utils/Utils";
import { Response } from "express";
import { ILibro } from "../interfaces/ILibro";

class CopiaLibrosServices {
  private problemData: string;
  private problemDataArray: string[];
  private libros: ILibro[];
  private cantidadEscritores: number;
  private cantidadLibros: number;

  constructor() {
    this.problemData = "";
    this.problemDataArray = [];
    this.libros = [];
    this.cantidadEscritores = 0;
    this.cantidadLibros = 0;
  }

  /**
   * Soluciona el problema de la copia de libros usando el algoritmo de divide y vencerás
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

  /**
   * Soluciona el problema de la copia de libros usando el algoritmo de programacion dinamica
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
      this.ObtenerLibros();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene los libros del problema
   * @returns void
   * @throws Error
   */
  private ObtenerLibros(): void {
    let libro: ILibro;
    try {
      for (let i = 1; i < this.problemDataArray.length; i++) {
        let linea: string = this.problemDataArray[i];

        let objCadenaDividida: any = Utils.DividirCadena(linea, ",");
        if (!objCadenaDividida.status) {
          throw new Error(
            "Error al obtener el nombre del libro y sus paginas, verifique el archivo"
          );
        }
        let arrayDeCadenas: string[] = objCadenaDividida.cadena;
        libro = {
          nombre: arrayDeCadenas[0],
          paginas: parseInt(arrayDeCadenas[1]),
        };
        this.libros.push(libro);
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
      let linea: string = this.problemDataArray[0];
      let objCadenaDividida: any = Utils.DividirCadena(linea, ",");
      if (!objCadenaDividida.status) {
        throw new Error(
          "Error al obtener la cantidad de escritores y la cantidad de libros, verifique el archivo"
        );
      }
      let arrayDeCadenas: string[] = objCadenaDividida.cadena;

      this.cantidadEscritores = parseInt(arrayDeCadenas[0]);
      this.cantidadLibros = parseInt(arrayDeCadenas[1]);
    } catch (error) {
      throw error;
    }
  }
}

export default CopiaLibrosServices;
