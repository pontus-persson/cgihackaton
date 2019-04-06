import Render from './render';
import Input from './input'
import Triangle from './triangle';
import * as io from 'socket.io-client'

class Game {
  render: Render;
  input: Input = new Input({});
  socket: any = io('http://localhost:3030');
  player: Triangle = new Triangle({x: 45, y: 45});
  others: object = {};

  constructor(params) {
    this.render = new Render(params.container);
  }

  init() {
    this.render.init();

    this.render.draw(() => {
      this.player.draw(this.render.ctx);
    });

    this.render.draw(() => {
      if (!Object.keys(this.others).length) {
        return false;
      }
      for (let key in this.others) {
        this.others[key].draw(this.render.ctx);
      }
    });

    this.socket.on('connect', function() {
      console.log('connected');
    });

    this.socket.on('left', function(data) {
      if (this.others[data.user]) {
        console.log(`user left ${data.user}`);
        delete this.others[data.user];
      }
    });

    this.socket.on('update', (data) => {
      if (!this.others[data.user]) {
        console.log(`new user ${data.user}`);
        this.others[data.user] = new Triangle(data.pos);
      }
      this.others[data.user].pos.x = data.pos.x;
      this.others[data.user].pos.y = data.pos.y;
      this.others[data.user].angle = data.pos.angle;
      this.others[data.user].update();
    });

    window.setInterval(this.update, 1000/30);
  }

  update = () => {
    if (this.input.isKeyPressed('up')) this.player.accelerate();
    if (this.input.isKeyPressed('down')) this.player.vel.mul(0.95);
    if (this.input.isKeyPressed('left')) this.player.turnLeft();
    if (this.input.isKeyPressed('right')) this.player.turnRight();

    this.player.update();
    this.socket.emit('tick', { x: this.player.pos.x, y: this.player.pos.y, angle: this.player.angle });
  }

}

export default Game;