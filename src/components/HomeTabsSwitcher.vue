<template>
  <section class="home-tabs-switcher" @click="handleSwitcherClick">
    <span class="circle"></span>
    <p>{{ languageAlias }}</p>
    <span class="material-icons"> expand_more </span>

    <div v-if="showDropdown">
      <ul>
        <li @click="handleItemClick(v)" v-for="(v, i) in dropdown" :key="i">
          {{ v }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "HomeTabsSwitcher",
  props: {
    language: {
      type: String,
      default: "Javascript",
      validator: function (value) {
        return ["Javascript", "Java", "C##"].includes(value);
      },
    },
  },
  data() {
    return {
      showDropdown: false,
      dropdown: ["Javascript", "Java", "C##"],
    };
  },
  computed: {
    ...mapState({ languageAlias: "language" }),
  },
  methods: {
    handleSwitcherClick() {
      this.showDropdown = !this.showDropdown;
    },
    handleItemClick(v) {
      this.$store.dispatch("setLanguage", v);
    },
  },
});
</script>

<style lang="scss" scoped>
@function shadowColor($opacity, $dimensions) {
  @return $dimensions rgba(0, 0, 0, $opacity);
}

.home-tabs-switcher {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    margin-left: 10px;
    cursor: pointer;
  }

  .circle {
    width: 15px;
    height: 15px;
    background-color: red;
    display: block;
    border-radius: 50%;
  }

  div {
    background-color: #fff;
    padding: 10px;
    position: absolute;
    left: 5%;
    top: calc(100% + 10px);
    min-width: 100%;
    box-shadow: shadowColor(0.4, 1px 1px 5px);
    z-index: 1000;

    ul {
      li {
        padding: 8px;
        border-bottom: 1px dotted rgba(51, 51, 51, 0.548);

        &:last-of-type {
          border: none;
        }
      }
    }
  }
}
</style>
