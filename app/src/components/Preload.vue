<template lang="pug">

div(
  class="hidden"
  ref='block'
)

</template>

<script>
import { loadingBackground } from "@/assets/common/loading/base64";
import { loadingRing1 } from "@/assets/common/loading/base64";
import { loadingRing2 } from "@/assets/common/loading/base64";
import { loadingRing3 } from "@/assets/common/loading/base64";
import { loadingRing4 } from "@/assets/common/loading/base64";

const png = ".png";
const webp = ".webp";
const pngFiles = {};
const webpFiles = {
  "attack/alice": ["move", "idle", "goblin", "goblin-final"],
  "attack/common": ["village", "ground"],
  "attack/goblin": ["move", "in", "hide"],
  "stories/common": [
    "text-field-out",
    "text-field-in",
    "text-field",
    "text-field-none",
  ],
  "stories/prologue/forest": [
    "forest",
    "blush",
    "angry",
    "drill",
    "eyes-side",
    "tongue",
  ],
  "stories/prologue/house": ["grace", "house-candle", "house"],
  "stories/prologue/village": ["smile", "village"],
};

function putIn(files, format) {
  let images = [];
  Object.keys(files).forEach((key) => {
    files[key].forEach((name) => {
      let image = new Image();
      image.src = require(`@/assets/${key}/${name}${format}`);
      images.push(image);
    });
  });
  return images;
}

export default {
  mounted() {
    putIn(pngFiles, png).forEach((image) =>
      this.$refs.block.appendChild(image)
    );
    putIn(webpFiles, webp).forEach((image) =>
      this.$refs.block.appendChild(image)
    );
    if (!localStorage.getItem("loading-background")) {
      localStorage.setItem("loading-background", loadingBackground);
      localStorage.setItem("loading-ring-1", loadingRing1);
      localStorage.setItem("loading-ring-2", loadingRing2);
      localStorage.setItem("loading-ring-3", loadingRing3);
      localStorage.setItem("loading-ring-4", loadingRing4);
    }
  },
};
</script>
