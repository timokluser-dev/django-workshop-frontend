<template>
  <div class="home p-4">
    <PostsContainer></PostsContainer>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PostsContainer from '@/containers/PostsContainer.vue';

@Component({
  components: {
    PostsContainer,
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss"></style>
