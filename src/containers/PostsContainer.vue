<template>
  <div v-if="!loading && posts">
    <div class="posts row">
      <div class="col-sm-6 col-lg-4 mb-4" v-for="post in posts" :key="post.id">
        <PostComponent :post="post"></PostComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {PostType} from '@/api/types/backend';
import PostComponent from '@/components/PostComponent.vue';
import Masonry from 'masonry-layout';

@Component({
  components: {
    PostComponent,
  },
})
export default class PostsContainer extends Vue {
  async mounted(): Promise<void> {
    await this.$store.dispatch('backend/fetchPosts');
    new Masonry('.posts', {});
  }

  get loading(): boolean {
    return this.$store.getters['backend/postsLoading'];
  }

  get posts(): PostType[] {
    return this.$store.getters['backend/posts'];
  }
}
</script>

<style scoped lang="scss"></style>
