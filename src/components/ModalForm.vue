<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">Your name</label>
    <input type="text" v-model="name" v-focus />

    <br />

    <label for="question">Your question</label>
    <textarea v-model="question" id="question"></textarea>

    <Button>Submit</Button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

// LOGIC components
import Button from "../components/General/Button.vue";
import { QuestionSubmission } from "../types/index";

export default Vue.extend({
  name: "ModalForm",
  components: {
    Button,
  },
  data() {
    return {
      name: "",
      question: "",
    };
  },
  methods: {
    handleSubmit() {
      const obj: QuestionSubmission = {
        name: this.name,
        question: this.question,
        newQuestion: true,
      };

      this.$store.dispatch("setNewQuestion", obj);
      this.$emit("formSubmitted");
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  height: 100%;

  label {
    display: block;
    font-size: 14px;
    color: #3d3d3d;
  }
  input,
  textarea {
    width: 100%;
    display: block;
    margin-top: 10px;
    padding: 1rem;
    border: 1px solid #ddd;
  }

  textarea {
    height: 50%;
  }

  button {
    margin-top: 10px;
  }
}
</style>
