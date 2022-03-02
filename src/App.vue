<template>
  <div id="app">
    <TheHeader @emitClick="handleEmitClick" />
    <HomeTabs />

    <Modal v-if="showModal" @closeModal="handleCloseModal">
      <ModalForm @formSubmitted="handleCloseModal"></ModalForm>
    </Modal>

    <component :is="active"></component>
  </div>
</template>

<script>
// LOGIC components
import TheHeader from "../src/components/TheHeader.vue";
import HomeTabs from "../src/components/HomeTabs.vue";
import HomeTabsPanelAudience from "../src/components/HomePanel/HomeTabsPanelAudience.vue";
import HomeTabsPanelErased from "../src/components/HomePanel/HomeTabsPanelErased.vue";
import Modal from "../src/components/General/Modal.vue";
import ModalForm from "../src/components/ModalForm.vue";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    TheHeader,
    HomeTabs,
    HomeTabsPanelAudience,
    HomeTabsPanelErased,
    Modal,
    ModalForm,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState({
      active(state) {
        if (state.activeTab === "audience") {
          return "HomeTabsPanelAudience";
        } else {
          return "HomeTabsPanelErased";
        }
      },
    }),
  },
  methods: {
    handleEmitClick(val) {
      this.showModal = val;
    },
    handleCloseModal() {
      this.showModal === true
        ? (this.showModal = false)
        : (this.showModal = true);
    },
  },
};
</script>

<style lang="scss"></style>
