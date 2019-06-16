import { ICategory } from '@/shared/model/category.model';
import { IAuthor } from '@/shared/model/author.model';
import { ILabel } from '@/shared/model/label.model';

export interface IBook {
  id?: number;
  name?: string;
  description?: string;
  showTime?: Date;
  category?: ICategory;
  author?: IAuthor;
  labels?: ILabel[];
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public showTime?: Date,
    public category?: ICategory,
    public author?: IAuthor,
    public labels?: ILabel[]
  ) {}
}
