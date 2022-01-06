<template>
  <div>
    <nav class="navbar navbar-dark bg-dark sticky-top">
      <div class="container-fluid d-flex justify-content-end">
        <template v-if="isLoggedIn">
          <a class="navbar-brand align-self-center clickable px-3" @click="onNewClick">
            <i class="bi bi-plus-circle fs-3"></i>
          </a>
          <a class="navbar-brand align-self-center clickable" @click="onLogoutClick">
            <i class="bi bi-box-arrow-right fs-3"></i>
          </a>
        </template>
        <template v-else>
          <a class="navbar-brand align-self-center clickable" @click="onLoginClick">
            <i class="bi bi-box-arrow-in-left fs-3"></i>
          </a>
        </template>
      </div>
    </nav>

    <NewPostModalContainer v-if="newVisible" @modalHidden="onModalHidden"></NewPostModalContainer>

    <LoginModalContainer v-if="loginVisible"></LoginModalContainer>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import NewPostModalContainer from "@/containers/NewPostModalContainer.vue";
import LoginModalContainer from "@/containers/LoginModalContainer.vue";

@Component({
  components: {
    LoginModalContainer,
    NewPostModalContainer
  }
})
export default class AppHeaderContainer extends Vue {
  newVisible = false;
  loginVisible = false;

  onNewClick(): void {
    this.newVisible = !this.newVisible;
  }

  onModalHidden(): void {
    this.newVisible = false;
  }

  onLoginClick(): void {
    this.loginVisible = !this.loginVisible;
  }

  onLogoutClick(): void {
    // TODO logout
  }

  get isLoggedIn(): boolean {
    // TODO get from store
    return false;
  }
}
</script>

<style scoped lang="scss">

</style>
