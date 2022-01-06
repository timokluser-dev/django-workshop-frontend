<template>
  <div id="app container-fluid">
    <router-view />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class App extends Vue {
  mounted(): void {
    this.$store.dispatch('auth/fetchProfile');
  }
}
</script>

<style lang="scss">
@import 'style';
</style>
