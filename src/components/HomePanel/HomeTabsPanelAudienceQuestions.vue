<template>
  <div class="home-tabs-panel-audience-questions">
    <HomePanelQuestionsActive
      key="cur"
      :questions="questions"
      :erased-questions="erasedQuestions"
      @scroll="handleScroll"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

// LOGIC components
import HomePanelQuestionsActive from "../HomePanel/HomePanelQuestionsActive.vue";

export default {
  name: "HomeTabsPanelAudienceQuestions",
  components: { HomePanelQuestionsActive },

  computed: {
    ...mapState({
      questions: "currentQuestions",
      erasedQuestions: "erasedQuestions",
    }),
  },
  methods: {
    handleScroll() {
      this.$emit("scroll", true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
