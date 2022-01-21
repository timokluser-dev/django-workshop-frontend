<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Post</h5>
          <button type="button" class="btn-close" @click="onCloseClick"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="name" placeholder="My Fist Post"
                     v-model="form.title">
              <label for="name">Title</label>
            </div>
            <div class="form-floating mb-3">
              <select class="form-select" id="categories" v-model="form.category">
                <option :value="category.id" v-for="category in categories" :key="category.id">
                  {{ category.name }}
                </option>
              </select>
              <label for="categories">Category</label>
            </div>
            <div class="form-floating mb-3">
              <textarea class="form-control" id="text" placeholder="This is my post about ..."
                        v-model="form.text"></textarea>
              <label for="text">Text</label>
            </div>
            <div class="mb-3">
              <label for="keywords" class="col-form-label">Keywords:</label>
              <select class="form-select" multiple id="keywords" v-model="form.keywords">
                <option :value="keyword.id" v-for="keyword in keywords" :key="keyword.id">
                  {{ keyword.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Post Image:</label>
              <input class="form-control" type="file" id="image" accept="image/*" @change="onImageChange($event)">
            </div>
            <div class="mb-3">
              <img src="" class="image-preview" :class="(!form.image) ? 'd-none': ''" alt="preview"
                   ref="imagePreview">
            </div>

            <input type="submit" class="d-none">
          </form>

          <div class="row mt-4" v-if="formError">
            <div class="col d-flex justify-content-center">
              <p class="text-danger d-block mb-0">Oops! Please fill out all information.</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" :class="(formDisabled) ? 'disabled' : ''"
                  @click.prevent="onSubmit">
            Save Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CategoryType, CreatePost, KeywordType, PostInput, PostType, UpdatePost} from "@/api/types/backend";
import {nullOrEmpty} from "@/helpers";
import {Modal} from "bootstrap";

@Component
export default class NewPostModalContainer extends Vue {
  modal: Element | null = null;
  bsModal: Modal | null = null;
  previewImageFileReader: FileReader | null = null;

  form = {
    title: '',
    category: '',
    keywords: [],
    text: '',
    image: ''
  }
  formError = false;
  formDisabled = false;

  mounted(): void {
    this.$store.dispatch('backend/fetchCategories');
    this.$store.dispatch('backend/fetchKeywords');

    if (this.editPost) {
      this.form.title = this.editPost.name;
      this.form.category = this.editPost.category.id;
      this.form.keywords = this.editPost.keywords.map(k => k.id) as never[] ?? [];
      this.form.text = this.editPost.text ?? '';
      this.form.image = this.editPost.image ?? '';
      if (this.editPost.image) {
        this.setImagePreview(`${process.env.VUE_APP_MEDIA_URI}${this.editPost.image}`);
      }
    }

    this.modal = this.$refs.modal as Element;
    this.bsModal = new Modal(this.modal, {focus: true, keyboard: false, backdrop: 'static'});
    this.bsModal.show();

    this.previewImageFileReader = new FileReader();
    this.previewImageFileReader.onload = this.onFileReaderLoad;

    this.modal.addEventListener('hidden.bs.modal', this.onModalHidden);
  }

  hideModal(): void {
    if (this.editPost) {
      this.$store.commit('backend/setPostToEdit', null);
    }
    this.bsModal?.hide();
  }

  onCloseClick(): void {
    this.hideModal();
  }

  onModalHidden(): void {
    this.$emit('modalHidden');
  }

  // eslint-disable-next-line
  onFileReaderLoad($event: any): void {
    const src = $event.target?.result as string;
    this.setImagePreview(src);
  }

  // eslint-disable-next-line
  onImageChange($event: any): void {
    this.form.image = $event.target.files[0];

    this.previewImageFileReader?.readAsDataURL(this.form.image as unknown as Blob);
  }

  async onSubmit(): Promise<void> {
    this.formDisabled = true;
    if (!nullOrEmpty(this.form.title) && !nullOrEmpty(this.form.text) && !nullOrEmpty(this.form.category) &&
        this.form.keywords.length > 0) {
      const post: PostInput = {
        name: this.form.title ?? '',
        text: this.form.text ?? '',
        category: this.form.category ?? '',
        keywords: this.form.keywords,
      }

      if (this.editPost) {
        const isPreviousImage = (this.form.image === this.editPost.image);
        if (isPreviousImage) {
          post.image = this.editPost.image;
        }
        const update: UpdatePost = await this.$store.dispatch('backend/updatePost', {
          id: this.editPost.id,
          post: post
        });
        if (update.success) {
          if (isPreviousImage || nullOrEmpty(post.image as string)) {
            this.hideModal();
            return;
          }
          this.$store.dispatch('backend/uploadPostImage', {
            id: update.formData?.id,
            image: this.form.image
          }).then(
              () => {
                this.hideModal();
              },
              () => {
                this.formError = true;
                this.formDisabled = false;
              }
          );
        }
      } else {
        const create: CreatePost = await this.$store.dispatch('backend/createPost', post);
        if (create.success) {
          if (!this.form.image) {
            this.hideModal();
            return;
          }
          this.$store.dispatch('backend/uploadPostImage', {
            id: create.formData?.id,
            image: this.form.image
          }).then(
              () => {
                this.hideModal();
              },
              () => {
                this.formError = true;
                this.formDisabled = false;
              }
          );
        } else {
          this.formError = true;
          this.formDisabled = false;
        }
      }
    } else {
      this.formError = true;
      this.formDisabled = false;
    }
  }

  setImagePreview(src: string): void {
    (this.$refs.imagePreview as HTMLImageElement).src = src;
  }

  get categories(): CategoryType[] | null {
    return this.$store.getters['backend/categories'];
  }

  get keywords(): KeywordType[] | null {
    return this.$store.getters['backend/keywords'];
  }

  get editPost(): PostType | null {
    return this.$store.getters['backend/postToEdit'];
  }
}
</script>

<style scoped lang="scss">
textarea.form-control {
  height: 100px;
}

.image-preview {
  max-width: 100%;
}
</style>
