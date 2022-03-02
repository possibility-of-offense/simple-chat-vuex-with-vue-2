<template>
  <div class="home-tabs-panel-audience-moderation">
    <h2>Moderation turned {{ moderationMode ? "on" : "off" }}</h2>
    <button @click="handleClick">
      Turn {{ moderationMode ? "off" : "on" }} moderation
    </button>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  name: "HomeTabsPanelAudienceModeration",
  computed: {
    ...mapState(["moderationMode"]),
  },
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    handleClick() {
      this.clicked = !this.moderationMode;
      this.$emit("changeBackground", this.clicked);
      this.$store.dispatch("setModerationMode");
    },
  },
});
</script>

<style lang="scss" scoped>
.home-tabs-panel-audience-moderation {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: rgb(124, 120, 120);
  }

  button {
    display: inline-block;
    margin-top: 1rem;
    padding: 8px 15px;
    color: rgba(35, 103, 166, 1);
    border: none;
    background: transparent;
    box-shadow: 0.4px 0.1px 1px rgba(0, 0, 0.015);
    cursor: pointer;
  }
}
</style>
