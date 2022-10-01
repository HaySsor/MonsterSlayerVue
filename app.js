function randomValue(max, min) {
    return Math.floor(Math.random() * (max - min)) + 5
}


const app = Vue.createApp({
    data() {
        return {
            yourHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessageArr: [],
        }
    }, computed: {
        specialAttack() {
            return this.currentRound % 3 !== 0
        },
        yourBarStyle() {
            if (this.yourHealth < 0) { return { width: '0%' } }
            return { width: `${this.yourHealth}%` }
        },
        monsterBarStyle() {
            if (this.monsterHealth < 0) { return { width: '0%' } }
            return { width: `${this.monsterHealth}%` }
        }
    },
    watch: {
        yourHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "Draw"
            } else if (value <= 0) {
                this.winner = "Monster Win"
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.yourHealth <= 0) {
                this.winner = "Draw"
            } else if (value <= 0) {
                this.winner = "You Win"
            }
        }
    },
    methods: {
        calculationRound() {
            this.currentRound++
        },
        playerAttack() {
            this.calculationRound()
            const playerAttactValue = randomValue(12, 5)
            this.monsterHealth -= playerAttactValue
            this.addLogMessage('Player', 'attact', playerAttactValue)
            this.monsterAttack()

        },
        monsterAttack() {
            const monsterAttactValue = randomValue(15, 8)
            this.yourHealth -= monsterAttactValue
            this.addLogMessage('Monster', 'attact', monsterAttactValue)
        },

        specialAttackMonster() {
            this.calculationRound()
            const playerSpecialAttackValue = randomValue(25, 10)
            this.monsterHealth -= playerSpecialAttackValue
            this.addLogMessage('Player', 'special attact', playerSpecialAttackValue)
            this.monsterAttack()
        },
        healPlayer() {
            this.calculationRound()
            const healValue = randomValue(20, 8)
            if (this.yourHealth + healValue > 100) {
                this.yourHealth = 100
            } else {
                this.yourHealth += healValue
            }
            this.addLogMessage('Player', 'heal', healValue)
            this.monsterAttack()
        },
        resetGame() {
            this.monsterHealth = 100
            this.yourHealth = 100
            this.winner = null
            this.logMessageArr = []
        },
        surrender() {
            this.winner = 'MonsterWin'
        },
        addLogMessage(who, what, value) {
            this.logMessageArr.unshift({
                action: who,
                actionType: what,
                actionValue: value
            })
        }

    },
}).mount('#game')