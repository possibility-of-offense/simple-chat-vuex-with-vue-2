<template>
  <div class="outer" @click.self="handleClick">
    <div class="inner box-shadow">
      <slot>Default content</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    handleClick() {
      this.$emit("closeModal", true);
    },
  },
};
</script>

<style lang="scss" scoped>
div.outer {
  background-color: rgba(221, 221, 221, 0.425);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .inner {
    background-color: #fff;
    padding: 1.5rem;
    padding-bottom: 3rem;
    width: 600px;
    height: 60%;
    overflow: auto;
  }
}
</style>
