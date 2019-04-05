import Vec2 from './vec2';

class Input {

  keysPressed: object = {};
  keys: object = {
    'ctrl':17, 'enter':13, 'space':32, 'escape':27, '+':107, '-':109, 'insert':45, 'delete':46, 'home':36, 'end':35,
    '1':49, '2':50, '3':51, '4':52, '5':53, '6':54, '7':55, '8':56, '9':57, '0':58,
    'w':87, 'a':65, 's':83, 'd':68,
    'up':38, 'left':37, 'down':40, 'right':39,
  };
  buttonsPressed: object = {};
  buttons: object = {
      'left':   0,
      'middle': 1,
      'right':  2,
  };
  mouse: Vec2 = new Vec2(0, 0);
  lastmouse: Vec2 = new Vec2(0, 0);

  constructor(options) {
      // Bind all the things
      window.addEventListener('keydown', this.keyDown.bind(this));
      window.addEventListener('keyup', this.keyUp.bind(this));
      window.addEventListener('mousemove', this.mouseMove.bind(this));
      window.addEventListener('mousedown', this.mouseDown.bind(this));
      window.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  keyDown(e) { // handle keyboard press down of key
      var event = e || window.event;
      this.keysPressed[event.keyCode] = true;
  }

  keyUp(e) { // handles keyboard release of key
      var event = e || window.event;
      this.keysPressed[event.keyCode] = false;
  }

  isKeyPressed(key) { // return if specific key is pressed
      if (this.keys[key]) {
          return this.keysPressed[this.keys[key]];
      }
      return false;
  }

  mouseMove(e) {
      this.lastmouse.setVec(this.mouse);
      this.mouse.set(e.pageX || e.clientX, e.pageY || e.clientY);
  }

  mouseDown(e) {
      e.preventDefault();
      this.buttonsPressed[e.button] = true;
  }

  mouseUp(e) {
      e.preventDefault();
      this.buttonsPressed[e.button] = false;
  }

  isButtonPressed(button) {
      return this.buttonsPressed[this.buttons[button]];
  }

}

export default Input;