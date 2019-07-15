import * as Const from "./const.js"

export default class Spikes {
  constructor(res) {
    this.cTop = document.createElement("canvas");
    this.cBot = document.createElement("canvas");

    const iT = res.images[Const.SPT],
      iB = res.images[Const.SPB];

    this.cTop.width = this.cBot.width = Const.WIDTH;
    this.height = this.cTop.height = this.cBot.height = iT.height;

    const cx1 = this.cTop.getContext("2d"),
      cx2 = this.cBot.getContext("2d");

    for (let w = 0; w < Const.WIDTH; w += iT.width) {
      cx1.drawImage(iT, w, 0);
      cx2.drawImage(iB, w, 0);
    }
  }

  draw(ctx) {
    ctx.drawImage(this.cTop, 0, 0);
    ctx.drawImage(this.cBot, 0, Const.HEIGHT - this.cTop.height);
  }
}