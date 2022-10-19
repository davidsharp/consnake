import devtools from './node_modules/devtools-detect/index.js';
import Game from './snake.js'

let inited = false

const start = () => {
  inited = true
  console.log('inited!')
  const game = new Game()
  console.log(game)
  game.init()
  setInterval(() => {
    game.tick()
  }, 1000);
}

const init = () => {
  if(devtools.isOpen) start();
  else window.addEventListener('devtoolschange', event => {
    if(!inited && event.detail.isOpen) start()
  })
}

// could optionally provide start instead
export default init
