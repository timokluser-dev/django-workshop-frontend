<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">{{ post.category.name }}</h5>
    </div>
    <img class="card-img-top" alt="Post image" v-if="image" :src="image" />
    <div class="card-body">
      <h3 class="card-title">{{ post.name }}</h3>
      <p class="card-text mb-2">{{ post.text }}</p>

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

@Component
export default class PostComponent extends Vue {
  @Prop() post!: PostType;

  get image(): string | null {
    return this.post.image ? `${process.env.VUE_APP_MEDIA_URI}${this.post.image}` : null;
  }
}
</script>

<style scoped lang="scss"></style>
