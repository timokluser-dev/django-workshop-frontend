<template>
  <div>
    <AppHeaderContainer></AppHeaderContainer>

    <div class="home p-4">
      <PostsContainer></PostsContainer>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PostsContainer from '@/containers/PostsContainer.vue';
import AppHeaderContainer from "@/containers/AppHeaderContainer.vue";
import NewPostModalComponent from "@/containers/NewPostModalContainer.vue";

@Component({
  components: {
    NewPostModalComponent,
    AppHeaderContainer,
    PostsContainer,
  },
})
export default class Home extends Vue {
}
</script>

<style scoped lang="scss"></style>
