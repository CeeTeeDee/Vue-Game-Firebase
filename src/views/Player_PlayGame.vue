<template>
    <div className="list">
        <Sidebar_Player />
        <div className="listContainer">
            <Player_Navbar />
            <br />
            <Container>
                <canvas width="600" height="400" @contextmenu.prevent></canvas>

                <div class="setting-game">

                    <div class="box-setting-game">
                        <div class="box-setting-game__level">
                            <select id="levelOptions" @change="chooseLevel()">
                                <option value="1">Easy</option>
                                <option value="2">Medium</option>
                                <option value="3">Hard</option>
                            </select>
                        </div>

                        <div class="box-setting-game__behavior-game">
                            <button @click="playGame()">
                                <img src="@/img/play.svg" alt="Play" title="Play">
                                <span>PLAY</span>
                            </button>
                        </div>
                    </div>

                    <div class="box-setting-view">
                        <div class="box-setting-view__score">
                            <p>Score</p>
                            <span class="--score" v-text="score"></span>
                        </div>
                        <div class="box-setting-view__timer">
                            <p>Timer</p>
                            <span class="--timer" name="timer">00:{{ seconds < 10 ? '0' + seconds : seconds }}</span>
                        </div>
                    </div>

                    <!-- <div class="container-score-table">
                        <table class="score-table">
                            <tbody>
                                <tr class="score-table--title">
                                    <th colspan="2"><b>Tabela de pontos</b></th>
                                </tr>
                                <tr class="score-table--header">
                                    <th>Difficult</th>
                                    <th>Score</th>
                                </tr>
                                <tr v-if="checkScore.length < 1">
                                    <td>Player</td>
                                    <td>0</td>
                                </tr>
                                <tr v-else v-for="(item, pos) in checkScore" :key="`points--${pos}`">
                                    <td v-text="item.level"></td>
                                    <td v-text="item.score"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->

                    <div class="box-setting-view__rules">
                        <p class="how-to-play">Game rule:</p>
                        <p>Hit the target as much as  you can in a short time..</p>
                    </div>

                </div>

            </Container>
        </div>
    </div>
</template>
  
<script>
// import BookDataService from "../service/book.services";
import { db } from "../firebaseInit"
import { collection, addDoc, getDoc, doc } from "firebase/firestore"
import {
    getAuth
} from "firebase/auth";
// import { auth } from "../firebaseInit";
import Sidebar_Player from "@/components/User/Sidebar/Sidebar_Player.vue";
import Player_Navbar from "@/components/User/Navbar/Player_Navbar.vue";

// import firebase from "../firebase";
// import 'firebase/firestore';
// const db = firebase.firestore();
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Admin_UserList',
    components: {
        Sidebar_Player,
        Player_Navbar,
    },
    data() {
        return {
            raio: 10,
            valorX: 0,
            valorY: 0,
            targetRandom: false,
            canvas: null,
            pincel: null,
            selectedLevel: '1',
            namedLevel: '',
            speedTarget: 1000,
            score: 0,
            seconds: 10,
            myInterval: null,
            gameon: null,
            isFirstGame: true,
            isFirstCount: true,
            countOff: true,
            checkScore: [],

        }
    },
    methods: {

        checkLevel() {
            if (this.selectedLevel == '1') {
                this.namedLevel = 'Easy';
            } else if (this.selectedLevel == '2') {
                this.namedLevel = 'Medium';
            } else {
                this.namedLevel = 'Dificult';
            }
        },

        chooseLevel() {
            const selectLevel = document.getElementById('levelOptions');
            const valueSelect = selectLevel.options[selectLevel.selectedIndex].value;

            this.selectedLevel = valueSelect;

            if (this.selectedLevel == '0') {
                this.selectedLevel == '1';
            }

            switch (this.selectedLevel) {
                case '1':
                    this.speedTarget = 1000;
                    break;
                case '2':
                    this.speedTarget = 800;
                    break;
                case '3':
                    this.speedTarget = 600;
                    break;
                default:
                    break;
            }

            clearInterval(this.myInterval);
            this.seconds = 0;
            this.score = 0;
            this.countOff = false;
            this.isFirstGame = true;
        },

        async playGame() {
            this.isFirstGame = true;
            this.isFirstCount = true;
            //Login test
            // await signInWithEmailAndPassword(auth, "theadmin@gmail.com", "123456");

            //Get Current user value
            // var user = firebase.auth().currentUser;
            var test = getAuth().currentUser;
            // console.log(user);
            console.log(test);
            if (this.isFirstGame) {
                this.seconds = 10;
                this.countOff = true;
                this.targetRandom = true;
                this.checkLevel();

                if (this.isFirstCount) {
                    this.countDown();
                    this.isFirstCount = false;
                }

                this.canvas.onclick = this.checkIfYouHit;

                this.myInterval = setInterval(this.createTarget, this.speedTarget);
                this.isFirstGame = false;
            }
        },

        countDown() {
            this.gameon = setInterval(async () => {
                if (this.seconds == 1) {
                    const colRef = collection(db, 'Leaderboard_Easy');
                    const colRef2 = collection(db, 'Leaderboard_Medium');
                    const colRef3 = collection(db, 'Leaderboard_Hard');
                    var test2 = getAuth().currentUser;
                    const UserDoc = doc(db, "users_info", test2.uid);
                    const docSnap = await getDoc(UserDoc);
                    // data to send
                    const dataObj = {
                        Name: docSnap.data().Fullname,
                        email: docSnap.data().email,
                        uid: docSnap.data().uid,
                        Score: this.score,
                    };


                    if (this.selectedLevel == '1') {
                        await addDoc(colRef, dataObj);
                    } else if (this.selectedLevel == '2') {
                        await addDoc(colRef2, dataObj);
                    } else {
                        await addDoc(colRef3, dataObj);
                    // eslint-disable-next-line no-extra-semi
                    };
                }

                if (this.seconds > 1 && this.countOff) {
                    this.seconds -= 1;
                    console.log(this.seconds);

                    // if (this.score % 5 == 0){
                    //     this.seconds += 5;
                    // }
                }
                else {

             
                    console.log(this.seconds);
                    // create document and return reference to it
                    // await addDoc(colRef, dataObj);


                    this.seconds = 10;
                    this.score = 0;
                    
                    // this.countOff = false;
                    this.cleanCanvas();
                    clearInterval(this.myInterval);
                    clearInterval(this.gameon);
                    
                }
            }, 1000)
        },

        cleanCanvas() {
            this.pincel.clearRect(0, 0, 600, 400);
            this.pincel.fillStyle = '#222222';
            this.pincel.fillRect(0, 0, 600, 400);
        },

        drawCircle(x, y, raio, cor) {
            this.pincel.fillStyle = cor;
            this.pincel.beginPath();
            this.pincel.arc(x, y, raio, 0, 2 * Math.PI);
            this.pincel.fill();
            this.valorX = x;
            this.valorY = y;
        },

        createTarget() {
            if (this.targetRandom) {
                this.cleanCanvas();
                var x = Math.round(Math.random() * 600);
                var y = Math.round(Math.random() * 400);

                this.drawCircle(x, y, this.raio + 20, 'blue'); // maior círculo
                this.drawCircle(x, y, this.raio + 10, 'red');
                this.drawCircle(x, y, this.raio, 'yellow'); // menor circulo
            }
        },

        checkIfYouHit($event) {
            var x = $event.pageX - this.canvas.offsetLeft;
            var y = $event.pageY - this.canvas.offsetTop;

            if (
                x >= this.valorX - this.raio
                && this.valorX <= x + this.raio
                && y >= this.valorY - this.raio
                && y <= this.valorY + this.raio
                && this.countOff) {

                this.score += 1;
            }
        },

        createTools() {
            const $canvas = document.querySelector('canvas');
            const pincel = $canvas.getContext('2d');

            this.canvas = $canvas;
            this.pincel = pincel

            this.pincel.fillStyle = '#343434';
            this.pincel.fillRect(0, 0, 600, 400);
        }
    },
    mounted() {
        this.createTools();
    }
}
</script>
  
<style lang="scss">
canvas {
    display: block;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 0 1em #000;
}

.setting-game {
    display: block;
    margin: 0 auto;
    max-width: 600px;

    .box-setting-game__level,
    .box-setting-game__behavior-game {
        select {
            width: 180px;
            height: 58px;
            padding: 1em;
            text-align: center;
            border-radius: 10px;
            font-size: 1.2em;
            font-family: 'Gluten', cursive;
            background-color: #00a1ff;
            color: #FFFFFF;
            border: none;
            outline: none;
            transition: .3s;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: linear-gradient(45deg, transparent 50%, white 50%), linear-gradient(135deg, white 50%, transparent 50%);
            background-position: calc(100% - 26px) calc(1em + 4px), calc(100% - 21px) calc(1em + 4px), calc(100% - 2.5em) 0.5em;
            background-size: 10px 6px, 6px 10px, 1px 1.5em;
            background-repeat: no-repeat;

            &:hover {
                cursor: pointer;
                background-color: #00a1ffbf;
                transition: ease-in-out .3s;
            }

            option {
                background-color: #FFF;
                color: #000;
            }
        }

        button {
            width: 180px;
            height: 58px;
            padding: 1em;
            text-align: center;
            border-radius: 10px;
            font-size: 1.2em;
            font-family: 'Gluten', cursive;
            display: flex;
            place-items: center;
            justify-content: center;
            background-color: #0a8300;
            color: #FFFFFF;
            transition: .3s;
            border: none;
            outline: none;

            &:hover {
                cursor: pointer;
                background-color: #0a8300b5;
                transition: ease-in-out .3s;
            }

            img {
                width: 20px;
                height: auto;
                margin-right: 1em;
            }
        }
    }

    .box-setting-view__score,
    .box-setting-view__timer {
        p {
            margin: 0;
            padding-bottom: 1em;
            font-size: 1.325em;
            color: #6e0c0c;
            font-weight: 500;
        }

        span {
            font-size: 1.4em;
            color: #000;
            padding: 8px 1em;
        }

        .--score {
            color: red;
        }

        .--timer {
            border-radius: 10px;
            background-color: #f1f1f1;
            color: #ff7b00;
        }
    }

    .container-score-table {
        width: 340px;
        max-height: 220px;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-right: 6px;
        margin: 3em auto 0 auto;

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #a7a7a7;
            border-radius: 20px;
        }

        .score-table {
            width: inherit;

            td,
            th {
                border: 1px solid #000000;
                border-radius: 5px;
                text-align: left;
                padding: 10px;
                text-align: center;
            }

            tr:nth-child(even) {
                background-color: #e7e7e7;
                color: #000000;
            }

            tr:nth-child(odd) {
                color: #000000;
            }

            tr.score-table--title {
                background-color: #460072;
                color: #ffffff;
            }

            tr.score-table--header {
                background-color: #000000;
                color: #FFFFFF;
            }

        }
    }

    .box-setting-game,
    .box-setting-view {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        padding-top: 1.5em;
        text-align: center;
    }

    .box-setting-view__rules {
        padding: 1.5em 1em 0 1em;

        .how-to-play {
            font-size: 1.5em;
            font-weight: 500;
            box-shadow: #000;
        }

        p {
            font-size: 1em;
            line-height: 1.425em;
        }
    }

    body {
        padding: 0;
        margin: 0;
        background: url("./img/background.jpg") round;
        font-size: 16px;
    }

}
</style>
  