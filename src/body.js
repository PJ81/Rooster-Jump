export default class Body {
  constructor(img) {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.image = img;
    this.width = img ? img.width : 0;
    this.height = img ? img.height : 0;
    this.alive = false;
    this.state;
  }

  get bottom() {
    return this.y + (this.height >> 1);
  }

  get top() {
    return this.y - (this.height >> 1);
  }

  get left() {
    return this.x - (this.width >> 1);
  }

  get right() {
    return this.x + (this.width >> 1);
  }

  get box() {
    return {
      l: this.left,
      t: this.top,
      r: this.right,
      b: this.bottom
    }
  }
}