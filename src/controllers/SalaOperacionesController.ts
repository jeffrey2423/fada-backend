import Utils from "../utils/Utils";
import { IProcedimiento } from "../interfaces/IProcedimiento";

class SalaOperacionesController {
  private problemData: string;
  private problemDataArray: string[];
  private procedimientos: IProcedimiento[];
  private cantidadProcedimientos: number;
  private procedimientosEscogidos: any[];
  private solutionFileData: string;

  constructor() {
    this.problemData = "";
    this.problemDataArray = [];
    this.procedimientos = [];
    this.cantidadProcedimientos = 0;
    this.solutionFileData = "";
    this.procedimientosEscogidos = [];
  }

  getSolutionFileData(): string {
    return this.solutionFileData;
  }

  //*********************************SE INICIALIZA LA INFORMACION DEL PROBLEMA**************************/
  public InitializeProblemData(fileData: any): void {
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
      for (let indexEscogidos = 0; indexEscogidos < this.cantidadProcedimientos; indexEscogidos++) {
        this.procedimientosEscogidos.push([]);
      }
    } catch (error) {
      throw error;
    }
  }

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
          horaInicioEnSegundos: Utils.HoraASeguntos(arrayDeCadenas[1]),
          horaFinEnSegundos: Utils.HoraASeguntos(arrayDeCadenas[2]),
          duracionEnSegundos: 0,
        };
        procedimiento.duracionEnSegundos =
          procedimiento.horaFinEnSegundos - procedimiento.horaInicioEnSegundos;
        this.procedimientos.push(procedimiento);
      }
    } catch (error) {
      throw error;
    }
  }

  private ObtenerOtrosDatos(): void {
    try {
      this.cantidadProcedimientos = parseInt(this.problemDataArray[0]);
    } catch (error) {
      throw error;
    }
  }
  //*********************************SE INICIALIZA LA INFORMACION DEL PROBLEMA**************************/


  //*********************************CODIGO SOLUCION RECURSIVA******************************************/
  private UltimoProcedimientoSinConflicto(arr: IProcedimiento[], i: number) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j].horaFinEnSegundos <= arr[i - 1].horaInicioEnSegundos) return j;
    }
    return -1;
  }

  private SolucionRecursiva(arr: IProcedimiento[], n: number): number {
    try {
      if (n == 1) {
        return arr[n - 1].duracionEnSegundos;
      }
      let inclProf = arr[n - 1].duracionEnSegundos;
      let i = this.UltimoProcedimientoSinConflicto(arr, n);

      if (i != -1) {
        inclProf += this.SolucionRecursiva(arr, i + 1);
      }

      let exclProf = this.SolucionRecursiva(arr, n - 1);

     

      if (inclProf < exclProf) {

        if (i != -1) {
          this.procedimientosEscogidos[i] = [
            ...this.procedimientosEscogidos[i],
          ];
        }
        this.procedimientosEscogidos[i].push(i);
      } else {
        this.procedimientosEscogidos[i] = [
          ...this.procedimientosEscogidos[i - 1],
        ];
      }
      return Math.max(inclProf, exclProf);

    } catch (error) {
      throw error;
    }
  }
  //*********************************CODIGO SOLUCION RECURSIVA******************************************/


  //*********************************CODIGO SOLUCION DINAMICA******************************************/
  private UltimoProcedimientoSinConflictoBS(arr: IProcedimiento[], start_index: number) {
    let lo: number = 0;
    let hi: number = start_index - 1;

    while (lo <= hi) {
      let mid = Math.floor((lo + hi) / 2);
      if (arr[mid].horaFinEnSegundos <= arr[start_index].horaInicioEnSegundos) {
        if (
          arr[mid + 1].horaFinEnSegundos <=
          arr[start_index].horaInicioEnSegundos
        )
          lo = mid + 1;
        else return mid;
      } else hi = mid - 1;
    }

    return -1;
  }

  private SolucionDinamica(arr: IProcedimiento[], n: number): void {
    try {

      if (n == 0) {
        return;
      }

      let tablaMaximosBeneficios: any[] = new Array(n).fill(0);

      tablaMaximosBeneficios[0] = arr[0].duracionEnSegundos;
      this.procedimientosEscogidos[0].push(0);

      for (let i = 1; i < n; i++) {
        let index: number = this.UltimoProcedimientoSinConflictoBS(arr, i);

        let duracionProcedimientoActual = arr[i].duracionEnSegundos;

        if (index != -1) {
          duracionProcedimientoActual += tablaMaximosBeneficios[index];
        }

        if (tablaMaximosBeneficios[i - 1] < duracionProcedimientoActual) {
          tablaMaximosBeneficios[i] = duracionProcedimientoActual;

          if (index != -1) {
            this.procedimientosEscogidos[i] = [
              ...this.procedimientosEscogidos[index],
            ];
          }
          this.procedimientosEscogidos[i].push(i);
        } else {
          this.procedimientosEscogidos[i] = [
            ...this.procedimientosEscogidos[i - 1],
          ];
          tablaMaximosBeneficios[i] = tablaMaximosBeneficios[i - 1];
        }
      }
      this.GenerarSolucionProblema(tablaMaximosBeneficios[n - 1]);
    } catch (error) {
      throw error;
    }
  }

  private GenerarSolucionProblema(maximoBeneficio: number): void {
    try {
      this.solutionFileData =
        this.procedimientosEscogidos[
          this.cantidadProcedimientos - 1
        ].length.toString() + "\n";
      this.solutionFileData +=
        Utils.SecondsToHoursAndMinutes(maximoBeneficio) + "\n";
      for (
        let i = 0;
        i <
        this.procedimientosEscogidos[this.cantidadProcedimientos - 1].length;
        i++
      ) {
        let procedimiento: IProcedimiento =
          this.procedimientos[this.procedimientosEscogidos[this.cantidadProcedimientos - 1][i]];
        this.solutionFileData += procedimiento.nombre + " " + Utils.SecondsToHoursAndMinutes(procedimiento.duracionEnSegundos) + "\n";
      }
    } catch (error) {
      throw error;
    }
  }
  //*********************************CODIGO SOLUCION DINAMICA******************************************/



  //*********************************METODOS PUBLICOS PARA LLAMAR LAS SOLUCIONES************************/
  public LlamarSolucionRecursiva(): void {
    try {
      this.procedimientos.sort((a, b) => {
        return a.horaFinEnSegundos - b.horaFinEnSegundos;
      });

      this.solutionFileData = this.SolucionRecursiva(
        this.procedimientos,
        this.cantidadProcedimientos
      ).toString();
    } catch (error) {
      throw error;
    }
  }
  public LlamarSolucionDinamica(): void {
    try {
      this.procedimientos.sort((a, b) => {
        return a.horaFinEnSegundos - b.horaFinEnSegundos;
      });
      this.SolucionDinamica(this.procedimientos, this.cantidadProcedimientos);
    } catch (error) {
      throw error;
    }
  }
  //*********************************METODOS PUBLICOS PARA LLAMAR LAS SOLUCIONES************************/
}

export default SalaOperacionesController;
