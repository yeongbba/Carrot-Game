"use strict";

import PopUp from "./popup.js";
import { Gamebuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new PopUp();

const game = new Gamebuilder()
  .gameDuration(20)
  .carrotCount(20)
  .bugCount(20)
  .build();

game.setGameStopListner((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "의진아, 그만 할거야❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = "의진이가 이겼다😲";
      sound.playWin();
      break;
    case Reason.lose:
      message = "의진이가 졌다😄";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListner(() => {
  game.start();
});
