<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('booksApp.book.home.title')" id="book-heading">Books</span>
            <router-link :to="{name: 'BookCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-book">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('booksApp.book.home.createLabel')">
                    Create new Book
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="table-responsive" v-if="books">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('booksApp.book.name')">Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('booksApp.book.description')">Description</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('showTime')"><span v-text="$t('booksApp.book.showTime')">Show Time</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('category.name')"><span v-text="$t('booksApp.book.category')">Category</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('author.name')"><span v-text="$t('booksApp.book.author')">Author</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="book of orderBy(books, propOrder, reverse === true ? 1 : -1)"
                    :key="book.id">
                    <td>
                        <router-link :to="{name: 'BookView', params: {bookId: book.id}}">{{book.id}}</router-link>
                    </td>
                    <td>{{book.name}}</td>
                    <td>{{book.description}}</td>
                    <td>{{book.showTime}}</td>
                    <td>
                        <div v-if="book.category">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: book.category.id}}">{{book.category.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="book.author">
                            <router-link :to="{name: 'AuthorView', params: {authorId: book.author.id}}">{{book.author.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'BookView', params: {bookId: book.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'BookEdit', params: {bookId: book.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(book)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="booksApp.book.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-book-heading" v-bind:title="$t('booksApp.book.delete.question')">Are you sure you want to delete this Book?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-book" v-text="$t('entity.action.delete')" v-on:click="removeBook()">Delete</button>
            </div>
        </b-modal>
        <div v-if="books && books.length">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./my-book.component.ts">
</script>
