import Utils from "../utils/Utils";
import { IProcedimiento } from "../interfaces/IProcedimiento";

class SalaOperacionesController {
  private problemData: string;
  private problemDataArray: string[];
  private procedimientos: IProcedimiento[];
  private cantidadProcedimientos: number;
  private solutionFileData: string;

  constructor() {
    this.problemData = "";
    this.problemDataArray = [];
    this.procedimientos = [];
    this.cantidadProcedimientos = 0;
    this.solutionFileData = "";
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

  public LlamarSolucionRecursiva(solucion: number): void {
    try {
      this.procedimientos.sort((a, b) => {
        return a.horaFinEnSegundos - b.horaFinEnSegundos;
      });

      if (solucion === 1) {
        this.GenerarSolucionProblemaRecursivo([], this.SolucionRecursiva(this.procedimientos, this.cantidadProcedimientos));
      } else {
        this.SolucionBasica(this.procedimientos, this.cantidadProcedimientos);
      }
    } catch (error) {
      throw error;
    }
  }


  /**
     * ***********************************************************************************************
     * ******************************ENFOQUE BASICO INGENUO****************************************
     * ***********************************************************************************************
     * 
     * La idea es ordenar los procedimientos en orden creciente de su tiempo de finalización y siempre incluir
     * el primer elemento del arreglo de procedimientos en el arreglo de solución.
     * luego recorrer el arreglo de procedimientos y verificar si el procedimiento actual
     * entra en conflicto con el procedimiento anterior, si no entra en conflicto, se agrega
     * al arreglo de solución, esto despues de verificar que si procedimiento terminaba al otro dia, se descartaba,
     * si el procedimiento dura un dia entero, se incluye solo ese solo si se hace en el mismo dia.
     * 
     * 
     * ***********************************************************************************************
     * *****************************************ALGORITMO*********************************************
     * ***********************************************************************************************
     * 1. Ordenar el arreglo de procedimientos en función de su hora de finalización, de forma creciente.
     * 2. Ahora se aplica el proceso de clasificación de procedimientos, recorriendo el arreglo de procedimientos.
     * 
     * ***********************************************************************************************
     * ***********************************EXPLICACIÓN*************************************************
     * ***********************************************************************************************
     * 1. Recibimos la información del archivo de entrada, el metodo InitializeProblemData() la carga en el objeto
     *    y la separa en un arreglo de cadenas. Luego se obtiene la cantidad de procedimientos y se crea un arreglo
     *    de procedimientos. Para cada procedimiento se obtiene el nombre, hora de inicio y hora de finalización.
     *    La duración del procedimiento (beneficio) es la diferencia entre las horas de finalización y de inicio.
     * 2. Se ordena el arreglo de procedimientos en función de su hora de finalización, en orden creciente.
     *    para que el siguiente procedimiento sea siempre el tiempo de finalización más corto
     * 3. El arreglo de procedimientos se pasa a la funcion SolucionBasica() para que se resuelva el problema,
     *    donde comienza a realizar lo antes mencionado. siempre teiendo como beneficio el tiempo de duracion del procedimiento.
     * 
     * ***********************************************************************************************
     * **********************************COMPLEJIDAD DEL TIEMPO***************************************
     * ***********************************************************************************************
     * 1.Estamos ordenando el erreglo, eso nos toma un tiempo de O(n log n) en el peor de los casos.
     * 2.Estamos recorriendo el arreglo de procedimientos, eso nos toma un tiempo de O(n).
     * 
     * En total, eso nos toma un tiempo de O(n log n) + O(n)
     * 
     * Si contamos el tiempo que nos toma recorrer el arreglo solucion debemos agregar un tiempo de O(n)
     * Siendo; O(n log n) + O(n) + O(n)
     */
  private SolucionBasica(arr: IProcedimiento[], n: number) {
    try {
      let maxSeconds: number = Utils.HoursToSeconds(24);
      let procedimientosEscogidos: any[] = [];
      let beneficio: number = 0;

      //El procedimiento termina al otro dia, se descarta
      if (arr[0].horaInicioEnSegundos < arr[0].horaFinEnSegundos) {
        procedimientosEscogidos.push(arr[0]);
        beneficio += arr[0].duracionEnSegundos;
      }

      for (let index = 1; index < arr.length; index++) {

        //El procedimiento termina al otro dia, se descarta
        if (arr[index].horaInicioEnSegundos > arr[index].horaFinEnSegundos) {
          continue;
        }

        // Si el procedimiento dura un dia entero, se incluye solo ese
        // Solo si se hace en el mismo dia
        if (arr[index].duracionEnSegundos === maxSeconds) {
          if (arr[index].horaInicioEnSegundos == 0 && arr[index].horaFinEnSegundos == maxSeconds) {
            procedimientosEscogidos = [];
            procedimientosEscogidos.push(arr[index]);
            beneficio = arr[index].duracionEnSegundos;
            this.GenerarSolucionProblemaRecursivo(procedimientosEscogidos, beneficio);
            return;
          }
        }

        if (procedimientosEscogidos.length == 0) {
          procedimientosEscogidos.push(arr[index])
          continue;
        }

        if (procedimientosEscogidos[procedimientosEscogidos.length - 1].horaFinEnSegundos <= arr[index].horaInicioEnSegundos) {
          // // Si escogiendo el procedimiento actual no sobrepasa el tiempo maximo de la sala, se incluye
          if ((beneficio + arr[index].duracionEnSegundos) <= maxSeconds) {
            procedimientosEscogidos.push(arr[index]);
            beneficio += arr[index].duracionEnSegundos;
          } else {
            continue;
          }
        }
      }
      this.GenerarSolucionProblemaRecursivo(procedimientosEscogidos, beneficio);
    } catch (error) {
      throw error;
    }
  }

  // Encuentra el último trabajo (en un arreglo ordenado) que no entre en conflicto con el trabajo [i].
  // Si no hay un trabajo compatible, devuelve -1
  private UltimoProcedimientoSinConflicto(arr: IProcedimiento[], i: number) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j].horaFinEnSegundos <= arr[i - 1].horaInicioEnSegundos) return j;
    }
    return -1;
  }

  private GenerarSolucionProblemaRecursivo(arr: any[], maximoBeneficio: number): void {
    try {
      this.solutionFileData = arr.length.toString() + "\n";
      this.solutionFileData += Utils.SecondsToHoursAndMinutes(maximoBeneficio) + "\n";

      for (let i = 0; i < arr.length; i++) {
        this.solutionFileData += arr[i].nombre + " " + Utils.SecondsToHoursAndMinutes(arr[i].duracionEnSegundos) + "\n";
      }

    } catch (error) {
      throw error;
    }
  }

  /**
   * ***********************************************************************************************
   * ******************************ENFOQUE RECURSIVO INGENUO****************************************
   * ***********************************************************************************************
   * 
   * La idea es ordenar los procedimientos en orden creciente de su tiempo de finalización 
   * y luego usar la recursividad para resolver este problema.
   * También encontrar el enfoque recursivo es el primer paso para la programación dinámica.
   * Aquí encontramos el patrón de que para cada procedimiento tenemos que encontrar un procedimeinto que no entre en conflicto
   * y sumar sus ganancias y eso es lo que se hace excluyendo el procedimiento actual e
   * incluyendo el procedimiento actual después de ordenar el arreglo en función de su hora de finalización.
   * 
   * 
   * ***********************************************************************************************
   * *****************************************ALGORITMO*********************************************
   * ***********************************************************************************************
   * 1. Ordenar el arreglo de procedimientos en función de su hora de finalización, de forma creciente.
   * 2. Ahora se aplica el proceso recursivo
   * 
   * ¿Cómo encontrar el beneficio incluyendo el procedimiento actual?
   * Para encontrar un procedimiento que no entre en conflicto, comenzamos nuestro recorrido desde el final
   * y buscamos el primer procedimiento desde el final (último procedimiento) que no entre en conflicto
   * con el procedimiento actual.
   * 
   * La idea es encontrar el procedimeinto más reciente antes del procedimeinto actual
   * (en el arreglo ordenado) que no entre en conflicto con el procedimiento actual.
   * Una vez que encontramos dicho procedimeinto, recurrimos a todos los procedimientos hasta ese procedimiento y
   * agregamos las ganancias de tiempo del procedimeinto actual al resultado.
   * 
   * ***********************************************************************************************
   * ***********************************EXPLICACIÓN*************************************************
   * ***********************************************************************************************
   * 1. Recibimos la información del archivo de entrada, el metodo InitializeProblemData() la carga en el objeto
   *    y la separa en un arreglo de cadenas. Luego se obtiene la cantidad de procedimientos y se crea un arreglo
   *    de procedimientos. Para cada procedimiento se obtiene el nombre, hora de inicio y hora de finalización.
   *    La duración del procedimiento (beneficio)  es la diferencia entre las horas de finalización y de inicio.
   * 2. Se ordena el arreglo de procedimientos en función de su hora de finalización, en orden creciente.
   *    para que el siguiente trabajo sea siempre el tiempo de finalización más corto
   * 3. El arreglo de procedimientos se pasa a la funcion SolucionRecursiva() para que se resuelva el problema,
   *    donde comienza a verificar la hora de inicio de un prosedimiento (con el ultimo procedimiento) con la 
   *    hora de finalizacion de cada otro procedimiento con la ayuda de la funcion UltimoProcedimientoSinConflicto()
   *    donde esta devuelve el indice del procedimiento que no entre en conflicto. Luego, resursivamente hasta que obtengamos
   *    procedimeintos que no se superponen, finalmente calculamos el maximo de horas que la sala puede estar en uso.
   * 
   * ***********************************************************************************************
   * **********************************COMPLEJIDAD DEL TIEMPO***************************************
   * ***********************************************************************************************
   * 1.Estamos ordenando el erreglo, eso nos toma un tiempo de O(n log n) en el peor de los casos.
   * 2.Para cada procedimento, tenemos dos opciones: ya sea para incluirlo o no (llamados recursivos),
   *   eso nos toma un tiempo de O(2^n ).
   * 3.En cada paso, encontramos el procedimiento que no entre en conflicto, eso nos toma un tiempo de O(n) en el peor de los casos.
   * 
   * En total, eso nos toma un tiempo de O(n log n) + O(2^n) O(n) u O(n (2^n)).
   * 
   * Si contamos el tiempo que nos toma recorrer el arreglo solucion debemos agregar un tiempo de O(n)
   * Siendo; O(n log n) + O(2 ^ n) O(n) + O(n) 
   */
  private SolucionRecursiva(arr: IProcedimiento[], n: number): number {
    try {

      //caso base
      if (n == 1) {
        return arr[n - 1].duracionEnSegundos;
      }

      // Se busca el beneficio cuando el procedimiento actual es incluido
      let beneficioIncluido = arr[n - 1].duracionEnSegundos;
      let i = this.UltimoProcedimientoSinConflicto(arr, n);
      if (i != -1) {
        beneficioIncluido += this.SolucionRecursiva(arr, i + 1);
      }

      // Se busca el beneficio cuando el procedimiento actual es excluido
      let beneficioExcluido = this.SolucionRecursiva(arr, n - 1);

      return Math.max(beneficioIncluido, beneficioExcluido);

    } catch (error) {
      throw error;
    }
  }
  //*********************************CODIGO SOLUCION RECURSIVA******************************************/


  //*********************************CODIGO SOLUCION DINAMICA******************************************/

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

  // Una función basada en búsqueda binaria para encontrar el último procedimeinto
  //(antes del procedimiento actual) que no entre en conflicto con el actual
  //procedimeinto. "start_index" es el índice del procedimiento actual. 
  //Esta función devuelve -1 si todos los procedimientos anteriores al índice entran en conflicto con él.
  //Los procedimiento del arr[] se ordenan en orden creciente de tiempo de finalización
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

  /**
   * ***********************************************************************************************
   * ************************ENFOQUE DINAMICO USANDO BUSQUEDA BINARIA*******************************
   * ***********************************************************************************************
   * 
   * En este enfoque tambien ordenamos el arreglo de procedimientos de acuerdo con la hora de finalización.
   * Se crea una nueva tabla que almacenará la ganancia(Tiempo maximo) correspondiente a medida que avanzamos
   * en la búsqueda de la ganancia máxima. Esto nos ayudará a no repetir el proceso de comparar cada vez y
   * calcular los resultados por los que ya pasamos una vez al comparar las ganancias y el tiempo que toma cada procedimiento.
   * Este es el enfoque que tiene de dinamico.
   * En esta solucion, en lugar de atravesar el ciclo n veces para encontrar el procedimiento
   * que no entre en conflicto usamos la búsqueda binaria para obtener su indice.
   * 
   * ***********************************************************************************************
   * ***********************************EXPLICACIÓN*************************************************
   * ***********************************************************************************************
   * 1. Recibimos la información del archivo de entrada, el metodo InitializeProblemData() la carga en el objeto
   *    y la separa en un arreglo de cadenas. Luego se obtiene la cantidad de procedimientos y se crea un arreglo
   *    de procedimientos. Para cada procedimiento se obtiene el nombre, hora de inicio y hora de finalización.
   *    La duración del procedimiento (beneficio)  es la diferencia entre las horas de finalización y de inicio.
   * 2. Se ordena el arreglo de procedimientos en función de su hora de finalización, en orden creciente.
   *    para que el siguiente trabajo sea siempre el tiempo de finalización más corto
   * 3. El arreglo de procedimientos se pasa a la funcion SolucionDinamica() para que se resuelva el problema,
   *    de la manera antes mencionada.
   * 
   * ***********************************************************************************************
   * **********************************COMPLEJIDAD DEL TIEMPO***************************************
   * ***********************************************************************************************
   * 1.Estamos ordenando el erreglo, eso nos toma un tiempo de O(n log n) en el peor de los casos.
   * 2.Luego, llenamos la tablaMaximosBeneficios, eso nos toma un tiempo de O(n), pero ahora para llenar
   *   cada tablaMaximosBeneficios[i] nos estamos tomando un tiempo de O(n log n) (Busqueda binaria) para encontrar 
   *   el procedimiento que no entre en conflicto.
   * 
   * En total, eso nos toma un tiempo de O(n log n) + O(n) + O(n log n)
   * 
   * Si contamos el tiempo que nos toma recorrer el arreglo solucion debemos agregar un tiempo de O(n)
   * Siendo; O(n log n) + O(n) + O(n log n) + O(n)
   * 
   * Pero podriamos decir que la complejidad en general es de O(n log n)
   */
  private SolucionDinamica(arr: IProcedimiento[], n: number): void {
    try {
      let procedimientosEscogidos: any[] = [];

      if (n == 0) {
        return;
      }

      let tablaMaximosBeneficios: any[] = new Array(n).fill(0);

      tablaMaximosBeneficios[0] = arr[0].duracionEnSegundos;

      for (let indexEscogidos = 0; indexEscogidos < this.cantidadProcedimientos; indexEscogidos++) {
        procedimientosEscogidos.push([]);
      }

      procedimientosEscogidos[0].push(0);

      for (let i = 1; i < n; i++) {

        let index: number = this.UltimoProcedimientoSinConflictoBS(arr, i);

        let beneficioActual: number = arr[i].duracionEnSegundos;
        if (index != -1) {
          beneficioActual += tablaMaximosBeneficios[index];
        }

        if (tablaMaximosBeneficios[i - 1] < beneficioActual) {
          tablaMaximosBeneficios[i] = beneficioActual;

          if (index != -1) {
            procedimientosEscogidos[i] = [
              ...procedimientosEscogidos[index],
            ];
          }
          procedimientosEscogidos[i].push(i);
        } else {
          procedimientosEscogidos[i] = [
            ...procedimientosEscogidos[i - 1],
          ];

          tablaMaximosBeneficios[i] = tablaMaximosBeneficios[i - 1];
        }
      }
      this.GenerarSolucionProblemaDinamico(procedimientosEscogidos, tablaMaximosBeneficios[n - 1]);
    } catch (error) {
      throw error;
    }
  }

  private GenerarSolucionProblemaDinamico(arr: any[], maximoBeneficio: number): void {
    try {
      this.solutionFileData = arr[this.cantidadProcedimientos - 1].length.toString() + "\n";
      this.solutionFileData += Utils.SecondsToHoursAndMinutes(maximoBeneficio) + "\n";
      for (let i = 0; i < arr[this.cantidadProcedimientos - 1].length; i++) {
        let procedimiento: IProcedimiento = this.procedimientos[arr[this.cantidadProcedimientos - 1][i]];
        this.solutionFileData += procedimiento.nombre + " " + Utils.SecondsToHoursAndMinutes(procedimiento.duracionEnSegundos) + "\n";
      }
    } catch (error) {
      throw error;
    }
  }
  //*********************************CODIGO SOLUCION DINAMICA******************************************/
}

export default SalaOperacionesController;
