<template>
  <div class="container" ref="erased">
    <HomePanelQuestionsActive
      key="cur"
      :questions="questions"
      :erased-questions="erasedQuestions"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

// LOGIC components
import HomePanelQuestionsActive from "../HomePanel/HomePanelQuestionsActive.vue";

export default {
  name: "HomeTabsPanelErased",
  components: { HomePanelQuestionsActive },

  computed: {
    ...mapState({
      questions: "currentQuestions",
      erasedQuestions: "erasedQuestions",
    }),
  },
  methods: {
    handleScroll() {
      console.log(this.$refs["erased"]);
      this.$nextTick(function () {
        this.$refs["erased"].scrollTop = this.$refs["erased"].scrollHeight;
      });
    },
  },
  mounted() {
    this.handleScroll();
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 5px;
  overflow: auto;
  height: 70vh;
}
</style>
