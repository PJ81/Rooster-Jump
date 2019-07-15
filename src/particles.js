import * as Const from "./const.js"

class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.g = 0;
    this.type = Const.TRAIL;
    this.alpha = 0;
    this.color = "rgba(0,0,0,0)";
    this.size = 0;
    this.alive = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color + this.alpha + ")";
    switch (this.type) {
      case Const.TRAIL:
        ctx.fillRect(this.x, this.y - 3, this.size, this.size + 3);
        break;
      case Const.EXPLO:
        const t = this.size >> 1;
        ctx.fillRect(this.x - t, this.y - t, this.size, this.size);
        break;
    }

  }

  update(dt) {
    if ((this.alpha -= dt * .5) < 0) {
      this.alive = false;
      return;
    }
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.y += this.g * dt;
    this.size += 4 * dt;
  }
}

export default class Particles {
  constructor() {
    this.particles = [];
    this.colors = ["rgba(255,255,255,",
      "rgba(251,6,6,",
      "rgba(255,255,255,",
      "rgba(233,93,15,",
      "rgba(255,255,255,",
      "rgba(233,220,229,"
    ]

    for (let p = 0; p < 150; p++) {
      this.particles.push(new Particle());
    }
  }

  reset() {
    for (let p = 0; p < 150; p++) {
      this.particles[p].alive = false;
    }
  }

  update(dt) {
    for (let p of this.particles) {
      if (p.alive) p.update(dt);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    for (let p of this.particles) {
      if (p.alive) p.draw(ctx);
    }
    ctx.closePath();
  }

  getPart() {
    for (let p of this.particles) {
      if (!p.alive) return p;
    }
    return null;
  }

  startTrail(x, y) {
    const r = this.getPart();
    if (r) {
      r.x = x;
      r.y = y;
      r.vx = 0;
      r.vy = Math.random() * 4 + 5;
      r.g = 20;
      r.alpha = .7;
      r.color = this.colors[0];
      r.size = 1;
      r.alive = true;
      r.type = Const.TRAIL;
    }
  }

  startExp(x, y) {
    for (let t = 0; t < 50; t++) {
      const r = this.getPart(),
        ang = Math.random() * Const.TWO_PI;
      if (r) {
        r.x = x;
        r.y = y;
        r.vx = Math.cos(ang) * (Math.random() * 400 + 50);
        r.vy = Math.sin(ang) * (Math.random() * 400 + 50);
        r.g = 10;
        r.alpha = 1;
        r.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        r.size = Math.random() * 8 + 5;
        r.alive = true;
        r.type = Const.EXPLO;
      }
    }
  }

}