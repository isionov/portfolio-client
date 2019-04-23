import Vue from "vue";
import axios from "axios";
import { getSkillsArr } from "cusomScripts/api.js";

// const getAllCards = async userId => {
//   const instance = axios.create({
//     baseURL: "https://webdev-api.loftschool.com",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });

//   const rawData = await instance.get(`/categories/${userId}`);
//   return rawData.data;
// };

// const getAllSkills = async userId => {
//   const instance = axios.create({
//     baseURL: "https://webdev-api.loftschool.com",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });

//   const rawData = await instance.get(`/skills/${userId}`);
//   return rawData.data;
// };

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
        dashOffset * (1 + this.skillPercent / dashOffset) + "%";
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
