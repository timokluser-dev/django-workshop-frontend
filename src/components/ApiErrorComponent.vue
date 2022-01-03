<template>
  <div class="alert alert-danger" role="alert">
    <div class="row px-2 mb-3">
      <div class="col d-flex align-items-center">
        Connection to Data Service failed. Please try again later.
      </div>
    </div>
    <div class="row" v-if="error">
      <div class="col">
        <button class="btn btn-light mb-2" type="button" @click="onTechnicalDetailsClick">
          <i class="bi bi-code-slash"></i>
          Technical Details
        </button>
        <div v-if="showTechnicalDetails">
          <div class="card card-body">
            <pre>{{ JSON.stringify(error) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class ApiErrorComponent extends Vue {
  @Prop() error!: Error | null;
  showTechnicalDetails = false;

  onTechnicalDetailsClick(): void {
    this.showTechnicalDetails = !this.showTechnicalDetails;
  }
}
</script>

<style scoped lang="scss">

</style>
