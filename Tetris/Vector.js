

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

Vector.prototype.angle = function(v) {
  return Math.atan2(this.y, this.x)
}
