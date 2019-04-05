import Vec2 from './vec2'

class Triangle {
  p: Vec2 = new Vec2(0, 0);
  lastp: Vec2 = new Vec2(0, 0);
  p1: Vec2 = new Vec2(0, 0);
  p2: Vec2 = new Vec2(0, 0);
  p3: Vec2 = new Vec2(0, 0);
  vel: Vec2 = new Vec2(Math.random(), Math.random());

  constructor(center) {
    this.update();
  }


  update() {
    this.lastp.setVec(this.p);
    this.p.addVec(this.vel);
    const v = new Vec2(this.p.x - this.lastp.x, this.p.y - this.lastp.y);
    v.normalize();

    this.p1.x = this.p.x + v.x * 40;
    this.p1.y = this.p.y + v.y * 40;

    this.p2.x = this.p.x + v.y * 18;
    this.p2.y = this.p.y + -v.x * 18;

    this.p3.x = this.p.x + -v.y * 18;
    this.p3.y = this.p.y + v.x * 18;
  }

  draw(ctx) {
    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineTo(this.p3.x, this.p3.y);
    ctx.lineTo(this.p1.x, this.p1.y);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
  }
}

export default Triangle;