<template>
  <button v-on="$listeners" class="box-shadow"><slot></slot></button>
</template>

<script>
export default {
  name: "Button",
  methods: {
    handleClick() {
      this.$emit("emitClick");
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  align-items: stretch;
  background: #fff;
  border: 0;
  display: inline-flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  height: auto;
  line-height: 1.715em;
  min-height: 2.57 2em;
  padding: 4px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  width: auto;

  border-radius: 5px;
  cursor: pointer;
}
</style>
