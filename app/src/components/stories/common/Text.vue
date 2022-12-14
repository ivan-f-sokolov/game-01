<template lang="pug">

div
  div(
    ref='text-container'
    class='absolute flex items-center justify-center flex-wrap w-full'
    :style='textStyle'
    )
    p(
      v-for='(word, index) in textArray'
      :key='index'
      class='opacity-0 cursor-default'
      :style='spanStyle(index)'
    )
      | {{word}}

</template>

<script>
import { useCommonStore as cs } from "@/stores/CommonStore";
import spriteInfo from "@/assets/stories/common/text-field-in.json";

export default {
  props: ["content", "color"],
  data() {
    return {
      listeners: {
        refresh: null,
      },
      w: 593,
      h: 121,
      topOffset: 90,
      remember: "",
      delay: 5,
    };
  },
  methods: {
    refresh() {
      this.content = "";
      setTimeout(() => {
        this.content = this.remember;
      }, (1000 / 60) * this.delay);
    },
    spanStyle(index) {
      if (this.textImmediately == false) {
        return {
          animation: `fade-in ${(0.8 - this.textSpeed / 180).toFixed(1)}s ${
            ((index / 10) * (100 - this.textSpeed)) / 25
          }s forwards cubic-bezier(0.11, 0, 0.5, 0)`,
          filter: this.isBlur,
        };
      } else {
        return {
          opacity: 1,
          filter: "blur(0)",
        };
      }
    },
  },
  computed: {
    textSpeed() {
      return cs().gameData.optionsSet.textSpeed;
    },
    textBlur() {
      return cs().gameData.optionsSet.textBlur;
    },
    textImmediately() {
      return cs().gameData.optionsSet.textImmediately;
    },
    isBlur() {
      if (this.textBlur) {
        let blur = (2 * cs().gameWindowRatio).toFixed(2);
        return `blur(${blur}px)`;
      } else {
        return "blur(0)";
      }
    },
    textArray() {
      if (this.content.includes(" ")) {
        let array = [""].concat(this.content.split(" "));
        let newArray = [];
        array.forEach((word) => {
          if (word == "/") {
            newArray.push("");
          } else {
            newArray.push(word + "\xa0");
          }
        });
        return newArray;
      } else {
        return [this.content];
      }
    },
    _textFieldSize() {
      return {
        h: (spriteInfo.frames[0].sourceSize.h * cs().gameWindowRatio).toFixed(),
        w: (spriteInfo.frames[0].sourceSize.w * cs().gameWindowRatio).toFixed(),
      };
    },
    _textSize() {
      return {
        w: (this.w * cs().gameWindowRatio).toFixed(),
        h: (this.h * cs().gameWindowRatio).toFixed(),
      };
    },
    _textTopOffset() {
      return parseInt((this.topOffset * cs().gameWindowRatio).toFixed());
    },
    textStyle() {
      return {
        "max-width": `${this._textSize.w}px`,
        height: `${this._textSize.h}px`,
        top: `${
          cs().gameWindow.h - this._textFieldSize.h + this._textTopOffset
        }px`,
        left: `${(cs().gameWindow.w - this._textSize.w) / 2}px`,
        fontSize: `${32 * cs().gameWindowRatio}px`,
        "line-height": `${39 * cs().gameWindowRatio}px`,
        color: `${this.color}`,
      };
    },
  },
  mounted() {
    this.remember = this.content;
  },
};
</script>

<style>
@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
