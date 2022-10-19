const pixelSize = 16
const WIDTH = 20
const HEIGHT = 12

class Game {
  constructor({width=WIDTH,height=HEIGHT,callback=()=>console.log('game over!')}={}){
    this.paused=false

    this.width=width
    this.height=height
    this.gameOver=()=>{
      callback()
      this.init()
    }
    this.init()
  }
  init(){
    this.snake={bits:[[30,20],[29,20],[28,20]],direction:'r'}
    this.moveApple()
    this.points=0
    this.frame=0
    this.wag=false
  }
  tick(){
    this.draw()
    if(this.paused){
      this.frame++
      return;
    }
    const oldState=[...this.snake.bits]
    const head=this.moveCalc(oldState[0],this.snake.direction)
    this.snake.bits=[head,...oldState]
    if(
      head[0]===this.apple[0] &&
      head[1]===this.apple[1]
    ) {
      this.points++
      this.moveApple()
    }
    else this.snake.bits.pop()
    this.collisionCheck();
    this.frame++
  }
  moveCalc(head,dir){
    const {width:w,height:h} = this
    const [x,y]=head
    return (
      dir=='u'?[(w+x)%w,(h+y-1)%h]:
      dir=='l'?[(w+x-1)%w,(h+y)%h]:
      dir=='d'?[(w+x)%w,(h+y+1)%h]:
      [(w+x+1)%w,y%h]
    )
  }
  moveApple(){
    let pos = null
    while(!pos){
      let temp = [
        Math.floor(this.width*Math.random()),
        Math.floor(this.height*Math.random()),
      ]
      if(!this.snake.bits.find(
          ([x,y])=>(x==temp[0]&&y==temp[1])
        ))pos=temp;
    }
    this.apple = pos
  }
  collisionCheck(){
    const bitSet = new Set(this.snake.bits.map(b=>b.toString()))
    if(bitSet.size<this.snake.bits.length)this.gameOver();
  }
  listen(k){
    // if paused, ignore inputs
    if(this.paused)return;
    const alt = false
    // 'original' controls
    if(!alt)switch(k){
      case 'ArrowUp':
        if(this.snake.direction!='d') this.snake.direction = 'u'
        break
      case 'ArrowDown':
        if(this.snake.direction!='u') this.snake.direction = 'd'
        break
      case 'ArrowLeft':
        if(this.snake.direction!='r') this.snake.direction = 'l'
        break
      case 'ArrowRight':
        if(this.snake.direction!='l') this.snake.direction = 'r'
        break
    }
    // alt control scheme
    const dirs = ['u','r','d','l']
    if(alt)switch(k){
      case 'ArrowLeft':
        this.snake.direction = dirs[(4+dirs.findIndex(dir=>dir==this.snake.direction)-1)%4]
        break
      case 'ArrowRight':
        this.snake.direction = dirs[(4+dirs.findIndex(dir=>dir==this.snake.direction)+1)%4]
        break
    }
  }
  draw(){
    console.clear()

    let str = ''
    for(let y=0;y<this.height;y++){
      for(let x=0;x<this.width;x++){ 
          str+=(
            this.snake.bits.find(bit=>bit[0]==x&&bit[1]==y) ? 's' :
            this.apple[0]==x&&this.apple[1]==y ? 'a' :
            '#'
          )
      }
      str+='\n'
    }
    console.log(str)
    console.log(`points: ${this.points}`)
  }
  pause(){this.paused=true}
  unpause(){this.paused=false}
}

export default Game