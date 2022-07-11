import Utils from "../utils/Utils";
import { IProcedimiento } from "../interfaces/IProcedimiento";

class SalaOperacionesController {
  private problemData: string;
  private problemDataArray: string[];
  private procedimientos: IProcedimiento[];
  private cantidadProcedimientos: number;
  private horaMaximaEnSegundos: number;
  private procedimientosEscogidos: IProcedimiento[];
  private solutionFileData: string;

  constructor() {
    this.problemData = "";
    this.problemDataArray = [];
    this.procedimientos = [];
    this.cantidadProcedimientos = 0;
    this.horaMaximaEnSegundos = Utils.HoursToSeconds(24);
    this.solutionFileData = "";
    this.procedimientosEscogidos = [];
  }

  getSolutionFileData(): string {
    return this.solutionFileData;
  }

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

  private UltimoProcedimientoSinConflicto(arr: IProcedimiento[], i: number) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j].horaFinEnSegundos <= arr[i - 1].horaInicioEnSegundos) return j;
    }
    return -1;
  }

  private SolucionRecursiva(arr: IProcedimiento[], n: number): number {
    let indiceEscogido: number;
    try {
      if (n == 1) {
        return arr[n - 1].duracionEnSegundos;
      }
      let inclProf = arr[n - 1].duracionEnSegundos;
      let i = this.UltimoProcedimientoSinConflicto(arr, n);
      indiceEscogido = i;

      if (i != -1) {
        inclProf += this.SolucionRecursiva(arr, i + 1);
      }

      let exclProf = this.SolucionRecursiva(arr, n - 1);

      if (inclProf < exclProf){
        this.procedimientosEscogidos.push(arr[i+1]);
      }else{
        this.procedimientosEscogidos.push(arr[n-1]);
      }
      // this.procedimientosEscogidos.push(arr[n+i]);

      return Math.max(inclProf, exclProf);
    } catch (error) {
      throw error;
    }
  }

  private BinarySearch(arr: IProcedimiento[], start_index: number) {
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

  private SolucionDinamica(arr: IProcedimiento[], n: number): number {
    try {
      let table: any[] = new Array(n).fill(0);

      table[0] = arr[0].duracionEnSegundos;
      this.procedimientosEscogidos.push(arr[0]);

      for (let i = 1; i < n; i++) {
        let inclProf = arr[i].duracionEnSegundos;
        let l: number = this.BinarySearch(arr, i);
        if (l != -1) inclProf += table[l];
        table[i] = Math.max(inclProf, table[i - 1]);

        // this.procedimientosEscogidos.push(arr[i+l]);
        if (l + i > 0) {
          this.procedimientosEscogidos.push(arr[l + i]);
        } else {
          // this.procedimientosEscogidos.push(arr[n - 1]);
          this.procedimientosEscogidos.push(arr[l-1]);
        }

        // if (Math.max(inclProf, table[i - 1]) ==inclProf) {
        //   this.procedimientosEscogidos.push(arr[i]);
        // } else {
        //   this.procedimientosEscogidos.push(arr[l]);
        // }
      }

      return table[n - 1];
    } catch (error) {
      throw error;
    }
  }

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
    this.procedimientos.sort((a, b) => {
      return a.horaFinEnSegundos - b.horaFinEnSegundos;
    });

    try {
      this.solutionFileData = this.SolucionDinamica(
        this.procedimientos,
        this.cantidadProcedimientos
      ).toString();
    } catch (error) {
      throw error;
    }
  }
}

export default SalaOperacionesController;
