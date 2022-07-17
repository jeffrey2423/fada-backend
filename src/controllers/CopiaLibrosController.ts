import Utils from "../utils/Utils";
import { ILibro } from "../interfaces/ILibro";
import { join } from "path/posix";



class CopiaLibrosController {
  private problemData: string;
  private problemDataArray: string[];
  private libros: ILibro[];
  private cantidadEscritores: number;
  private cantidadLibros: number;
  private solutionFileData: string;

  constructor() {
    this.problemData = "";
    this.problemDataArray = [];
    this.libros = [];
    this.cantidadEscritores = 0;
    this.cantidadLibros = 0;
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
      this.ObtenerLibros();
    } catch (error) {
      throw error;
    }
  }

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
  //*********************************SE INICIALIZA LA INFORMACION DEL PROBLEMA**************************/

  //*********************************CODIGO SOLUCION RECURSIVA******************************************/

  /**
   * ***********************************************************************************************
   * *****************************************ALGORITMO*********************************************
   * ***********************************************************************************************
   * Ordena los números en orden descendente
   * Luego, suma iterativamente el siguiente número de paginas más grande
   * a un conjunto en el que la suma actual sea la más pequeña, obteniendo ese conjunto
   * de ordenar ascendentemente el arreglo de subsets en su propiedad sum
   * 
   * ***********************************************************************************************
   * **********************************COMPLEJIDAD DEL TIEMPO***************************************
   * ***********************************************************************************************
   * 1.Estamos ordenando el erreglo, eso nos toma un tiempo de O(n log n) en el peor de los casos.
   * 2.Para se esta iterando sobre el arreglo, eso nos toma un tiempo de O(n) en el peor de los casos.
   * 3.En cada iteracion ordenamos el arreglo de subsets, eso nos toma un tiempo de O(n log n) en el peor de los casos.
   * 
   * En total, eso nos toma un tiempo de O(n log n) + O(n(n log n)).
   * 
   * Si contamos el tiempo que nos toma recorrer el arreglo solucion debemos agregar un tiempo de O(n^2), ya que debemos recorrer
   * un arrego de arreglos (los subsets obtenidos)
   * Siendo; O(n log n) + O(n(n log n)) + O(n^2)
   */
  private greedyPartition(libros: ILibro[], escritores: number): ILibro[] {
    try {

      libros.sort((a, b) => b.paginas - a.paginas);

      const out: any[] = [...Array(escritores)].map((x) => {
        return {
          sum: 0,
          libros: [],
        };
      });
  
      for (const elem of libros) {
        const chosenSubset = out.sort((a, b) => a.sum - b.sum)[0];
        chosenSubset.libros.push(elem);
        chosenSubset.sum += elem.paginas;
      }

      return out.map(subset => subset.libros);

    } catch (error) {
      throw error;
    }
  }

  private GenerarSolucionGreedyPartition(arr: any[]): void {
    try {
      let numeroDias: number = 0;
      let totalPorEscritor: number = 0;    

      for (let i = 0; i < arr.length; i++) {
        totalPorEscritor = 0;
        this.solutionFileData += `Escritor ${i + 1}:\n`;
        for (let j = 0; j < arr[i].length; j++) {
          numeroDias += arr[i][j].paginas;
          this.solutionFileData += `  ${arr[i][j].nombre} ${arr[i][j].paginas}\n`;
          totalPorEscritor += arr[i][j].paginas;
        }
        this.solutionFileData += `Total: ${totalPorEscritor}\n`;
      }
      this.solutionFileData = `${numeroDias}\n` + this.solutionFileData

    } catch (error) {
      throw error;
    }
  }
    

  public LlamarSolucionGreedyPartition(): void {
    try {
     let prueba: any[] = this.greedyPartition(this.libros, this.cantidadEscritores);
     this.GenerarSolucionGreedyPartition(prueba);
    } catch (error) {
      throw error;
    }
  }
  //*********************************CODIGO SOLUCION RECURSIVA******************************************/


  //*********************************CODIGO SOLUCION DINAMICA******************************************/
  public LlamarSolucionDinamica(): void {
    try {

    } catch (error) {
      throw error;
    }
  }
  //*********************************CODIGO SOLUCION DINAMICA******************************************/
}

export default CopiaLibrosController;