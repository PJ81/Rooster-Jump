class TrailPos {
    constructor() {
        this.x;
        this.y;
        this.a;
        this.alive = false;
    }
}
export default class Trail {
    constructor() {
        this.trail = [];
        for (let z = 0; z < 100; z++) {
            this.trail.push(new TrailPos());
        }
    }

    reset() {
        for (let z = 0; z < 100; z++) {
            this.trail[z].alive = false;
        }
    }

    update(dt) {
        for (let t of this.trail) {
            if (t.alive) {
                t.a -= 3 * dt;
                t.alive = t.a > 0;
            }
        }
    }

    draw(ctx, img) {
        for (let t of this.trail) {
            if (t.alive) {
                ctx.globalAlpha = t.a;
                ctx.drawImage(img, t.x, t.y);
            }
        }
        ctx.globalAlpha = 1;
    }

    addTrail(x, y) {
        const t = this.getTrailPos();
        if (t) {
            t.x = x;
            t.y = y;
            t.a = .6;
            t.alive = true;
        }
    }

    getTrailPos() {
        for (let t of this.trail) {
            if (!t.alive) return t;
        }
        return null;
    }
}