<template>
  <section class="home-tabs">
    <div class="container">
      <div class="home-tabs__inner">
        <ul>
          <li
            @click="handleListItemClick(tab)"
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: currentTab === tab.id }"
          >
            <div
              class="border"
              v-if="
                putInErasedArray &&
                tab.name.toLowerCase() === 'erased questions'
              "
            ></div>
            {{ tab.name }}
          </li>
        </ul>
        <HomeTabsSwitcher />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

// LOGIC components
import HomeTabsSwitcher from "../components/HomeTabsSwitcher.vue";

import { Tab } from "../types/index";

export default Vue.extend({
  name: "HomeTabs",
  components: {
    HomeTabsSwitcher,
  },
  computed: {
    ...mapState(["putInErasedArray"]),
  },
  data() {
    return {
      tabs: [
        { name: "Audience Q&A", id: "audience", active: true },
        { name: "Erased Questions", id: "erased-questions", active: false },
      ],
      currentTab: "audience",
    };
  },
  methods: {
    handleListItemClick(tab: Tab) {
      this.currentTab = tab.id;

      this.$store.dispatch("setActiveTab", this.currentTab);
    },
  },
});
</script>

<style lang="scss" scoped>
@function color($color, $opacity: 0.5) {
  @return rgba($color, $opacity);
}
@function shadowColor($opacity, $dimensions) {
  @return $dimensions rgba(0, 0, 0, $opacity);
}

.home-tabs {
  background-color: color(#f4f4f4, 0.3);
  box-shadow: shadowColor(0.4, 1px 1px 5px);

  &__inner {
    font-size: 13px;
    font-weight: 700;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    ul {
      display: flex;
      padding-left: 0;
      margin-left: -10px;

      li {
        padding: 17px;
        margin-bottom: 1px;
        position: relative;
        overflow: hidden;
        cursor: pointer;

        .border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 9px solid rgba(#ecd08c, 1);
          animation: animBorder 0.6s ease-out forwards;
        }

        @keyframes animBorder {
          from {
            border: 9px solid rgba(#ecd08c, 1);
          }
          to {
            border: 1px solid rgba(#ecd08c, 1);
          }
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        &.active {
          color: rgba(35, 103, 166, 1);

          &::after {
            position: absolute;
            content: "";
            left: 0;
            right: 0;
            width: 100%;
            height: 1.5px;
            top: 98%;
            background-color: rgba(35, 103, 166, 1);
            z-index: 1;
          }
        }
      }
    }
  }
}
</style>
