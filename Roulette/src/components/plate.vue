<template>
  <div>
      <canvas id="canvas"></canvas>
      <button @click="stopPlate">動畫暫停</button>
      <!-- <button @click="rollThePlate">動畫開始</button><button @click="stopPlate">動畫暫停</button> -->
  </div>
</template>

<script>
export default {
  name: 'plate',
  props: ['ticket-number', 'rolling-event'],
  data: function () {
    return {
      roulettegPlate: ['salmon', 'blue', 'green', 'blue', 'red', 'green', 'blue', 'yellow', 'blue', 'red', 'blue', 'green', 'blue', 'purple', 'blue', 'green', 'blue', 'red', 'blue', 'green', 'blue', 'yellow', 'blue', 'red', 'blue', 'green', 'blue', 'gold', 'green', 'blue', 'green', 'blue', 'green', 'blue', 'yellow', 'blue', 'red', 'blue', 'blue', 'blue', 'purple', 'blue', 'green', 'blue', 'red', 'blue', 'yellow', 'blue', 'green', 'blue', 'red', 'blue', 'green', 'blue' ],
      pace: 0,
      stopRolling: false,
      animationID: 0,
      count: 54*3,
      slowDown: false,
      isRolling: this.rollingEvent
    }
  },
  mounted () {   
    this.drawPlate()
    console.log(this.ticketNumber)
    console.log(this.rollingEvent)
  },
  methods: {
    drawPlate () {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext("2d")
      let positionX = 1/2*window.innerWidth
      let positionY = 1/2*window.innerHeight
      let circlueSize = 200
      let pace = this.pace
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      for(let i=0; i< 54; i++) {
        let pieceBegin = 2*Math.PI/54*(i - pace)
        let pieceEnd = 2*Math.PI/54*(i - pace) + 2*Math.PI/54
        ctx.beginPath()
        ctx.moveTo(positionX, positionY)
        ctx.arc(positionX, positionY, circlueSize, pieceBegin, pieceEnd)
        ctx.closePath()
        ctx.fillStyle = this.roulettegPlate[i];
        ctx.fill()
      }
      ctx.beginPath()
        ctx.moveTo(positionX, positionY)
        ctx.arc(positionX + circlueSize, positionY, 10, 0, 2*Math.PI)
        ctx.closePath()
        ctx.fillStyle = "black"
        ctx.fill()
    },
    rollingPlate () {
      let time = 0
      let result = this.ticketNumber
      let count = 54
      let speed = 1
      let vm = this
      console.log(vm.roulettegPlate[result])
      function animate () {
        vm.pace = time%54
        vm.animationID = requestAnimationFrame(animate)
        
        if(vm.slowDown && result < vm.pace + count){
          speed = speed*0.999
          count = count - speed
          time = time + speed
        } else if (vm.slowDown && result <= vm.pace) {
          cancelAnimationFrame(vm.animationID)
        } else {
          time = time + speed
        }
      }   
      animate()
    },
    stopPlate () {
      this.slowDown = true
    }
  },
  watch: {
    pace: function () {
      this.drawPlate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
