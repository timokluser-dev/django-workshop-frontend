<template>
  <div>
    <AppHeaderComponent @newClick="onNewClick"></AppHeaderComponent>

    <NewPostModalComponent v-if="newVisible" @modalHidden="onModalHidden"></NewPostModalComponent>

    <div class="home p-4">
      <PostsContainer></PostsContainer>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PostsContainer from '@/containers/PostsContainer.vue';
import AppHeaderComponent from "@/components/AppHeaderComponent.vue";
import NewPostModalComponent from "@/containers/NewPostModalContainer.vue";

@Component({
  components: {
    NewPostModalComponent,
    AppHeaderComponent,
    PostsContainer,
  },
})
export default class Home extends Vue {
  newVisible = false;

  onNewClick(): void {
    this.newVisible = !this.newVisible;
  }

  onModalHidden(): void {
    this.newVisible = false;
  }
}
</script>

<style scoped lang="scss"></style>
