<template>
  <nav class="navbar navbar-dark bg-dark sticky-top">
    <div class="container-fluid d-flex justify-content-end">
      <a class="navbar-brand align-self-center clickable" @click="onNewClick">
        <i class="bi bi-plus-circle fs-3"></i>
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class AppHeaderComponent extends Vue {
  onNewClick(): void {
    this.$emit('newClick');
  }
}
</script>

<style scoped lang="scss">

</style>
