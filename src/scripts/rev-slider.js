import Vue from "vue";
import { getAllRevs } from "cusomScripts/api.js";

const sliderControlls = {
  template: "#slider-controllsRev"
};

const sliderItem = {
  template: "#slider-itemRev",
  props: {
    elems: Array,
    currentIndex: Number,
    order: String
  },
  methods: {
    mooveSlide(elem, index) {
      let widthOfChild = parseFloat(getComputedStyle(elem.children[0]).width);
      let widthOfParent = parseFloat(getComputedStyle(elem).width);
      let minLength = Math.round(widthOfParent / widthOfChild);
      let position = (index * 100) / (minLength + 1);

      if (index === 0) {
        elem.style.left = `0`;
      } else if (index <= this.elems.length - minLength) {
        let newPosition = (index * 100) / minLength;
        elem.style.left = `-${newPosition}%`;
      } else {
        elem.style.left = `0`;
      }
    }
  },
  updated() {
    this.mooveSlide(this.$refs[this.order], this.currentIndex);
  },

  watch: {
    currentIndex(value) {
      this.mooveSlide(this.$refs[this.order], this.currentIndex);
    }
  }
};

new Vue({
  el: "#rev-component",
  template: "#rev-element",
  components: {
    sliderControlls,
    sliderItem
  },
  data() {
    return {
      elems: [],
      currentIndex: 0,
      minLength: 0
    };
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForCurIndex(value);
    }
  },
  methods: {
    makeInfiniteLoopForCurIndex(value) {
      const elemsAmount = this.elems.length - this.minLength;
      if (value > elemsAmount) this.currentIndex = 0;
      if (value < 0) this.currentIndex = elemsAmount;
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
    },
    makeArrayWithRequiredImg(data) {
      return data.map(item => {
        const reqPick = require(`../images/content/${item.photo}`);

        item.photo = reqPick;

        return item;
      });
    }
  },
  async created() {
    const revsAll = await getAllRevs();
    this.elems = revsAll;
  },
  updated() {
    const elem = this.$refs.slider.$refs.order;
    let widthOfChild = parseFloat(getComputedStyle(elem.children[0]).width);
    let widthOfParent = parseFloat(getComputedStyle(elem).width);
    this.minLength = Math.round(widthOfParent / widthOfChild);
  }
});
