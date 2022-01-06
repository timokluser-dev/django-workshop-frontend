<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h3>Login</h3>
          <form class="pt-3" @submit.prevent="onSubmit">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="username" placeholder="john.doe" v-model="form.username">
              <label for="username" class="form-label">Username</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" id="password" placeholder="sEcR3t" v-model="form.password">
              <label for="password" class="form-label">Password</label>
            </div>

            <!-- error -->
            <div class="row mt-4" v-if="error">
              <div class="col d-flex justify-content-center">
                <p class="text-danger d-block mb-0">{{ error }}</p>
              </div>
            </div>

            <input type="submit" class="d-none">
          </form>
        </div>
        <div class="modal-footer pt-0">
          <button type="submit" class="btn btn-primary w-100" @click.prevent="onSubmit">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Modal} from "bootstrap";
import {nullOrEmpty} from "@/helpers";
import {LoginInput} from "@/api/types/mutations";

@Component
export default class LoginModalContainer extends Vue {
  modal: Element | null = null;
  bsModal: Modal | null = null;

  form: LoginInput = {
    username: '',
    password: ''
  }

  mounted(): void {
    this.modal = this.$refs.modal as Element;
    this.bsModal = new Modal(this.modal, {focus: true, keyboard: true});
    this.bsModal.show();

    this.modal.addEventListener('hidden.bs.modal', this.onModalHidden);
  }

  hideModal(): void {
    this.bsModal?.hide();
  }

  onCloseClick(): void {
    this.hideModal();
  }

  onModalHidden(): void {
    this.$emit('modalHidden');
  }

  async onSubmit(): Promise<void> {
    if (!nullOrEmpty(this.form.username) && !nullOrEmpty(this.form.password)) {
      await this.$store.dispatch('auth/loginUser', this.form);
      if (this.$store.getters['auth/isAuthenticated'])
        this.hideModal();
    } else {
      this.error = 'Please enter username and password.';
    }
  }

  get error(): string | null {
    return this.$store.getters['auth/error'];
  }

  set error(error: string | null) {
    this.$store.commit('auth/setError', error);
  }
}
</script>

<style scoped lang="scss">
</style>
