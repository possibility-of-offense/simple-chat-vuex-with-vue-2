<template>
  <header class="main-header">
    <div class="container">
      <div class="main-header__inner">
        <h1>{{ $store.state.language }}</h1>
        <div>
          <Button @click="handleClick">Add question</Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

// LOGIC components
import Button from "../components/General/Button.vue";

export default Vue.extend({
  name: "TheHeader",
  components: { Button },
  methods: {
    handleClick() {
      this.$emit("emitClick", true);
    },
  },
});
</script>

<style lang="scss" scoped>
@function shadowColor($opacity, $dimensions) {
  @return $dimensions rgba(0, 0, 0, $opacity);
}

.main-header {
  background-color: rgba(35, 103, 166, 1);
  padding: 1rem;

  box-shadow: shadowColor(0.4, 0px 1px 5px);

  &__inner {
    display: flex;
    align-items: center;

    h1 {
      color: #fff;

      & + div {
        margin-left: auto;
      }
    }
  }
}
</style>
