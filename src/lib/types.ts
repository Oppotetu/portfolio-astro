export interface Project {
  slug: string;
  title: string;
  authors: string[];
  oppsummering: string;
  squareFootage: number;
  publisert: string;
  assignmentType: string;
  // gallery: { ref: string }[];
}

export interface ImageEntry {
  project: string;
  filename: string;
  filepath: string;
}
