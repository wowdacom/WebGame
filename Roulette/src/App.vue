<template>
  <div id="app">
    <h1>{{ gameTime }}</h1>
    <div class="wrapper">
      <div class="showPlate">
        <plate-component :rouletteg-plate="roulettegPlate" :ticket-number="ticketNumber" ref="plateComponent"></plate-component>
      </div>
      <div class="showUserInfo">
        <ul>
          <li v-for="(item, key) in gamer[singlePlayerID]">
            <span v-if="key !== 'tickets' && key !== 'userId' ">
              {{ key }} : {{ item }}
            </span>  
          </li>
          <li v-for="(item, key) in gamer[singlePlayerID].tickets">
            <span v-if="key !== 'tickets' && key !== 'userId' ">
              {{ key }} : {{ item }}
            </span>  
          </li>
        </ul>
      </div>
    </div>
    
    <div class="register popUp" v-if="gameState.isRegister">
      <div class="insertBox">
        <h5>請輸入姓名：</h5>
        <input type="text" placeholder="Your name is..." v-model="singlePlayerName" @keyup.enter="register(singlePlayerName)">
        <span>{{ singlePlayerName }}</span>
      </div>
    </div>
    <div class="chooseCards popUp" v-if="gameState.isChooseCard">
      <ul>
        <li v-for="(item, key) in rules" :style="{background: key}" @click="chooseCards(singlePlayerID, key)">
          {{ key }}
        </li>
      </ul>
    </div>
    <div class="countingDown popUp" v-if="gameState.isCountingDown">
      <h1>{{ countingNumber }}</h1>
    </div>
    <div class="showResult popUp" v-if="gameState.isShowResult">
      <li v-for="(item, key) in gamer[singlePlayerID]">
        <span v-if="key !== 'tickets' && key !== 'userId' ">
          {{ key }} : {{ item }}
        </span>  
      </li>
      <li v-for="(item, key) in gamer[singlePlayerID].tickets">
        <span v-if="key !== 'tickets' && key !== 'userId' ">
          {{ key }} : {{ item }}
        </span>  
      </li>
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import PLATE from '@/components/plate'

export default {
  name: 'App',
  props: {},
  components: {
    'plate-component': PLATE
  },
  data: function () {
      return {
      title: "Hello Gamer",
      gameTime: 1,
      singlePlayerID: 'test',
      singlePlayerName: "",
      countingNumber: 6,
      gameState: {
        isRegister: true,
        isChooseCard: false,
        isCountingDown: false,
        isRollingPlate: false,
        isShowResult: false
      },
      rules: {
        'blue': 2,
        'green': 4,
        'red': 7,
        'yellow': 13,
        'purple': 26,
        'gold': 51,
        'salmon': 51
      },
      roulettegPlate: ['salmon', 'blue', 'green', 'blue', 'red', 'green', 'blue', 'yellow', 'blue', 'red', 'blue', 'green', 'blue', 'purple', 'blue', 'green', 'blue', 'red', 'blue', 'green', 'blue', 'yellow', 'blue', 'red', 'blue', 'green', 'blue', 'gold', 'green', 'blue', 'green', 'blue', 'green', 'blue', 'yellow', 'blue', 'red', 'blue', 'blue', 'blue', 'purple', 'blue', 'green', 'blue', 'red', 'blue', 'yellow', 'blue', 'green', 'blue', 'red', 'blue', 'green', 'blue' ],
      gamer: {
        'test': {
          'name': "Anonymous",
          'balance': 50,
          'userId': "a310166",
          'tickets': {       
            'blue': 0,
            'green': 0,
            'red': 0,
            'yellow': 0,
            'purple': 0,
            'gold': 0,
            'salmon': 0
          }
        }
      },
      ticketNumber: 0,
      rollingEvent: false,
      //
      testConfig: {
        showConsole: true
      }
    }
  },
  mounted: function () {
    setInterval(()=>{
      this.gameTime = ((this.gameTime+1)%61)
    }, 1000)
  },
  methods: {
    createId () {
      return '_' + Math.random().toString(36).substr(2, 9);
    },
    ticketReset (singlePlayerID = 'test') {
      console.log(this.gamer[singlePlayerID].tickets)
      this.gamer[singlePlayerID].tickets = {       
            'blue': 0,
            'green': 0,
            'red': 0,
            'yellow': 0,
            'purple': 0,
            'gold': 0,
            'salmon': 0
          }
    },
    register (name = 'anonymous') {
      let userId = this.createId()
      // POST instead
   
      this.gamer[userId] = {
        'name': name,
        'balance': 50,
        'userId': userId,
        'tickets': {       
          'blue': 0,
          'green': 0,
          'red': 0,
          'yellow': 0,
          'purple': 0,
          'gold': 0,
          'salmon': 0
        }
      }

      document.cookie = `userId=${userId}`;
      this.singlePlayerID = userId
      if(this.testConfig.showConsole) {
        console.log("UserInfo: ", this.gamer)
      }
      
      this.gameState.isRegister = false
    },
    chooseCards (singlePlayerID = 'test', card) {
      //測試有沒有卡，以及存款足夠購買
      
      if(this.rules[card] && this.gamer[singlePlayerID].balance - 1 > 0) {
        this.gamer[singlePlayerID].balance -= 1
        this.gamer[singlePlayerID].tickets[card] += 1
        if(this.showTest) {
          console.log(this.gamer[singlePlayerID].balance)
          console.log(this.gamer[singlePlayerID].tickets)
        }
      } else {
        console.log('there are something wrong')
      }
      console.log(this.gamer[singlePlayerID].balance)
      console.log(this.gamer[singlePlayerID].tickets)
    },
    drawTheWinningNumbers () {
      let result = Math.floor((Math.random() * 1000))% 54;
      this.ticketNumber = result
      console.log(this.ticketNumber)
      if(this.showTest) {
        console.log(this.ticketNumber)     
      }
    },
    countDownToRollingPlate () {
      this.countingNumber -= 1
    },
    settleAccounts (singlePlayerID = 'test') {
      // gameStatus = stop
      console.log("I am coming")
      var currentTicket = this.roulettegPlate[this.ticketNumber]
      console.log(currentTicket)
      if(this.gamer[singlePlayerID].tickets[currentTicket]){
        this.gamer[singlePlayerID].balance += this.gamer[singlePlayerID].tickets[currentTicket]*this.rules[currentTicket]
        if(this.showTest) {
          console.log(this.gamer[singlePlayerID].balance)
        }      
      } else {
        console.log("Nice Try!")
      }
      setTimeout(()=>{
        this.ticketReset(this.singlePlayerID)
      }, 5000)
    }
  },
  watch: {
    gameTime: function (value) {
      if ( 1 <= value && value <= 35 && this.singlePlayerID !== 'test') {
        this.gameState.isShowResult = false
        this.gameState.isChooseCard = true
        
        this.drawTheWinningNumbers()
      } else if ( 36 <= value && value <= 40) {
        this.gameState.isChooseCard = false
        this.gameState.isCountingDown = true
        this.countDownToRollingPlate()
      } else if ( 41 === value) {
        this.gameState.isCountingDown = false
        this.gameState.isRollingPlate = true
        this.$refs.plateComponent.rollingPlate()
        setTimeout(()=>{
          this.$refs.plateComponent.stopPlate()
        },5000)
      } else if ( 51 === value) {
        this.gameState.isRollingPlate = false
        this.gameState.isShowResult = true
        this.settleAccounts(this.singlePlayerID)
      } else {

      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  h1 {
    text-align: center;
  }
  .wrapper {
    clear: both;
    .showPlate {
      float: right;
    }
    .showUserInfo {
      float: left;
    ul {  
      li {
        list-style: none;
      }
    }
  }
  }
  
  .popUp {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background: rgba(black, 0.5);
  }
  .register {
    .insertBox {
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%, -50%);
      input {
        padding-left: 5px;
      }
    }
  }
  .chooseCards {
    ul {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      li {
        width: calc(100vw/8);
        line-height: calc(100vh/8);
        list-style: none;
        display: inline-block;
        text-align: center;
        font-weight: bolder;
        color: white;
        cursor: pointer;
      }
    }
  }
  .countingDown {
    h1 {
      color: red
    }
  }
}
</style>
