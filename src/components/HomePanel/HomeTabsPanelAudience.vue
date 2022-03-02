<template>
  <section class="home-tabs-panel">
    <div class="container">
      <HomeTabsPanelAudienceModeration
        class="home-tabs-panel__left"
        :class="addClass"
        @changeBackground="handleChangeBackground"
        ref="moderation"
      />
      <HomeTabsPanelAudienceQuestions
        ref="cur-list"
        @scroll="handleScroll"
        class="home-tabs-panel__right"
      />
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

import HomeTabsPanelAudienceModeration from "../HomePanel/HomeTabsPanelAudienceModeration.vue";
import HomeTabsPanelAudienceQuestions from "../HomePanel/HomeTabsPanelAudienceQuestions.vue";

export default Vue.extend({
  name: "HomeTabsPanels",
  components: {
    HomeTabsPanelAudienceModeration,
    HomeTabsPanelAudienceQuestions,
  },
  data() {
    return {
      change: false,
      moderation: null,
    };
  },
  computed: {
    ...mapState(["moderationMode"]),
    addClass() {
      if (this.change) {
        return "greenify";
      } else if (this.moderationMode) {
        return "greenify";
      }

      return "redish";
    },
  },
  methods: {
    handleChangeBackground(val) {
      if (val) {
        this.change = true;
      } else {
        this.change = false;
      }
    },
    handleScroll(val = "") {
      this.$nextTick(function () {
        if (val) {
          this.$refs["cur-list"].$el.scrollTop =
            this.$refs["cur-list"].$el.scrollHeight + "100";
        }
      });
    },
  },
  mounted() {
    this.handleScroll(true);
  },
});
</script>

<style lang="scss" scoped>
.home-tabs-panel {
  height: 80vh;
  margin-top: 1rem;
  margin-bottom: 3rem;

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    height: 100%;
  }

  .redish {
    background-color: rgba(red, 0.2);
  }

  &__left,
  &__right {
    height: 100%;
    background-color: #fff;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    overflow: auto;
  }

  .greenify {
    background-color: rgba(17, 221, 17, 0.336);
  }
}
</style>
