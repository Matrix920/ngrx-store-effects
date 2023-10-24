export interface Book {
  id: string;
  bolumeInfo: {
    title: string;
    authors: Array<string>;
  }
}