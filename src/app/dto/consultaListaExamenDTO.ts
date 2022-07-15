import { Consulta } from "../_model/consulta";
import { Examen } from "../_model/examen";

export class ConsultaListaExamenDTO{
  consulta: Consulta;
  lstExamen: Examen[];
}
