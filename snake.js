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
    // hacky throttle and pause
    // not just hacky, wrong? fix me!
    if(this.frame%10!=0 || this.paused){
      this.frame++
      return;
    }
    if(this.frame%8==0){
      this.wag=!this.wag
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
    /*/draw snake
    this.snake.bits.forEach((bit,i)=>{
      this.drawDogPart(bit,{
        next:this.snake.bits[i+1],
        prev:this.snake.bits[i-1],
      })
    })*/

    let str = ''
    for(let y=0;y<this.height;y++){
      for(let x=0;x<this.width;x++){
          str+='#'
      }
      str+='\n'
    }
    console.log(str)

    console.log(`points: ${this.points}`)


    /*/draw apple
    this.ctx.fillStyle=this.palette[1]
    //this.ctx.fillRect(this.apple[0]*pixelSize,this.apple[1]*pixelSize,pixelSize-1,pixelSize-1)
    getSprite(this.ctx,7,this.apple[0]*pixelSize,this.apple[1]*pixelSize)
    */

    this.tick()
  }
  pause(){this.paused=true}
  unpause(){this.paused=false}
}

export default Game