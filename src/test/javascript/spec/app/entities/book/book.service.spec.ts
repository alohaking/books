/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT } from '@/shared/date/filters';
import BookService from '@/entities/book/book.service';
import { Book } from '@/shared/model/book.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Book Service', () => {
    let service: BookService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new BookService();
      currentDate = new Date();

      elemDefault = new Book(0, 'AAAAAAA', 'AAAAAAA', currentDate);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            showTime: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a Book', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            showTime: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            showTime: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Book', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            description: 'BBBBBB',
            showTime: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            showTime: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of Book', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            description: 'BBBBBB',
            showTime: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            showTime: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a Book', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
