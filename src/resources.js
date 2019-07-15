import * as Const from "./const.js"

export default class Resources {
    constructor(cb) {
        this.images = new Array(17);

        Promise.all([
            (this.loadImage("./img/bc1.gif")).then((i) => {
                this.images[Const.BC1] = i;
            }),
            (this.loadImage("./img/bc2.gif")).then((i) => {
                this.images[Const.BC2] = i;
            }),
            (this.loadImage("./img/bc3.gif")).then((i) => {
                this.images[Const.BC3] = i;
            }),
            (this.loadImage("./img/bc4.gif")).then((i) => {
                this.images[Const.BC4] = i;
            }),
            (this.loadImage("./img/sc1.gif")).then((i) => {
                this.images[Const.SC1] = i;
            }),
            (this.loadImage("./img/sc2.gif")).then((i) => {
                this.images[Const.SC2] = i;
            }),
            (this.loadImage("./img/sc3.gif")).then((i) => {
                this.images[Const.SC3] = i;
            }),
            (this.loadImage("./img/sc4.gif")).then((i) => {
                this.images[Const.SC4] = i;
            }),
            (this.loadImage("./img/sc5.gif")).then((i) => {
                this.images[Const.SC5] = i;
            }),
            (this.loadImage("./img/mt1.gif")).then((i) => {
                this.images[Const.MT1] = i;
            }),
            (this.loadImage("./img/mt2.gif")).then((i) => {
                this.images[Const.MT2] = i;
            }),
            (this.loadImage("./img/mt3.gif")).then((i) => {
                this.images[Const.MT3] = i;
            }),
            (this.loadImage("./img/plt.gif")).then((i) => {
                this.images[Const.PLT] = i;
            }),
            (this.loadImage("./img/hr1.gif")).then((i) => {
                this.images[Const.HR1] = i;
            }),
            (this.loadImage("./img/hr2.gif")).then((i) => {
                this.images[Const.HR2] = i;
            }),
            (this.loadImage("./img/spt.gif")).then((i) => {
                this.images[Const.SPT] = i;
            }),
            (this.loadImage("./img/spb.gif")).then((i) => {
                this.images[Const.SPB] = i;
            })
        ]).then(() => {
            cb();
        });
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
        });
    }
}