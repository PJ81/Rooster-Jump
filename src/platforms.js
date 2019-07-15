import * as Const from "./const.js"
import Body from "./body.js"

class Platform extends Body {
  constructor() {
    super(null);
    this.x = Const.WIDTH >> 1;
    this.goal;
    this.dist;
    this.time;
    this.idx;
    this.speed = 10;
  }

  easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }

  update(dt) {
    switch (this.state) {
      case Const.ENTER:
        this.y = this.easeInOutQuad(this.time += dt, -this.height, this.dist + 5, 1);
        if (this.y >= this.goal) {
          this.y = this.goal;
          this.state = Const.ARRIVED;
        }
        break;
      case Const.MOVE:
        this.y += dt * this.speed;
        break;
      case Const.GONE:
        this.y += dt * 1200;
        this.alive = this.top < Const.HEIGHT;
        break;
      case Const.RESETPOS:
        if ((this.y += dt * 500) > Const.BOTTOM) {
          this.y = Const.BOTTOM;
          this.state = Const.MOVE;
        }
        break;
    }
  }
}

export default class Platforms {
  constructor(img) {
    this.image = img;
    this.platforms = [];
    this.actPlatform;
    this.oPlatform;

    for (let z = 0; z < 5; z++) {
      const p = new Platform();
      p.width = this.image.width;
      p.height = this.image.height;
      p.idx = z;
      this.platforms.push(p);
    }
  }

  reset() {
    this.actPlatform = null;
    this.oPlatform = null;
    for (let z = 0; z < 5; z++) {
      this.platforms[z].alive = false;
      this.platforms[z].speed = 10;
    }
  }

  speedUp() {
    for (let z = 0; z < 5; z++) {
      this.platforms[z].speed += 5;
    }
  }

  getPlatform() {
    for (let p of this.platforms) {
      if (!p.alive) return p;
    }
    return null;
  }

  startPlatform() {
    const p = this.getPlatform();
    if (p) {
      p.state = Const.ENTER;
      p.y = -this.image.height;
      p.goal = Math.random() * 231 + 180;
      p.dist = p.goal - p.y;
      p.time = 0;
      p.alive = true;
    }
  }

  update(dt) {
    for (let p of this.platforms) {
      if (p.alive) {
        p.update(dt);
        if (p.state === Const.ARRIVED) this.actPlatform = p.idx;
      }
    }
  }

  draw(ctx) {
    for (let p of this.platforms) {
      if (p.alive) {
        ctx.drawImage(this.image, p.left, p.top);
      }
    }
  }

  get box() {
    if (this.activePlatform) {
      return this.activePlatform.box;
    }
  }

  get activePlatform() {
    return this.platforms[this.actPlatform];
  }

  get oldPlatform() {
    return this.platforms[this.oPlatform];
  }

  set oldPlatform(op) {
    this.oPlatform = op.idx;
  }
}