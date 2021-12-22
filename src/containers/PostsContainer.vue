<template>
  <div v-if="!loading && posts">
    <div class="posts row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="post in posts" :key="post.id">
        <PostComponent :post="post"></PostComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {PostType} from '@/api/types/backend';
import PostComponent from '@/components/PostComponent.vue';

@Component({
  components: {
    PostComponent,
  },
})
export default class PostsContainer extends Vue {
  mounted(): void {
    this.$store.dispatch('backend/fetchPosts');
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
