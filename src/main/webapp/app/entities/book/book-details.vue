<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="book">
                <h2 class="jh-entity-heading"><span v-text="$t('booksApp.book.detail.title')">Book</span> {{book.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('booksApp.book.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{book.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('booksApp.book.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{book.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('booksApp.book.showTime')">Show Time</span>
                    </dt>
                    <dd>
                        <span>{{book.showTime}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('booksApp.book.category')">Category</span>
                    </dt>
                    <dd>
                        <div v-if="book.category">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: book.category.id}}">{{book.category.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('booksApp.book.author')">Author</span>
                    </dt>
                    <dd>
                        <div v-if="book.author">
                            <router-link :to="{name: 'AuthorView', params: {authorId: book.author.id}}">{{book.author.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('booksApp.book.label')">Label</span>
                    </dt>
                    <dd>
                        <span v-for="(label, i) in book.labels" :key="label.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'LabelView', params: {labelId: label.id}}">{{label.label}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="book.id" :to="{name: 'BookEdit', params: {bookId: book.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./book-details.component.ts">
</script>
