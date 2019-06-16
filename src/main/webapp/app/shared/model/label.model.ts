import { IBook } from '@/shared/model/book.model';

export interface ILabel {
  id?: number;
  label?: string;
  movies?: IBook[];
}

export class Label implements ILabel {
  constructor(public id?: number, public label?: string, public movies?: IBook[]) {}
}
