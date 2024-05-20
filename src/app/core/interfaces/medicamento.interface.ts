interface Documento {
  tipo?: number;
  url?: string;
  urlHtml?: string;
  secc?: boolean;
  fecha?: number;
}

interface Foto {
  tipo?: string;
  url?: string;
  fecha?: number;
}

interface Estado {
  aut?: number;
}

interface NotaSustituible {
  id?: number;
  nombre?: string;
}

interface ViaAdministracion {
  id?: number;
  nombre?: string;
}

interface FormaFarmaceutica {
  id?: number;
  nombre?: string;
}

interface VTM {
  id?: number;
  nombre?: string;
}

export interface MedObtenido {
  nregistro: string;
  nombre: string;
  labtitular: string;
  cpresc?: string;
  estado?: Estado;
  comerc?: boolean;
  receta?: boolean;
  generico?: boolean;
  conduc?: boolean;
  triangulo: boolean;
  huerfano?: boolean;
  biosimilar?: boolean;
  nosustituible?: NotaSustituible;
  psum?: boolean;
  notas?: boolean;
  materialesInf?: boolean;
  ema?: boolean;
  docs: Documento[];
  fotos: Foto[];
  viasAdministracion: ViaAdministracion[];
  formaFarmaceutica?: FormaFarmaceutica;
  formaFarmaceuticaSimplificada: FormaFarmaceutica;
  vtm?: VTM;
  dosis?: string;
}

export interface MedObtenidoResults {
 totalFilas?: number,
 pagina?: number,
 tamanioPagina?: number,
 resultados?: MedObtenido []
}


export interface MiMedicamento {
  id_medicamento?: number,
  num_registro?: string,
  nombre?: string,
  laboratorio?: string,
  triangulo_seguim?: boolean,
  inicio_envase?: Date,
  contenido_envase?: number,
  forma_simple?: string,
  via_administracion?: string,
  prospecto?: string,
  imagen?: string,
  consejos?: string
}
