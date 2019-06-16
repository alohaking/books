<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="booksApp.book.home.createOrEditLabel" v-text="$t('booksApp.book.home.createOrEditLabel')">Create or edit a Book</h2>
                <div>
                    <div class="form-group" v-if="book.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="book.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('booksApp.book.name')" for="book-name">Name</label>
                        <input type="text" class="form-control" name="name" id="book-name"
                            :class="{'valid': !$v.book.name.$invalid, 'invalid': $v.book.name.$invalid }" v-model="$v.book.name.$model"  required/>
                        <div v-if="$v.book.name.$anyDirty && $v.book.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.book.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('booksApp.book.description')" for="book-description">Description</label>
                        <input type="text" class="form-control" name="description" id="book-description"
                            :class="{'valid': !$v.book.description.$invalid, 'invalid': $v.book.description.$invalid }" v-model="$v.book.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('booksApp.book.showTime')" for="book-showTime">Show Time</label>
                        <div class="input-group">
                            <input id="book-showTime" type="date" class="form-control" name="showTime"  :class="{'valid': !$v.book.showTime.$invalid, 'invalid': $v.book.showTime.$invalid }"
                            v-model="$v.book.showTime.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('booksApp.book.category')" for="book-category">Category</label>
                        <select class="form-control" id="book-category" name="category" v-model="book.category" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="book.category && categoryOption.id === book.category.id ? book.category : categoryOption" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('booksApp.book.author')" for="book-author">Author</label>
                        <select class="form-control" id="book-author" name="author" v-model="book.author" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="book.author && authorOption.id === book.author.id ? book.author : authorOption" v-for="authorOption in authors" :key="authorOption.id">{{authorOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('booksApp.book.label')" for="book-label">Label</label>
                        <select class="form-control" id="book-label" multiple name="label" v-model="book.labels">
                            <option v-bind:value="getSelected(book.labels, labelOption)" v-for="labelOption in labels" :key="labelOption.id">{{labelOption.label}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.book.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./book-update.component.ts">
</script>
