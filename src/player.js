import * as Const from "./const.js"
import Body from "./body.js"
import Trail from "./trail.js";

export default class Player extends Body {
  constructor(img1, img2) {
    super(null);
    this.width = img1.width;
    this.height = img1.height;
    this.images = [img1, img2];
    this.jumpPower;
    this.gravity;
    this.platform;
    this.animTime = .7;
    this.animFrame = 0;
    this.trail = new Trail();
    this.trailTime = .025;
    this.reset();
  }

  reset() {
    this.platform = null;
    this.x = Const.WIDTH >> 1;
    this.y = 80;
    this.state = Const.AIRBORNE;
    this.jumpPower = -10;
    this.gravity = 25;
    this.alive = true;
    this.trail.reset();
  }

  update(dt) {
    this.trail.update(dt);

    if (!this.alive) return;

    if ((this.animTime -= dt) < 0) {
      this.animTime = .7;
      this.animFrame = (this.animFrame + 1) % 2;
    }

    if (this.platform) {
      this.y = this.platform.top - (this.height >> 1);
    }

    switch (this.state) {
      case Const.AIRBORNE:
        this.y -= 60 * this.jumpPower * dt;
        this.jumpPower -= this.gravity * dt;

        if ((this.trailTime -= dt) < 0 && this.jumpPower > 0) {
          this.trailTime = .025;
          this.trail.addTrail(this.left, this.top);
        }
        break;
      case Const.CHARGING:
        this.jumpPower += .2;
        if (this.jumpPower > 20) this.jumpPower = 20;
        break;
    }
  }

  draw(ctx) {
    this.trail.draw(ctx, this.images[0]);
    if (!this.alive) return;
    ctx.drawImage(this.images[this.animFrame], this.left, this.top);
    if (this.state === Const.CHARGING) {
      ctx.fillStyle = "red";
      const jh = this.jumpPower * 3;
      ctx.fillRect(this.left - 10, this.bottom - jh, 6, jh);
    }
  }

  land(y) {
    this.y = y - (this.height >> 1);
    this.jumpPower = 0;
    this.state = Const.READY;
  }

  get box() {
    return {
      l: this.left,
      r: this.right,
      t: this.bottom - 2,
      b: this.bottom
    }
  }
}