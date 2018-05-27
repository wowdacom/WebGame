//  製造一個 Vector 物件
var Vector = function (x, y) {
  this.x = x
  this.y = y
}
//  為 Vector 添加屬性
//
//  顯示一個 Vec 的值
Vector.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')'
}
//  重新設定 Vec
Vector.prototype.set = function (x, y) {
  this.x = x
  this.y = y
  return this
}
// 複製一個 Vec
Vector.prototype.clone = function() {
  return new Vector(this.x, this.y)
}
// 移動一個 Vec
//
Vector.prototype.move = function(x, y) {
  this.x += x
  this.y += y
  return this
}
// 將兩個向量相加
Vector.prototype.add = function(v) {
  return new Vector(this.x+v.x, this.y+v.y)
}
// 將兩個向量相減
Vector.prototype.sub = function(v) {
  return new Vector(this.x-v.x, this.y-v.x)
}
// 將向量以純量縮放
Vector.prototype.mul = function(s) {
  return new Vector(this.x*s, this.y*s)
}
//單位向量的計算
Vector.prototype.length = function() {
  return Math.sqrt(this.x*this.x + this.y*this.y)
}
//兩個向量是否相等
Vector.prototype.equal = function(v) {
  return (this.x == v.x)  && (this.y == v.y)
}

var Game = function () {
  this.bw = 40
  this.bh = 40
  this.bs = 2
  this.gameWidth = 10
  this.gameHeight = 15
  this.speed = 30
  this.start = false
  this.currentTetris = new DrawTetris()
  
}

Game.prototype.init = function(){
  this.canvas = document.getElementById('myCanvas')
  this.canvas.width = this.bw * this.gameWidth + this.bs*(this.gameWidth-1)
  this.canvas.height = this.bh * this.gameHeight + this.bs*(this.gameHeight-1)
  this.ctx = this.canvas.getContext('2d')
  this.render()
  this.update()
}

Game.prototype.startGame = function() {
  this.start = true
  this.currentTetris = new DrawTetris()
}

Game.prototype.pauseGame = function() {
  this.start = !this.start
}

Game.prototype.endGame = function() {
  this.start = false
}

Game.prototype.getPosition = function(x, y) {
  return new Vector(
    x*this.bw + (x-1)*this.bs,
    y*this.bh + (y-1)*this.bs
  )
}

Game.prototype.drawBlock = function(v, color){
  this.ctx.fillStyle = color
  var pos = this.getPosition(v.x, v.y)
  this.ctx.fillRect(pos.x, pos.y, this.bw, this.bh)
}

Game.prototype.storeRepository = function(){
  this.currentTetris.body.forEach((block)=>{
    this.currentTetris.repository.push(block)
  })
}

var DrawTetris = function(){
  this.shape = [
    [[{x: 1, y:-4}, {x:1, y:-3}, {x:1, y:-2}, {x: 1, y:-1}],
     [{x: 0, y:-3}, {x:1, y:-3}, {x:2, y:-3}, {x: 3, y:-3}],
     [{x: 2, y:-4}, {x:2, y:-3}, {x:2, y:-2}, {x: 2, y:-1}],
     [{x: 0, y:-2}, {x:1, y:-2}, {x:2, y:-2}, {x: 3, y:-2}]], //I
    [[{x: 1, y:-4}, {x:1, y:-3}, {x:1, y:-2}, {x: 0, y:-2}],
     [{x: 1, y:-4}, {x:1, y:-3}, {x:1, y:-2}, {x: 0, y:-2}],
     [{x: 1, y:-4}, {x:1, y:-3}, {x:1, y:-2}, {x: 0, y:-2}],
     [{x: 1, y:-4}, {x:1, y:-3}, {x:1, y:-2}, {x: 0, y:-2}]], //J
    [[{x: 1, y:-4}, {x:1, y:-3}, {x:1, y:-2}, {x: 2, y:-2}],
     [{x: 1, y:-4}, {x:1, y:-3}, {x:1, y:-2}, {x: 2, y:-2}],
     [{x: 1, y:-4}, {x:1, y:-3}, {x:1, y:-2}, {x: 2, y:-2}],
     [{x: 1, y:-4}, {x:1, y:-3}, {x:1, y:-2}, {x: 2, y:-2}]], //L
    [[{x: 0, y:-4}, {x:1, y:-4}, {x:0, y:-3}, {x: 1, y:-3}],
     [{x: 0, y:-4}, {x:1, y:-4}, {x:0, y:-3}, {x: 1, y:-3}],
     [{x: 0, y:-4}, {x:1, y:-4}, {x:0, y:-3}, {x: 1, y:-3}],
     [{x: 0, y:-4}, {x:1, y:-4}, {x:0, y:-3}, {x: 1, y:-3}]], //O
    [[{x: 1, y:-3}, {x:2, y:-3}, {x:0, y:-2}, {x: 1, y:-2}],
     [{x: 1, y:-3}, {x:2, y:-3}, {x:0, y:-2}, {x: 1, y:-2}],
     [{x: 1, y:-3}, {x:2, y:-3}, {x:0, y:-2}, {x: 1, y:-2}],
     [{x: 1, y:-3}, {x:2, y:-3}, {x:0, y:-2}, {x: 1, y:-2}]], //S
    [[{x: 0, y:-3}, {x:1, y:-3}, {x:2, y:-3}, {x: 1, y:-2}],
     [{x: 0, y:-3}, {x:1, y:-3}, {x:2, y:-3}, {x: 1, y:-2}],
     [{x: 0, y:-3}, {x:1, y:-3}, {x:2, y:-3}, {x: 1, y:-2}],
     [{x: 0, y:-3}, {x:1, y:-3}, {x:2, y:-3}, {x: 1, y:-2}]], //T
    [[{x: 0, y:-3}, {x:1, y:-3}, {x:1, y:-2}, {x: 2, y:-2}],
     [{x: 0, y:-3}, {x:1, y:-3}, {x:1, y:-2}, {x: 2, y:-2}],
     [{x: 0, y:-3}, {x:1, y:-3}, {x:1, y:-2}, {x: 2, y:-2}],
     [{x: 0, y:-3}, {x:1, y:-3}, {x:1, y:-2}, {x: 2, y:-2}]]  //Z
  ]; //考慮要不要用對 center 關係
  this.color = ["rgba(122,199,79, 0.5)", "rgba(255,102,102, 0.5)", "rgba(55,114,255, 0.5)", "rgba(244,224,77, 0.5)", "rgba(75,41,107, 0.5)", "rgba(8,160,69, 0.5)", "rgba(97,198,236, 0.5)"]
  
  this.body = []
  this.speed = new Vector(0, 1) //向下走
  this.type = 0 //哪種型態的拼圖
  this.rotate = 0 //控制不同的拼圖角度
  this.repository = []
  this.currentHeight = new Vector(1, -3) //控制目前高度，進行旋轉或型態轉換
  this.shape[this.type][this.rotate].forEach((block)=>{
    this.body.push(new Vector(block.x, block.y))
  }) //不同型態的拼圖
  
}

DrawTetris.prototype.move = function(dir, gameWidth, gameHeight){
  var target
    if (dir == "Up" && this.checkBoundaryTop(gameWidth, gameHeight)) {
      this.body.length = 0
      this.rotate = (this.rotate + 1)%4
      this.shape[this.type][this.rotate].forEach((block)=>{
        this.body.push(new Vector(block.x, block.y))
      })
      console.log(this.rotate)
      target = new Vector(0, -1)
    }
    if (dir == "Down"  && this.checkBoundaryBottom(gameWidth, gameHeight) && this.checkBoundaryRepositoryDown()) {
      target = new Vector(0, 1)
    }
    if (dir == "Left" && this.checkBoundaryLeft(gameWidth, gameHeight) && this.checkBoundaryRepositoryLeft()) {
      target = new Vector(-1, 0)
    }
    if (dir == "Right" && this.checkBoundaryRight(gameWidth, gameHeight) && this.checkBoundaryRepositoryRight()) {
      target = new Vector(1, 0)
    }
    this.body.forEach((block)=>{
      block.move(target.x, target.y)
    })

}

DrawTetris.prototype.update = function(){
  
  this.currentHeight.move(this.speed.x, this.speed.y)
  console.log(this.currentHeight)
  this.body.forEach((block)=>{
    block.move(this.speed.x, this.speed.y)
  })
  
}

DrawTetris.prototype.newDrawTetris = function(){  
  this.body.length = 0
  this.type = 1
  this.shape[this.type][this.rotate].forEach((block)=>{
    this.body.push(new Vector(block.x, block.y))
  })
}

DrawTetris.prototype.checkBoundaryLeft = function(gameWidth, gameHeight){
  let xInRange = true

  this.body.forEach((block)=>{
    let blockX
    blockX = block.x > 0 ? true : false
    xInRange = xInRange && blockX
  })
  return xInRange
}

DrawTetris.prototype.checkBoundaryRight = function(gameWidth, gameHeight){
  let xInRange = true
  this.body.forEach((block)=>{
    let blockX
    blockX = block.x < gameWidth - 1 ? true : false
    xInRange = xInRange && blockX
  })
  
  return xInRange
}


DrawTetris.prototype.checkBoundaryTop = function(gameWidth, gameHeight){
  let yInRange = true
  this.body.forEach((block)=>{
    let blockY
    blockY = block.y > 0 ? true : false
    yInRange = yInRange && blockY
  })
  return yInRange
}

DrawTetris.prototype.checkBoundaryBottom = function(gameWidth, gameHeight){
  let yInRange = true
  this.body.forEach((block)=>{
    let blockY
    blockY = block.y < gameHeight - 1 ? true : false
    yInRange = yInRange && blockY
  })
  return yInRange
}

DrawTetris.prototype.checkBoundaryRepositoryDown = function(){
  let yInRange = false
  if (this.repository.length !== 0) {
    this.repository.forEach((rblock)=>{
      this.body.forEach((bblock)=>{
        var currentLogic = false
        currentLogic = bblock.x == rblock.x && bblock.y == rblock.y - 1 ? true : false
        yInRange = yInRange || currentLogic
      })
    })
  }
  return !yInRange
}

DrawTetris.prototype.checkBoundaryRepositoryLeft = function(){
  let yInRange = false
  if (this.repository.length !== 0) {
    this.repository.forEach((rblock)=>{
      this.body.forEach((bblock)=>{
        var currentLogic = false
        currentLogic = bblock.x == rblock.x + 1 && bblock.y == rblock.y ? true : false
        yInRange = yInRange || currentLogic
      })
    })
  }
  return !yInRange
}

DrawTetris.prototype.checkBoundaryRepositoryRight = function(){
  let yInRange = false
  if (this.repository.length !== 0) {
    this.repository.forEach((rblock)=>{
      this.body.forEach((bblock)=>{
        var currentLogic = false
        currentLogic = bblock.x == rblock.x - 1 && bblock.y == rblock.y ? true : false
        yInRange = yInRange || currentLogic
      })
    })
  }
  return !yInRange
}

Game.prototype.render = function(){
  this.ctx.fillStyle = "white"
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  for(var i=0; i< this.gameWidth; i++){
    for(var j=0; j< this.gameHeight; j++){
      this.drawBlock(new Vector(i, j), 'rgba(27, 47, 51, 0.3)')
    }
  }
  
  this.currentTetris.body.forEach((tp, i)=>{
    this.drawBlock(tp, "green")
  })
  this.currentTetris.repository.forEach((sp, i)=>{
    this.drawBlock(sp, "yellow")
  })
  requestAnimationFrame(()=>{
    
    this.render()
    
  })
}

Game.prototype.update = function(){
  
  if(this.start){
      if(this.currentTetris.checkBoundaryRepositoryDown()==false){
        this.storeRepository()
        this.currentTetris.newDrawTetris()
      }
    
      if(this.currentTetris.checkBoundaryBottom(this.gameWidth, this.gameHeight)==false){
     this.storeRepository()
     this.currentTetris.newDrawTetris()
  }
      this.currentTetris.update()
  }
  
  setTimeout(()=>{
    this.update()
  }, 1000)
}

var game = new Game()
game.init()

$(window).keydown(function(evt){
  if(evt.key === " "){
    game.pauseGame()
  } else {
    game.currentTetris.move(evt.key.replace("Arrow", ""), game.gameWidth, game.gameHeight)
  }
})