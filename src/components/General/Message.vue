<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Message",
});
</script>

<style lang="scss" scoped>
div {
  padding: 1rem;
  font-size: 20px;
}
</style>
