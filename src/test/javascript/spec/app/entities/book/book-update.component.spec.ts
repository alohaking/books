/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import BookUpdateComponent from '@/entities/book/book-update.vue';
import BookClass from '@/entities/book/book-update.component';
import BookService from '@/entities/book/book.service';

import CategoryService from '@/entities/category/category.service';

import AuthorService from '@/entities/author/author.service';

import LabelService from '@/entities/label/label.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

jest.mock('axios', () => ({
  post: jest.fn(),
  put: jest.fn()
}));

describe('Component Tests', () => {
  describe('Book Management Update Component', () => {
    let wrapper: Wrapper<BookClass>;
    let comp: BookClass;

    beforeEach(() => {
      mockedAxios.post.mockReturnValue(Promise.resolve());
      mockedAxios.put.mockReturnValue(Promise.resolve());

      wrapper = shallowMount<BookClass>(BookUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          bookService: () => new BookService(),

          categoryService: () => new CategoryService(),

          authorService: () => new AuthorService(),

          labelService: () => new LabelService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.book = entity;
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.put).toHaveBeenCalledWith('api/books', entity);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.book = entity;
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.post).toHaveBeenCalledWith('api/books', entity);
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
