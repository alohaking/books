import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import AuthorService from '../author/author.service';
import { IAuthor } from '@/shared/model/author.model';

import LabelService from '../label/label.service';
import { ILabel } from '@/shared/model/label.model';

import AlertService from '@/shared/alert/alert.service';
import { IBook, Book } from '@/shared/model/book.model';
import BookService from './book.service';

const validations: any = {
  book: {
    name: {
      required
    },
    description: {},
    showTime: {}
  }
};

@Component({
  validations
})
export default class BookUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('bookService') private bookService: () => BookService;
  public book: IBook = new Book();

  @Inject('categoryService') private categoryService: () => CategoryService;

  public categories: ICategory[] = [];

  @Inject('authorService') private authorService: () => AuthorService;

  public authors: IAuthor[] = [];

  @Inject('labelService') private labelService: () => LabelService;

  public labels: ILabel[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bookId) {
        vm.retrieveBook(to.params.bookId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.book.labels = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.book.id) {
      this.bookService()
        .update(this.book)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('booksApp.book.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.bookService()
        .create(this.book)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('booksApp.book.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveBook(bookId): void {
    this.bookService()
      .find(bookId)
      .then(res => {
        this.book = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.categoryService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
    this.authorService()
      .retrieve()
      .then(res => {
        this.authors = res.data;
      });
    this.labelService()
      .retrieve()
      .then(res => {
        this.labels = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
