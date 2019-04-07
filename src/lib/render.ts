class Render {

  containerID: string;
  canvas: any;
  ctx: any;
  renderCallbacks: any[];

  constructor(container) {
    this.containerID = container;
    this.renderCallbacks = [];
  }

  // init rendering stuff
  public init() {
    this.canvas = document.createElement('canvas');
    document.getElementById(this.containerID).appendChild(this.canvas); // add Canvas element to container
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.render();

    window.onresize = (e) => {
      this.resize(e);
    }
  }

  render = () => {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderCallbacks.forEach(function(callback) {
      callback();
    });

    requestAnimationFrame(this.render);
  }

  draw(callback) {
    this.renderCallbacks.push(callback);
  }

  // handle resize event
  resize(e) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

}

export default Render;