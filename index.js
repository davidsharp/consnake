import devtools from './node_modules/devtools-detect/index.js';

let inited = false

const start = () => {
  inited = true
  console.log('inited!')
}

const init = () => {
  if(devtools.isOpen) start();
  else window.addEventListener('devtoolschange', event => {
    if(!inited && event.detail.isOpen) start()
  })
}

// could optionally provide start instead
export default init
