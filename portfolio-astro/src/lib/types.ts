type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] };

export interface Project {
  slug: string;
  title: string;
  authors: string[];
  oppsummering: string;
  squareFootage: number;
  publisert: string;
  assignmentType: string;
  slideIndexStart?: number;
}

export interface FilePaths {
  w844?: string;
  w1024?: string;
  w1600?: string;
  w2560?: string;
}

// export interface ImageEntry extends Omit<Project, 'slug'> {
export interface ImageEntry {
  project: string;
  filename: string;
  filePaths: FilePaths;
  carouselIndex: number;
}
