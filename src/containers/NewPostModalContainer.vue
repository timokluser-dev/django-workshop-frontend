<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Post</h5>
          <button type="button" class="btn-close" @click="onCloseClick"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="name" placeholder="My Fist Post"
                     v-model="form.title">
              <label for="name">Title</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="author" placeholder="Author" readonly="readonly"
                     v-model="form.author">
              <label for="author">Author</label>
            </div>
            <div class="form-floating mb-3">
              <select class="form-select" id="categories" v-model="form.category">
                <option :value="category.id" v-for="category in categories" :key="category.id">
                  {{ category.name }}
                </option>
              </select>
              <label for="categories">Category</label>
            </div>
            <div class="mb-3">
              <label for="keywords" class="col-form-label">Keywords:</label>
              <select class="form-select" multiple id="keywords" v-model="form.keywords">
                <option :value="keyword.id" v-for="keyword in keywords" :key="keyword.id">
                  {{ keyword.name }}
                </option>
              </select>
            </div>
            <div class="form-floating mb-3">
              <textarea class="form-control" id="text" placeholder="This is my post about ..."
                        v-model="form.text"></textarea>
              <label for="text">Text</label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click.prevent="onSubmit">Create Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CategoryType, KeywordType} from "@/api/types/backend";
import {PostMutationInput} from "@/api/types/mutations";
import {nullOrEmpty} from "@/helpers";
import {Modal} from "bootstrap";

@Component
export default class NewPostModalContainer extends Vue {
  modal: Element | null = null;
  bsModal: Modal | null = null;

  form = {
    title: null,
    author: '1',
    category: null,
    keywords: [],
    text: null
  }

  mounted(): void {
    this.$store.dispatch('backend/fetchCategories');
    this.$store.dispatch('backend/fetchKeywords');

    this.modal = this.$refs.modal as Element;
    this.bsModal = new Modal(this.modal, {focus: true, keyboard: false, backdrop: 'static'});
    this.bsModal.show()

    this.modal.addEventListener('hidden.bs.modal', this.onModalHidden);
  }

  hideModal(): void {
    this.bsModal?.hide();
  }

  onCloseClick(): void {
    this.hideModal();
  }

  onModalHidden(): void {
    this.$emit('modalHidden');
  }

  async onSubmit(): Promise<void> {
    if (!nullOrEmpty(this.form.title) && !nullOrEmpty(this.form.text) && !nullOrEmpty(this.form.category) &&
        !nullOrEmpty(this.form.author) && this.form.keywords.length > 0) {

      const post: PostMutationInput = {
        name: this.form.title ?? '',
        text: this.form.text ?? '',
        category: this.form.category ?? '',
        writtenBy: this.form.author ?? '',
        keywords: this.form.keywords,
      }

      const success = await this.$store.dispatch('backend/createPost', post);
      if (success) {
        this.hideModal();
      }
    }

  }

  get categories(): CategoryType[] | null {
    return this.$store.getters['backend/categories'];
  }

  get keywords(): KeywordType[] | null {
    return this.$store.getters['backend/keywords'];
  }
}
</script>

<style scoped lang="scss">
textarea.form-control {
  height: 100px;
}
</style>
