import * as Const from "./const.js"
import Game from "./game.js"
import Spikes from "./spikes.js"
import Clouds from "./clouds.js"
import Player from "./player.js"
import Platforms from "./platforms.js"
import Particles from "./particles.js"
import Resources from "./resources.js";
import Islands from "./islands.js";

class UJ extends Game {
    constructor() {
        super();
        this.state = Const.ENTER;
        this.spikes;
        this.clouds;
        this.player;
        this.platforms;
        this.particles;
        this.islands;
        this.score = this.counter = 0;
        this.over = false;
        this.res = new Resources(() => {
            this.load();
            this.loop(0);
        });
        this.canvas.addEventListener("mousedown", (e) => this.click(e), false);
        this.canvas.addEventListener("mouseup", (e) => this.click(e), false);
        this.canvas.addEventListener("touchstart", (e) => this.click(e), false);
        this.canvas.addEventListener("touchend", (e) => this.click(e), false);

        this.collided = (a, b) => {
            return !(((a.b < b.t) || (a.t > b.b) || (a.r < b.l) || (a.l > b.r)));
        }
    }

    load() {
        this.particles = new Particles();
        this.platforms = new Platforms(this.res.images[Const.PLT]);
        this.platforms.startPlatform();
        this.islands = new Islands(this.res);
        this.player = new Player(this.res.images[Const.HR1], this.res.images[Const.HR2]);
        this.spikes = new Spikes(this.res);
        this.clouds = new Clouds([this.res.images[Const.SC1], this.res.images[Const.SC2], this.res.images[Const.SC3], this.res.images[Const.SC4], this.res.images[Const.SC5]], 350);
    }

    reset() {
        this.counter = this.score = 0;
        this.over = false;
        this.state = Const.ENTER;
        this.particles.reset();
        this.platforms.reset();
        this.islands.reset();
        this.player.reset();
        this.platforms.startPlatform();
    }

    update(dt) {
        this.particles.update(dt);
        this.clouds.update(dt);
        this.islands.update(dt);
        this.platforms.update(dt);
        this.player.update(dt);

        if (!this.over && this.platforms.activePlatform) {
            this.over = this.player.bottom < this.platforms.activePlatform.top;
        }

        if ((!this.platforms.activePlatform && this.player.jumpPower < 0) ||
            (this.platforms.activePlatform && this.over && this.player.jumpPower < 0))
            this.checkCollision();

        if (this.player.alive) {
            if (this.player.top < this.spikes.height - 10 || this.player.bottom > Const.HEIGHT - this.spikes.height + 14) {
                this.player.alive = false;
                this.state = Const.GAMEOVER;
                this.particles.startExp(this.player.x, this.player.y);
            }

            if (this.player.jumpPower > 0 && this.player.state === Const.AIRBORNE) {
                const x = this.player.x + (Math.random() * (this.player.width >> 2)) * (Math.random() < .5 ? -1 : 1);
                this.particles.startTrail(x, this.player.bottom);
            }
        }
    }

    draw() {
        this.clouds.draw(this.ctx);

        if (this.state !== Const.GAMEOVER) {
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = "#729fc2" //"#5a7e99";
            this.ctx.font = "110px 'Press Start 2P'";
            this.ctx.fillText(`${(this.score)}`, Const.WIDTH >> 1, Const.HEIGHT >> 1);
        }

        this.platforms.draw(this.ctx);
        this.player.draw(this.ctx);
        this.islands.draw(this.ctx);
        this.particles.draw(this.ctx);

        if (this.state === Const.GAMEOVER) {
            this.ctx.fillStyle = "#ec5100" //"#f0a";
            this.ctx.font = "40px 'Press Start 2P'";
            this.ctx.fillText("GAME OVER", Const.WIDTH >> 1, Const.HEIGHT * .42);
            this.ctx.font = "20px 'Press Start 2P'";
            this.ctx.fillText(`SCORE: ${(this.score)}`, Const.WIDTH >> 1, Const.HEIGHT * .48);
            this.ctx.font = "15px 'Press Start 2P'";
            this.ctx.fillText("CLICK TO PLAY", Const.WIDTH >> 1, Const.HEIGHT * .72);
        }

        this.spikes.draw(this.ctx);
        this.islands.drawClouds(this.ctx);
    }

    click(e) {
        if (this.state === Const.GAMEOVER) {
            this.reset();
            return;
        }
        if (this.player.state === Const.READY && (e.type === "mousedown" || e.type === "touchstart")) {
            this.player.state = Const.CHARGING;
        } else if (this.player.state === Const.CHARGING && (e.type === "mouseup" || e.type === "touchend")) {
            this.player.state = Const.AIRBORNE;
            this.player.platform = null;
            if (this.islands.state !== Const.GONE) {
                this.islands.state = Const.GONE;
            } else {
                this.platforms.oldPlatform.state = Const.GONE;
            }
        }
    }

    checkCollision() {
        const box = this.islands.state !== Const.GONE ? this.islands.box : this.platforms.box;
        if (this.collided(this.player.box, box)) {
            this.player.land(box.t)
            if (this.islands.state === Const.GONE) {
                this.platforms.activePlatform.state = Const.WAIT;
                this.platforms.oldPlatform = this.platforms.activePlatform;
                this.platforms.startPlatform();
                this.score++;
                if (++this.counter > 10) {
                    this.counter = 0;
                    this.platforms.speedUp();
                }
                this.player.platform = this.platforms.oldPlatform;
                this.platforms.oldPlatform.state = Const.RESETPOS;
                this.over = false;
            }
        }
    }
}

new UJ();