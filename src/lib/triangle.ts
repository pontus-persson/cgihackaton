import Vec2 from './vec2'

class Triangle {
  pos: Vec2 = new Vec2(0, 0);
  p1: Vec2 = new Vec2(0, 0);
  p2: Vec2 = new Vec2(0, 0);
  p3: Vec2 = new Vec2(0, 0);
  
  angle: number = 0;
  fs: string = '#'+Math.floor(Math.random()*16777215).toString(16);
  vel: Vec2 = new Vec2(Math.random(), Math.random());

  constructor(center: any) {
    this.pos.x = center.x;
    this.pos.x = center.x;
    this.update();
  }

  accelerate() {
    const v = new Vec2().fromAngle(this.angle);
    this.vel.addVec(v.mul(0.5));
    this.vel.limit(5);
  }

  turnLeft() {
    this.angle += 0.04;
  }
  
  turnRight() {
    this.angle -= 0.04;
  }

  setPoints() {
    const v = new Vec2().fromAngle(this.angle);
    v.normalize();

    this.p1.x = this.pos.x + v.x * 40;
    this.p1.y = this.pos.y + v.y * 40;

    this.p2.x = this.pos.x + v.y * 16;
    this.p2.y = this.pos.y + -v.x * 16;

    this.p3.x = this.pos.x + -v.y * 16;
    this.p3.y = this.pos.y + v.x * 16;
  }

  update() {
    this.pos.addVec(this.vel);
    this.setPoints();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.fs;
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineTo(this.p3.x, this.p3.y);
    ctx.lineTo(this.p1.x, this.p1.y);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#999999';
    ctx.stroke();
  }
}

export default Triangle;