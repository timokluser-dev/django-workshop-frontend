<template>
  <section>
    <api-error-component :error="error" v-if="failed"></api-error-component>

    <div v-if="!loading && posts">
      <div class="posts row">
        <div class="col-sm-6 col-lg-4 mb-4" v-for="post in posts" :key="post.id">
          <PostComponent :post="post" :editable="post.writtenBy && me && post.writtenBy.id === me.id"></PostComponent>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {PostType} from '@/api/types/backend';
import PostComponent from '@/components/PostComponent.vue';
import Masonry from 'masonry-layout';
import ApiErrorComponent from "@/components/ApiErrorComponent.vue";
import {Me} from "@/store/auth/models";

@Component({
  components: {
    ApiErrorComponent,
    PostComponent,
  },
})
export default class PostsContainer extends Vue {
  async mounted(): Promise<void> {
    await this.$store.dispatch('backend/fetchPosts');
    await this.$store.dispatch('auth/fetchProfile');
    (!this.failed) && new Masonry('.posts', {});
  }

  get loading(): boolean {
    return this.$store.getters['backend/postsLoading'];
  }

  get failed(): boolean {
    return this.$store.getters['backend/postsFailed'];
  }

  get error(): Error | null {
    return this.$store.getters['backend/postsError'];
  }

  get posts(): PostType[] {
    return this.$store.getters['backend/posts'];
  }

  get me(): Me | null {
    return this.$store.getters['auth/me'];
  }
}
</script>

<style scoped lang="scss"></style>
