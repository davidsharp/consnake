import devtools from 'devtools-detect';
import Game from './snake.js'

let inited = false

const start = () => {
  inited = true
  const game = new Game()
  game.init()
  document.addEventListener('keydown', e => game.listen(e.key))
  setInterval(() => {
    game.tick()
  }, 300);
}

const init = () => {
  if(devtools.isOpen) start();
  else window.addEventListener('devtoolschange', event => {
    if(!inited && event.detail.isOpen) start()
  })
}

// could optionally provide start instead
export default init
