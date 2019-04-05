class Vec2 {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  len() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  setVec(vec) {
    this.x = vec.x;
    this.y = vec.y;
  }

  add(a) {
    this.x += a;
    this.y += a;
  }

  addVec(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  sub(s) {
    this.x -= s;
    this.y -= s;
  }

  subVec(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  mul(m) {
    this.x *= m;
    this.y *= m;
  }

  mulVec(vec) {
    this.x *= vec.x;
    this.y *= vec.y;
  }

  div(d) {
    this.x /= d;
    this.y /= d;
  }

  divVec(vec) {
    this.x /= vec.x;
    this.y /= vec.y;
  }

  normalize() {
    var l = this.len();
    if(l != 0) this.div(l);
  }

  limit(limit) {
    var l = this.len();
    if(l > limit) {
      this.normalize();
      this.mul(limit);
    }
  }
}

export default Vec2;