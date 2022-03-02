<template>
  <div v-bind="$attrs">
    <template v-if="activeTab === 'audience'">
      <ul v-if="questions.length" :class="{ moderator: moderationMode }">
        <li
          v-for="(v, i) in questions"
          :key="i"
          :class="{ golden: v.favourite }"
        >
          <div class="new-label box-shadow" v-if="v.newQuestion">New</div>

          <div class="user">
            <span class="material-icons"> person </span>
          </div>
          <div class="name">
            <div class="star" @click="handleStarClick(v.id)">
              <span class="material-icons"> star_border </span>
            </div>
            {{ v.name }}
          </div>

          <div
            class="question"
            :style="{ cursor: moderationMode ? 'pointer' : '' }"
          >
            <p @click.self="handleEdit(v.id)">{{ v.question }}</p>
            <form
              @submit.prevent="handleSubmit($event, v)"
              :ref="`form-${v.id}`"
            >
              <br />
              <textarea :value="v.question"></textarea>
              <button>Edit</button>
            </form>
          </div>

          <div class="erase" @click="handleDelete(v)">
            <span class="material-icons"> check_circle_outline </span>
          </div>
        </li>
      </ul>
      <div v-else>
        <Message>No questions</Message>
      </div>
    </template>
    <template v-else-if="activeTab === 'erased-questions'">
      <ul v-if="erasedQuestions.length">
        <li v-for="(v, i) in erasedQuestions" :key="i">
          <div class="user">
            <span class="material-icons"> person </span>
          </div>
          <div class="name">{{ v.name }}</div>

          <div class="question">
            {{ v.question }}
          </div>

          <div class="erased">
            <span class="material-icons"> task_alt </span>
          </div>
        </li>
      </ul>
      <div v-else>
        <Message>No questions</Message>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

// LOGIC components
import Message from "../General/Message.vue";

export default Vue.extend({
  name: "HomePanelQuestionsActive",
  components: { Message },
  props: {
    questions: {
      type: Array,
    },
    erasedQuestions: {
      type: Array,
    },
  },
  data() {
    return {
      form: null,
    };
  },
  computed: {
    ...mapState(["activeTab", "moderationMode"]),
  },
  methods: {
    handleDelete(v) {
      this.$store.dispatch("deleteQuestion", v);
    },
    handleEdit(v) {
      if (!this.moderationMode) {
        return;
      }
      this.$nextTick(() => {
        const found = Object.entries(this.$refs).find((el) => {
          const split = el[0].split("-");
          if (Number(split[1]) === v) {
            return el;
          }
        });

        found[1][0].classList.toggle("show-form");
      });
    },
    handleSubmit(e, v) {
      const trg = e.target[0].value;

      this.$store.dispatch("editQuestion", {
        id: v.id,
        question: trg,
      });

      this.$nextTick(() => {
        const found = Object.entries(this.$refs).find((el) => {
          const split = el[0].split("-");
          if (Number(split[1]) === v.id) {
            return el;
          }
        });

        found[1][0].classList.toggle("show-form");
      });
    },
    handleStarClick(id) {
      this.$store.dispatch("setFavourite", id);
    },
  },
  watch: {
    questions(newValue) {
      this.$emit("scroll");
    },
    moderationMode(newValue) {
      if (newValue === false) {
        this.$nextTick(function () {
          Object.values(this.$refs).forEach((el) => {
            el[0].classList.remove("show-form");
          });
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.user {
  background-color: #f4f4f4;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-block;
  display: grid;
  place-content: center;
}

.star span {
  cursor: pointer;
  user-select: none;
}

.new-label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(red, 0.9);
  padding: 6px 20px;
  border-radius: 0 0 5px 5px;
  color: #fff;
  font-weight: bold;
}

form {
  display: none;

  &.show-form {
    display: flex;
    flex-direction: column;
  }
  textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
  }

  button {
    display: inline-block;
    align-self: flex-end;
    padding: 5px 20px;
    margin: 5px;
  }
}

.name {
  align-self: center;
  font-size: 14px;
  color: rgb(190, 189, 189);
}

.question {
  margin-top: 10px;
  grid-column: 1 / -1;
  font-size: 15px;
}

.erase,
.erased {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: green;
}

.erase {
  user-select: none;
}

.erased {
  color: red;
}

ul {
  &.moderator {
    li {
      .question p {
        color: rgb(177, 173, 173);
        font-style: italic;
        text-decoration: underline;
      }
    }
  }

  li {
    border-bottom: 1px solid #ddd;
    padding: 0.6rem;

    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 8px;

    position: relative;

    &.golden {
      background-color: #ecd08c;

      .star span {
        color: #fff;
      }
    }
  }
}
</style>
