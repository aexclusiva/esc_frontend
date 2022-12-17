//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}


export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}


export interface AcompanhanteDataType {
  _id: string | number;
  slug: string;
  nomePerfil: string;
  email: string;
  bio: string;
  imagens: string[];
  imageprincipal: string;
  imagecover: string;
  video: string;
  contactoTelefonico: string;
  idade: number;
  olhos: string;
  cabelo: string;
  paisdeorigem: string;
  altura: string;
  peso: string;
  busto: string;
  tatuagens: string;
  idiomas: string[];
  tipodeatendimento: string;
  atendimento: string[];
  concelho_name:string,
  distrito_name:string,
  concelho_slug:string,
  distrito_slug:string,
  eventos: string[];
  servicos: string[];
  atendea: string;
  disponibilidade: string;
  sessaodefotos: string;
  viajaraconvite: string;
  visualizacoes: number;
  cliqueswhatsapp: number,
  destaquepaginaprincipal: boolean;
  destaquenalocalizacao: boolean;
  destaqueasnossasescolhas: boolean;
  onlineagora: string;
  webcam: string;
  deslocacoes: boolean;
  apartamento: boolean;
  atendehomens: boolean;
  atendemulheres: boolean;
  atendecasais: boolean;
  diasatendimento: string[];
  atende24horas: boolean;
  atendimentocompleto: string;
  horarioninicio: string;
  idanunciante: string;
  horariofim: string;
  anuncioverificado: boolean;
}


//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}
