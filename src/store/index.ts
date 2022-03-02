import Vue from "vue";
import Vuex from "vuex";

import { languages, Question, QuestionSubmission } from "../types/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeTab: "audience",
    language: "Javascript" as languages,
    currentQuestions: <Array<Question>>[
      {
        id: 1,
        name: "Gosho 1",
        question: "Stupid question",
        favourite: false,
      },
      {
        id: 2,
        name: "Gosho 2",
        question: "Stupid question 3",
        favourite: false,
      },
      {
        id: 3,
        name: "Gosho 3",
        question: "Stupid question 123123",
        favourite: false,
      },
      {
        id: 4,
        name: "Gosho 1",
        question: "Stupid question",
        favourite: false,
      },
      {
        id: 5,
        name: "Gosho 2",
        question: "Stupid question 3",
        favourite: false,
      },
      {
        id: 6,
        name: "Gosho 3",
        question: "Stupid question 123123",
        favourite: false,
      },
      {
        id: 7,
        name: "Gosho 2",
        question: "Stupid question 3",
        favourite: false,
      },
      {
        id: 8,
        name: "Gosho 3",
        question: "Stupid question 123123",
        favourite: false,
      },
    ],
    erasedQuestions: <Array<Question>>[],
    putInErasedArray: false,
    moderationMode: false,
  },
  getters: {},
  mutations: {
    SET_ACTIVE_TAB(state, payload: string) {
      state.activeTab = payload;
    },
    SET_LANGUAGE(state, payload: languages) {
      state.language = payload;
    },

    // NEW LOGIC
    DELETE_QUESTION(state, payload) {
      state.erasedQuestions.push(payload);
    },
    SET_PUT_IN_ERASED_ARRAY(state) {
      state.putInErasedArray = true;
      setTimeout(() => {
        state.putInErasedArray = false;
      }, 800);
    },

    // NEW LOGIC
    SET_MODERATION_MODE(state) {
      state.moderationMode = !state.moderationMode;
    },

    // NEW LOGIC
    SET_EDIT_QUESTION(state, payload) {
      const found = state.currentQuestions.find((el) => el.id === payload.id);
      if (found) {
        found.question = payload.question;
      }
    },

    // NEW LOGIC
    SET_FAVOURITE_QUESTION(state, payload) {
      const findInd = state.currentQuestions.findIndex(
        (el) => el.id === payload
      );

      const prop = "favourite";
      const hasProp = state.currentQuestions[findInd].hasOwnProperty(prop);

      if (hasProp) {
        state.currentQuestions[findInd].favourite =
          !state.currentQuestions[findInd].favourite;
      } else {
        state.currentQuestions[findInd].favourite = true;
      }
    },

    SET_NEW_QUESTION(state, payload) {
      const lastEl = state.currentQuestions.slice().pop();
      delete lastEl?.newQuestion;

      let lastInd: number | undefined = lastEl?.id;

      state.currentQuestions.push({
        id: lastInd ? ++lastInd : Math.floor(Math.random() * 10000 + 1),
        name: payload.name,
        question: payload.question,
        favourite: false,
        newQuestion: payload.newQuestion,
      });
    },
  },
  actions: {
    setActiveTab({ commit }, payload: string) {
      commit("SET_ACTIVE_TAB", payload);
    },
    setLanguage({ commit }, payload: languages) {
      commit("SET_LANGUAGE", payload);
    },

    // NEW LOGIC
    deleteQuestion({ state, commit }, payload: Question) {
      const findInd = state.currentQuestions.findIndex(
        (el) => el.id === payload.id
      );

      const deleted = state.currentQuestions.splice(findInd, 1);

      commit("DELETE_QUESTION", ...deleted);
      commit("SET_PUT_IN_ERASED_ARRAY");
    },

    // NEW LOGIC
    setModerationMode({ commit }) {
      commit("SET_MODERATION_MODE");
    },
    editQuestion({ state, commit }, payload) {
      commit("SET_EDIT_QUESTION", {
        id: payload.id,
        question: payload.question,
      });
    },

    // NEW LOGIC
    setFavourite({ state, commit }, payload) {
      commit("SET_FAVOURITE_QUESTION", payload);
    },
    setNewQuestion({ commit }, payload: QuestionSubmission) {
      commit("SET_NEW_QUESTION", payload);
    },
  },
  modules: {},
});
