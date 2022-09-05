import { defineStore } from "pinia";

export const useCommonStore = defineStore("CommonStore", {
  state: () => {
    return {
      _gameFrameCycle: null,
      logged: false,
      gameFrame: 0,
      window: { w: null, h: null },
      gameWindow: { w: null, h: null },
      gameData: {
        optionsSet: {
          outsideBrightness: 25,
          textSpeed: 25,
          textImmediately: false,
        },
      },
      centerPoint: { x: null, y: null },
    };
  },
  getters: {
    gameWindowRatio: (state) => (state.gameWindow.h / 1080).toFixed(2),
  },
  actions: {
    startGameFrame() {
      this.gameFrame = 0;
      clearInterval(this._gameFrameCycle);
      this._gameFrameCycle = setInterval(() => {
        this.gameFrame++;
      }, 1000 / 60);
    },
  },
});
