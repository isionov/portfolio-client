import Vue from "vue";
import axios from "axios";
import { getSkillsArr } from "cusomScripts/api.js";

const skill = {
  template: "#skill",
  props: {
    skillPercent: Number,
    skillName: String
  },
  methods: {
    drawColoredCircle() {
      const circle = this.$refs["colored-circle"];
      const dashOffset = parseFloat(
        getComputedStyle(circle).getPropertyValue("stroke-dashoffset")
      );

      circle.style.strokeDasharray =
        dashOffset * (1 + this.skillPercent / 100) + "%";
    }
  },
  mounted() {
    this.drawColoredCircle();
  }
};

const skillsRow = {
  template: "#skills-row",
  components: {
    skill
  },
  props: {
    skill: Object
  }
};

new Vue({
  el: "#skills-component",
  template: "#skills-list",
  components: {
    skillsRow
  },
  data() {
    return {
      skills: {},
      categories: [],
      allSkills: []
    };
  },
  async created() {
    this.skills = await getSkillsArr();
  },

  mounted() {}
});
