import { Response, Request } from "express";
import path from "path";
import fs from "fs";
module Utils {
  export enum ContentType {
    JSON = "application/json",
    TEXT = "text/plain",
    HTML = "text/html",
    PDF = "application/pdf",
    ZIP = "application/zip",
    EXCEL = "application/vnd.ms-excel",
    WORD = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    POWERPOINT = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  }

  export enum HTTPStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
  }

  export function ReadFileData(fileData: any): string {
    try {
      return fileData.toString("utf8");
    } catch (error) {
      throw error;
    }
  }

  export function ReadFileDataAsArray(fileData: any): string[] {
    try {
      return fileData.toString("utf8").split("\n");
    } catch (error) {
      throw error;
    }
  }
  export function DividirCadena(
    cadenaADividir: string,
    separador: string = "",
    esSaltoDeLinea: boolean = false
  ): any {
    let arrayDeCadenas: any = null;
    let objReturn: any = {
      status: false,
      cadena: cadenaADividir,
    };

    try {
      if (esSaltoDeLinea) {
        arrayDeCadenas = cadenaADividir.split(/\r\n|\r|\n/, -1);
      } else {
        arrayDeCadenas = cadenaADividir.split(separador);
      }

      objReturn.status = true;
      objReturn.cadena = arrayDeCadenas;

      if (
        !IsUndefinedOrNullOrEmptyOrFalse(arrayDeCadenas) &&
        arrayDeCadenas.length <= 1
      ) {
        objReturn.status = false;
        objReturn.cadena = cadenaADividir;
      }
    } catch (ex) {
      objReturn.status = false;
      objReturn.cadena = cadenaADividir;
    }

    return objReturn;
  }

  export function IsUndefinedOrNullOrEmptyOrFalse(value: any): boolean {
    let flag: boolean = false;

    if (
      value === undefined ||
      value === null ||
      value === false ||
      value === "" ||
      value === " "
    ) {
      flag = true;
    }

    return flag;
  }

  export function HoursToSeconds(hours: number): number {
    return hours * 60 * 60;
  }

  export function MinutesToSeconds(minutes: number): number {
    return minutes * 60;
  }

  export function SecondsToHoursAndMinutes(seconds: number): string {
    let hours: number = Math.floor(seconds / 3600);
    let minutes: number = Math.floor((seconds - hours * 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  export function HoraASeguntos(hora: string): number {
    let horaFinalEnSegundos: number = 0;
    let objHoras: any;
    let horaEnSegundos: number;
    let minutosEnSegundos: number;

    try {
      objHoras = DividirCadena(hora, ":", false);
      if (!objHoras.status) {
        throw new Error("Error al dividir la hora, verifique el archivo");
      }

      horaEnSegundos = HoursToSeconds(parseInt(objHoras.cadena[0]));
      minutosEnSegundos = MinutesToSeconds(parseInt(objHoras.cadena[1]));

      horaFinalEnSegundos = horaEnSegundos + minutosEnSegundos;
    } catch (error) {
      throw error;
    }
    return horaFinalEnSegundos;
  }

  export function SendSolutionFile(
    req: Request,
    res: Response,
    solutionData: string
  ): void {
    let solutionFileName: string;
    let pathSolutionFile!: string;
    try {
      solutionFileName = `solution_${new Date().getTime()}.txt`;
      pathSolutionFile = path.join(
        __dirname,
        "..",
        "..",
        "solutions",
        solutionFileName
      );
      fs.writeFileSync(pathSolutionFile, solutionData);
      res.setHeader(
        "Content-disposition",
        `attachment; filename=${solutionFileName}`
      );
      res.setHeader("Content-Type", ContentType.TEXT);
      res.download(pathSolutionFile, () => {
        fs.unlinkSync(pathSolutionFile);
      });
    } catch (error: any) {
      throw error;
    }
  }

  export function CreateSolutionFileData(...args: string[]): string {
    let solutionData: string = "";
    for (let i = 0; i < args.length; i++) {
      solutionData += args[i] + "\n";
    }
    return solutionData;
  }
}

export default Utils;
