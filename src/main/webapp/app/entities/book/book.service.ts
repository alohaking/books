import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IBook } from '@/shared/model/book.model';

const baseApiUrl = 'api/books';

export default class BookService {
  public find(id): Promise<IBook> {
    return new Promise<IBook>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public getMyBooks(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(`${baseApiUrl}/self?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity): Promise<IBook> {
    return new Promise<IBook>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity): Promise<IBook> {
    return new Promise<IBook>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
