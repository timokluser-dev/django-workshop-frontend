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
import {Component, Prop, Vue} from 'vue-property-decorator';
import {PostType} from "@/api/types/backend";
import PostComponent from "@/components/PostComponent.vue";
import VueMasonryWall from "vue-masonry-wall/src/vue-masonry-wall.vue";

@Component({
  components: {
    PostComponent,
    VueMasonryWall
  }
})
export default class PostsContainer extends Vue {
  mounted() {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
