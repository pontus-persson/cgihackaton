import Game from './lib/game';

window.onload = function(e) {
  let game = new Game({
    container: 'content',
  });
  game.init();
};
