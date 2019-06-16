/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import BookDetailComponent from '@/entities/book/book-details.vue';
import BookClass from '@/entities/book/book-details.component';
import BookService from '@/entities/book/book.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('Component Tests', () => {
  describe('Book Management Detail Component', () => {
    let wrapper: Wrapper<BookClass>;
    let comp: BookClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<BookClass>(BookDetailComponent, { store, i18n, localVue, provide: { bookService: () => new BookService() } });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveBook(123);
        await comp.$nextTick();

        // THEN
        expect(comp.book).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
