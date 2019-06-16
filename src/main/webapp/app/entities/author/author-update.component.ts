import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IAuthor, Author } from '@/shared/model/author.model';
import AuthorService from './author.service';

const validations: any = {
  author: {
    name: {
      required
    }
  }
};

@Component({
  validations
})
export default class AuthorUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('authorService') private authorService: () => AuthorService;
  public author: IAuthor = new Author();
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.authorId) {
        vm.retrieveAuthor(to.params.authorId);
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.author.id) {
      this.authorService()
        .update(this.author)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('booksApp.author.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.authorService()
        .create(this.author)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('booksApp.author.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveAuthor(authorId): void {
    this.authorService()
      .find(authorId)
      .then(res => {
        this.author = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
