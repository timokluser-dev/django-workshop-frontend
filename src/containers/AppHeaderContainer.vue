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

    <NewPostModalContainer v-if="newPostModalVisible || editPost" @modalHidden="onNewPostModalHidden"></NewPostModalContainer>

    <LoginModalContainer v-if="loginModalVisible" @modalHidden="onLoginModalHidden"></LoginModalContainer>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import NewPostModalContainer from "@/containers/NewPostModalContainer.vue";
import LoginModalContainer from "@/containers/LoginModalContainer.vue";
import {PostType} from "@/api/types/backend";

@Component({
  components: {
    LoginModalContainer,
    NewPostModalContainer
  }
})
export default class AppHeaderContainer extends Vue {
  newPostModalVisible = false;
  loginModalVisible = false;

  onNewClick(): void {
    this.newPostModalVisible = !this.newPostModalVisible;
  }

  onNewPostModalHidden(): void {
    this.newPostModalVisible = false;
  }

  onLoginModalHidden(): void {
    this.loginModalVisible = false;
  }

  onLoginClick(): void {
    this.loginModalVisible = !this.loginModalVisible;
  }

  onLogoutClick(): void {
    this.$store.dispatch('auth/logout');
  }

  get isLoggedIn(): boolean {
    return this.$store.getters['auth/isAuthenticated'];
  }

  get editPost(): PostType | null {
    return this.$store.getters['backend/postToEdit'];
  }
}
</script>

<style scoped lang="scss">

</style>
