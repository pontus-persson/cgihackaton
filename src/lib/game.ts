import Render from './render';
import Input from './input'
import Triangle from './triangle';
import * as io from 'socket.io-client'

class Game {
  render: Render;
  input: Input = new Input({});
  socket: any;
  player: Triangle;
  others: object = {};

  constructor(params) {
    this.render = new Render(params.container);
    this.socket = io('http://172.16.1.41:3030');
    this.player = new Triangle({x: 44, y: 45});
    console.log(this.socket);
    window.setInterval(this.update, 1000/60);
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
      this.others[data.user].lastp.x = this.others[data.user].p.x;
      this.others[data.user].lastp.y = this.others[data.user].p.y;
      this.others[data.user].p.x = data.pos.x;
      this.others[data.user].p.y = data.pos.y;
      this.others[data.user].update();
    });

  }

  update = () => {
    if (this.input.isKeyPressed('up')) this.player.vel.y -= 0.04;
    if (this.input.isKeyPressed('down')) this.player.vel.y += 0.04;
    if (this.input.isKeyPressed('left')) this.player.vel.x -= 0.04;
    if (this.input.isKeyPressed('right')) this.player.vel.x += 0.04;

    this.player.update();
    this.socket.emit('tick', { x: this.player.p.x, y: this.player.p.y });
  }

}

export default Game;