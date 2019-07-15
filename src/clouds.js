import * as Const from "./const.js"

class Cloud {
  constructor() {
    this.x;
    this.y;
    this.imageIdx;
    this.width;
    this.speed;
    this.alive = false;
  }

  update(dt) {
    this.x -= this.speed * dt;
    if (this.x < -this.width) {
      this.alive = false;
    }
    return this.alive;
  }

  hide(dt) {
    this.y += 300 * dt;
    if (this.y > Const.HEIGHT) {
      this.alive = false;
    }
    return this.alive;
  }
}

export default class Clouds {
  constructor(imgArr, sep, bottom = false) {
    this.separetion = sep;
    this.images = imgArr;
    this.bottom = bottom;
    this.sClouds = [];

    for (let c = 0; c < 10; c++) {
      this.sClouds.push(new Cloud());
    }
    this.reset();
  }

  reset() {
    for (let c = 0; c < 10; c++) {
      this.sClouds[c].alive = false;
    }

    for (let r = 0; r < 5; r++) {
      this.createCloud();
    }
  }

  update(dt) {
    for (let c of this.sClouds) {
      if (c.alive) {
        if (!c.update(dt)) {
          this.createCloud();
        }
      }
    }
  }

  hide(dt) {
    for (let c of this.sClouds) {
      if (c.alive) {
        !c.hide(dt);
      }
    }
  }

  draw(ctx) {
    for (let c of this.sClouds) {
      if (c.alive && c.x < Const.WIDTH + 10) {
        ctx.drawImage(this.images[c.imageIdx], c.x, c.y);
      }
    }
  }

  createCloud() {
    const cld = this.sClouds.filter(c => c.alive);
    cld.sort((a, b) => {
      return a.x - b.x;
    });

    const c = this.getCloud();
    if (c) {
      c.alive = true;
      c.imageIdx = Math.floor(Math.random() * this.images.length);
      if (this.bottom) {
        c.x = cld.length < 1 ? 0 : cld[cld.length - 1].x + this.separetion;
        c.y = Const.HEIGHT - this.images[c.imageIdx].height;
        c.speed = Math.random() * 10 + 10;
      } else {
        c.x = cld.length < 1 ? Const.WIDTH - 300 : cld[cld.length - 1].x + this.separetion;
        c.y = Math.random() * 350 + 50;
        c.speed = Math.random() * 4 + 4;
      }
      c.width = this.images[c.imageIdx].width;
    }
  }

  getCloud() {
    for (let c of this.sClouds) {
      if (!c.alive) return c;
    }
    return null;
  }
}