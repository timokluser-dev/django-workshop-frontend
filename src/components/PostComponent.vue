<template>
  <div class="card m-1">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="mb-0">{{ post.category.name }}</h5>

      <i class="bi bi-pencil clickable" v-if="editable" @click.prevent="onEditClick"></i>
    </div>
    <img class="card-img" alt="Post image" v-if="image" :src="image"/>
    <div class="card-body">
      <h3 class="card-title">{{ post.name }}</h3>
      <p class="card-text mb-1">{{ post.text }}</p>

      <p class="text-muted fst-italic mb-2">by {{ post.writtenBy.username }} at {{ date }}</p>

      <span
          class="badge rounded-pill bg-dark me-2"
          v-for="keyword in post.keywords"
          :key="keyword.id"
      >
        {{ keyword.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {PostType} from '@/api/types/backend';
import moment from "moment";

@Component
export default class PostComponent extends Vue {
  @Prop() post!: PostType;
  @Prop() editable!: boolean;

  get image(): string | null {
    return this.post.image ? `${process.env.VUE_APP_MEDIA_URI}${this.post.image}` : null;
  }

  get date(): string {
    return (this.post.datePublished !== this.post.dateModified) ? `${this.formatDate(this.post.dateModified)} (edited)` : `${this.formatDate(this.post.datePublished)}`
  }

  formatDate(date: Date): string {
    return moment(date).format("MM/DD/yyyy, h:mm:ss a");
  }

  onEditClick(): void {
    this.$store.commit('backend/setPostToEdit', this.post);
  }
}
</script>

<style scoped lang="scss">
</style>
