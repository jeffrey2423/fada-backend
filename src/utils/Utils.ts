module Utils {
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

  export function StringToBlob(str: string): Blob {
    let blob: Blob = new Blob([str], { type: "text/plain" });
    return blob;
  }

  export function HoursToSeconds(hours: number): number {
    return hours * 60 * 60;
  }

  export function StringHoursToSeconds(hours: string): number {
    return HoursToSeconds(parseInt(hours));
  }
}

export default Utils;
