<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="booksApp.author.home.createOrEditLabel" v-text="$t('booksApp.author.home.createOrEditLabel')">Create or edit a Author</h2>
                <div>
                    <div class="form-group" v-if="author.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="author.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('booksApp.author.name')" for="author-name">Name</label>
                        <input type="text" class="form-control" name="name" id="author-name"
                            :class="{'valid': !$v.author.name.$invalid, 'invalid': $v.author.name.$invalid }" v-model="$v.author.name.$model"  required/>
                        <div v-if="$v.author.name.$anyDirty && $v.author.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.author.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.author.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./author-update.component.ts">
</script>
