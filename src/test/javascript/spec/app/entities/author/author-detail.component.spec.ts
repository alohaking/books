/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import AuthorDetailComponent from '@/entities/author/author-details.vue';
import AuthorClass from '@/entities/author/author-details.component';
import AuthorService from '@/entities/author/author.service';

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
  describe('Author Management Detail Component', () => {
    let wrapper: Wrapper<AuthorClass>;
    let comp: AuthorClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<AuthorClass>(AuthorDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { authorService: () => new AuthorService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveAuthor(123);
        await comp.$nextTick();

        // THEN
        expect(comp.author).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
