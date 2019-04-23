import Vue from "vue";
import { getAllWorks } from "cusomScripts/api.js";

const previewInfo = {
  template: "#preview-info",
  props: {
    elems: Array,
    currentIndex: Number,
    currentElem: Object
  },
  computed: {
    tagsArray() {
      return this.currentElem.techs.split(" ");
    }
  },
  updated() {}
};

const sliderControlls = {
  template: "#slider-controlls",
  props: {
    elems: Array
  }
};

const sliderItem = {
  template: "#slider-item",
  props: {
    elems: Array,
    order: String,
    currentIndex: Number,
    currentElem: Object
  },
  methods: {
    mooveSlide(elem, index, type) {
      let widthOfChild = parseFloat(getComputedStyle(elem.children[0]).width);
      let widthOfParent = parseFloat(getComputedStyle(elem).width);
      let minLength = Math.round(widthOfParent / widthOfChild) - 1;
      let position = (index * 100) / (minLength + 1);
      if (type === "first") {
        elem.style.left = `-${position}%`;
      } else if (type === "second" && index >= minLength) {
        let newPosition = ((index - minLength) * 100) / (minLength + 1);
        elem.style.left = `-${newPosition}%`;
      } else {
        elem.style.left = `0`;
      }
    }
  },

  updated() {
    if (this.elems.length) {
      this.mooveSlide(this.$refs[this.order], this.currentIndex, this.order);
    }
  },
  watch: {
    currentIndex(value) {
      this.mooveSlide(this.$refs[this.order], this.currentIndex, this.order);
    }
  }
};

new Vue({
  el: "#preview-component",
  template: "#preview-element ",
  components: {
    sliderItem,
    previewInfo,
    sliderControlls
  },

  data() {
    return {
      elems: [],
      currentIndex: 0
    };
  },

  computed: {
    currentElem() {
      return this.elems[this.currentIndex];
    }
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForCurIndex(value);
    }
  },
  methods: {
    makeInfiniteLoopForCurIndex(value) {
      const elemsAmount = this.elems.length - 1;
      if (value > elemsAmount) this.currentIndex = 0;
      if (value < 0) this.currentIndex = elemsAmount;
    },
    makeArrayWithRequiredImg(data) {
      return data.map(item => {
        const reqPick = require(`../images/content/${item.photo}`);

        item.photo = reqPick;

        return item;
      });
    },
    handleSlide(e) {
      switch (e) {
        case "next":
          this.currentIndex++;
          break;
        case "back":
          this.currentIndex--;
          break;
        default:
          this.currentIndex = parseInt(e);
          break;
      }
    }
  },
  async created() {
    const worksAll = await getAllWorks();
    this.elems = worksAll;
  }
});
