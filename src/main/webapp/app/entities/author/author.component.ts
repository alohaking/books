import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IAuthor } from '@/shared/model/author.model';
import AlertService from '@/shared/alert/alert.service';

import AuthorService from './author.service';

@Component
export default class Author extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('authorService') private authorService: () => AuthorService;
  private removeId: string = null;
  public authors: IAuthor[] = [];

  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllAuthors();
  }

  public clear(): void {
    this.retrieveAllAuthors();
  }

  public retrieveAllAuthors(): void {
    this.authorService()
      .retrieve()
      .then(res => {
        this.authors = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeAuthor(): void {
    this.authorService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('booksApp.author.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllAuthors();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
