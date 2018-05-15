<template>
  <div class="hello">
       <h1>看到<span style="color: red">紅色</span>請輸入相反的數字</h1>
       <h1>看按 START 開始遊戲</h1>
       <h1>請按 Enter 輸入答案</h1>
       <h1>{{ question }}</h1>
       <h2 :class="{active: answerControl.reverse}"> Reverse Or Not {{ answerControl.reverse }}</h2>
   
    <input placeholder="Please Enter it" type="text" @keydown.enter="answerIt()" v-model.number="answer">
    <button @click="changeQuestion()">START/ CHANGE</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      question: 0,
      answer: 0,
      answerControl: {
        reverse: true
      },
      score: 0
    }
  },
  methods: {
    answerIt(){

      var checkQuestion = 0
      if ( this.answerControl.reverse ) {
        checkQuestion = this.reverseNumber(this.question)
      } else {
        checkQuestion = this.question
      }
      console.log(checkQuestion)
      if (this.answer === checkQuestion) {
        this.score++
        alert("OK")
      } else {
        alert("Please Try Again")
      }
      this.question = this.changeQuestion()
      this.answer = ""
    },
    changeQuestion(){
      var newQuestion = 0
      var ifReverse = Math.ceil(Math.random()*100)%2
      console.log(ifReverse)
      if(ifReverse){
         this.answerControl.reverse = true
      } else {
         this.answerControl.reverse = false
      }
      newQuestion = Math.floor(Math.random()*1000)
      this.question = newQuestion
      return newQuestion
    },
    reverseNumber(insert){
      var reversed = 0;

      var y = insert.toString();
      var z = y.split("").reverse().join("");
      var reversed = Number(z);
      return reversed;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  background-color: black
}
.active {
  background-color: red;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
