import * as Const from "./const.js";
import Clouds from "./clouds.js";

export default class Islands {
  constructor(res) {
    this.clouds = new Clouds([res.images[Const.BC1], res.images[Const.BC2], res.images[Const.BC3]], 160, true);
    this.images = [res.images[Const.MT1], res.images[Const.MT2], res.images[Const.MT3]];
    this.ys;
    this.alive;
    this.state;

    this.reset();
  }

  reset() {
    this.ys = [Const.BOTTOM, 576, 637];
    this.alive = true;
    this.state = Const.ARRIVED;
    this.clouds.reset();
  }

  update(dt) {
    if (!this.alive) return;
    this.clouds.update(dt);
    if (this.state === Const.GONE) {
      for (let y = 0; y < 3; y++) {
        this.ys[y] += dt * 300;
      }
      this.clouds.hide(dt);
      this.alive = this.ys[0] < Const.HEIGHT;
    }
    return this.alive;
  }

  draw(ctx) {
    if (!this.alive) return;
    ctx.drawImage(this.images[1], 48, this.ys[1]);
    ctx.drawImage(this.images[2], 294, this.ys[2]);
    ctx.drawImage(this.images[0], (Const.WIDTH >> 1) - (this.images[0].width >> 1), this.ys[0]);
  }

  drawClouds(ctx) {
    this.clouds.draw(ctx);
  }

  get box() {
    return {
      l: 160,
      t: 506,
      r: 320,
      b: 530
    };
  }

}