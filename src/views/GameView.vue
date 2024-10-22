<template>
  <div>
    <div id='county-level'>
      <div id = 'durham' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)' >Durham</div>
      <div id = 'tyne_and_wear' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)'>Tyne and Wear</div>
      <div id = 'northumberland' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)'>Northumberland</div>

<!--      <el-button type="primary" circle plain class="audio" :disabled="audioPlaying" @click="playAudio">-->
<!--        <i class="el-icon-video-play" style="font-size: 50px;" ></i>-->
<!--      </el-button>-->
      <div class="play-button" v-if="!audioPlaying" ref="playButton" @click="playAudio">
        Wey Aye!
      </div>

      <audio ref="audioPlayer" ></audio>

<!--      <div class="scores-display">-->
<!--        <div> Your Scores </div>-->
<!--        <div id = 'scores-you-get'> {{currentQuestion.score}} </div>-->
<!--      </div>-->

      <!-- Progress Bar with Percentage -->
      <div class="progress-container">
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: currentQuestion.progress + '%' }" id="customProgressBar">{{currentQuestion.progress}}%</div>
        </div>
      </div>

      <div id = "check-answer">
        <i class="el-icon-check" id = "right" style="font-size: 180px"></i>
        <i class="el-icon-close" id = "wrong" style="font-size: 180px"></i>
      </div>



    </div>

    <div id='borough-level'>
      <div id = 'gateshead' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)'>Gateshead</div>
      <div id = 'newcastle' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)'>Newcastle upon Tyne</div>
      <div id = 'sunderland' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)'>Sunderland</div>
      <div id = 'north_tyneside' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)'>North Tyneside</div>
      <div id = 'south_tyneside' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)'>South Tyneside</div>

<!--      <el-button type="primary" circle plain class="audio" :disabled="audioPlaying" @click="playAudio">-->
<!--        <i class="el-icon-video-play" style="font-size: 50px;" ></i>-->
<!--      </el-button>-->
      <div class="play-button" v-if="!audioPlaying" ref="playButton" @click="playAudio">
        Wey Aye!
      </div>
      <audio ref="audioPlayer" ></audio>

<!--      <div class="scores-display">-->
<!--        <div> Your Scores </div>-->
<!--        <div id = 'scores-you-get'> {{currentQuestion.score}} </div>-->
<!--      </div>-->

      <!-- Progress Bar with Percentage -->
      <div class="progress-container">
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: currentQuestion.progress + '%' }" id="customProgressBar">{{currentQuestion.progress}}%</div>
        </div>
      </div>

      <div id = "check-answer">
        <i class="el-icon-check" id = "right2" style="font-size: 180px"></i>
        <i class="el-icon-close" id = "wrong2" style="font-size: 180px"></i>
      </div>

      <div v-if="dialogVisible" class="custom-dialog-overlay">
        <div class="custom-dialog">
          <h3 class="custom-dialog-title">Level Up! 🎉</h3>
          <p><strong>You’ve conquered the County level!</strong></p>
          <p>Now, brace yourself for a tougher challenge!</p>
          <p>Can you master the borough accents? </p>
          <p>Let’s find out!</p>

          <div class="custom-dialog-footer">
            <button @click="dialogVisible = false" class="custom-dialog-button">Go to the Borough Level!</button>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>


<script>
import request from "@/utils/request";

export default {
  props: {
    client_id: {
      type: Number,
      required: true // Ensure this prop is required
    }
  },
  data() {
    return {
      currentQuestion: {
        score: 0, // Example score (this could be dynamically set)
        progress: 0, // Initial progress
      },
      selection_form: {
        user_id : this.client_id,
        user_selection: "",
      },
      audioPlaying: false,
      answerClickable: false,
      dialogVisible: false,
      audio_duration:0,
    };
  },
  created() {
    this.initializeGame();
  },
  methods:{
    colourChange(event){
      if(this.answerClickable){
        const element = event.target;
        element.style.cursor = "pointer";
        element.style.color = "#CADB2F";
      }else{
        const element = event.target;
        element.style.cursor = "not-allowed";
      }
    },
    colourResume(event){
      const element = event.target;
      element.style.color = "white";
    },
    selectAnswer(selection){
      if(this.answerClickable){
        this.selection_form.user_selection = selection.target.id;
        request.post("/game/selection",this.selection_form)
            .then(res => {
              if (res.code === '0') {
                if(res.data.correctAnswer === true){

                  document.getElementById('right').style.display = 'block';
                  document.getElementById('right2').style.display = 'block';

                  setTimeout(() => {
                    document.getElementById('right').style.display = 'none';
                    document.getElementById('right2').style.display = 'none';
                  }, 0);

                }else{

                  document.getElementById('wrong').style.display = 'block';
                  document.getElementById('wrong2').style.display = 'block';
                  setTimeout(() => {
                    document.getElementById('wrong').style.display = 'none';
                    document.getElementById('wrong2').style.display = 'none';
                  }, 0);
                }

                setTimeout(()=>{
                  if(res.data.questionNum === 21){
                    this.dialogVisible = true;
                  }
                    this.handleResponse(res);
                },0);

              } else {
                alert(res.message); // Show error message
                return false;
              }
            });
        this.audioPlaying = false;
        this.answerClickable = false;
      }
    },
    initializeGame(){
      request.post("/game/initialize",this.client_id).then(res=>{
        this.handleResponse(res);
      })
    },
    handleResponse(res) {
      if (res.code === '0') {
        console.log(res.data);

        if(res.data.questionNum < 21){
          document.getElementById('county-level').style.display = 'block';
          document.getElementById('borough-level').style.display = 'none';
        }else{
          document.getElementById('county-level').style.display = 'none';
          document.getElementById('borough-level').style.display = 'block';
        }

        this.currentQuestion.progress = res.data.progress;
        this.currentQuestion.score = res.data.score;
        if (res.data.finished === true || res.data.questionNum > 40) {
          this.finishGame();
        }
      } else {
        alert(res.message);
        return false;
      }
    },
    playAudio(){
      request.get("/game/playAudio", { params: { id: this.client_id } }).then(res => {
        if (res.code === '0') {
          const audioUrl = `http://localhost:8081${res.data}`;
          this.$refs.audioPlayer.src = audioUrl;

          // 当音频可以播放时触发
          this.$refs.audioPlayer.addEventListener('canplaythrough', () => {
            const duration = this.$refs.audioPlayer.duration; // 获取音频的总时长
            this.audio_duration = duration * 1000;
            console.log(this.audio_duration);

            // 动态设置超时时间为音频的时长
            setTimeout(() => {
              this.answerClickable = true; // 在音频播放结束后激活按钮
            }, this.audio_duration);

            // 播放音频
            this.$refs.audioPlayer.play();
          });

        } else {
          alert(res.message);
          return false;
        }
        this.audioPlaying = true;
      });

    },
    finishGame(){
      this.$router.push({ name: 'result', params: { result_id: Number(this.client_id)} });
    }
  }
}
</script>


<style scoped>

div {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.play-button {
  width: 20vw; /* Width relative to the viewport width */
  height: 20vw; /* Height relative to the viewport width */
  max-width: 150px; /* Maximum width */
  max-height: 150px; /* Maximum height */
  border-radius: 20px; /* Rounded corners */
  background-color: #00A58E; /* Button color */
  color: white; /* Text color */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5vw; /* Font size relative to viewport width */
  cursor: pointer;
  position: absolute; /* Adjust position as needed */
  right: 5%; /* Position it appropriately */
  top: 5%; /* Position it appropriately */
  transition: background-color 0.3s, transform 0.2s; /* Smooth transitions */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Shadow for depth */
  padding: 30px;
}

.play-button:hover {
  background-color: #0056b3; /* Darker shade on hover */
  transform: translateY(-2px); /* Slight lift effect */
}

.play-button:active {
  transform: translateY(1px); /* Slight press effect */
}

.play-button:focus {
  outline: none; /* Remove outline */
}

/* Fullscreen overlay to make the background darker */
.custom-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  //background-image: url('@/assets/BackgroundImage 3.png');
  animation: fadeIn 0.5s;
}

/* Custom dialog box */
.custom-dialog {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  max-width: 800px;
  width: 30%; /* Default width for landscape orientation */
  text-align: center;
}

/* Title styling */
.custom-dialog-title {
  font-size: 24px;
  margin-bottom: 10px;
}

/* Content styling */
.custom-dialog-content {
  font-size: 20px;
  margin-bottom: 20px;
}

/* Footer with button */
.custom-dialog-footer {
  text-align: center;
}

.custom-dialog-button {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.custom-dialog-button:hover {
  background-color: #66b1ff;
}

@media (orientation: portrait) {
  #county-level{
    position: relative;
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/CountyMap.png');
    background-position: 56% 25%;
    background-size: 340vw 200vh;


  }

  #durham{
    position: absolute;
    cursor: pointer;
    color: #e0e0e0;
    Top: 80%;
    left: 30%;
    font-size: 7vw;

  }
  #tyne_and_wear{
    position: absolute;
    cursor: pointer;
    color: #e0e0e0;
    Top: 60%;
    left: 40%;
    font-size: 5vw;

  }
  #northumberland{
    position: absolute;
    cursor: pointer;
    color: #e0e0e0;
    Top: 50%;
    left: 15%;
    font-size: 5vw;
  }





  #borough-level{
    position: relative;
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/BoroughMap.png');
    background-position: 70% 65%;
    background-size: 600vw 400vh;

  }

  #gateshead{
    position: absolute;
    cursor: pointer;
    top:55%;
    left:10%;
    color: #e0e0e0;
    font-size: 3.5vh;
  }


  #newcastle{
    position: absolute;
    cursor: pointer;
    top:40%;
    left:0%;
    color: #e0e0e0;
    font-size: 3.5vh;
  }

  #sunderland{
    position: absolute;
    cursor: pointer;
    top:65%;
    left:40%;
    color: #e0e0e0;
    font-size: 4.5vh;
  }

  #south_tyneside{
    position: absolute;
    cursor: pointer;
    top:50%;
    left:45%;
    color: #e0e0e0;
    font-size: 3.5vh;
  }

  #north_tyneside{
    position: absolute;
    cursor: pointer;
    top:33%;
    left:32%;
    color: #e0e0e0;
    font-size: 3.5vh;
  }


  .audio{
    justify-content: center;
    align-items: center;
    //width: 70px;
    //height: 70px;
    position: absolute;
    margin: 10px;
    right: 10vw;
    top:5vh;
  }

  .scores-display{
    right: 10%;
    top:20vh;
    position: absolute;
    color: #142e2e;
    font-size: 5vw;
    transform:translate(10%);
  }
  #scores-you-get{
    position: absolute;
    right: 50%;
    transform: translate(50%,0%);
    font-size: 8vw;
  }

  .progress-container {
    width: 100%;
    max-width: 95vw;
    text-align: center;
    position: absolute;
    top:95%;
    left:50%;
    transform: translate(-50%,-90%);
  }

  /* Custom progress bar */
  .progress-bar-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 25px;
    overflow: hidden;
  }

  .progress-bar {
    height: 5vh;
    width: 0;
    background-color: #2196f3;
    text-align: center;
    line-height: 5vh;
    color: white;
    transition: width 0.3s ease;
  }

  #right{

    position: absolute;
    right: 8%;
    top:30%;
    transform: translate(12%,0%);
    display: none;
    color: #88CDEE;
  }
  #wrong{
    position: absolute;
    right: 8%;
    top:30%;
    transform: translate(12%,0%);
    display: none;
    color: #88CDEE;
  }

  #right2{

    position: absolute;
    right: 8%;
    top:30%;
    transform: translate(12%,0%);
    display: none;
    color: #88CDEE;
  }
  #wrong2{
    position: absolute;
    right: 8%;
    top:30%;
    transform: translate(12%,0%);
    display: none;
    color: #88CDEE;
  }
  .custom-dialog {
    width: 80%; /* 80% width in portrait orientation */
  }



}

@media (orientation: landscape){
  #county-level{
    position: relative;
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/CountyMap.png');
    background-position: 110% 30%;
    background-size: 120vw 240vh;

  }

  #durham{
    position: absolute;
    cursor: pointer;
    top:80%;
    left:35%;
    color: #e0e0e0;
    font-size: 6vh;
  }

  #tyne_and_wear{
    position: absolute;
    cursor: pointer;
    color: #e0e0e0;
    top:60%;
    left:40%;

    font-size: 3.5vh;
  }

  #northumberland{
    top:45%;
    left:25%;
    position: absolute;
    cursor: pointer;
    color: #e0e0e0;
    font-size: 6.2vh;
  }





  #borough-level{
    position: relative;
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/BoroughMap.png');
    background-position: 85% 68%;
    background-size: 240vw 480vh;

  }

  #gateshead{
    position: absolute;
    cursor: pointer;
    top:45%;
    left:20%;
    color: #e0e0e0;
    font-size: 5vh;
  }

  #newcastle{
    position: absolute;
    cursor: pointer;
    top:27%;
    left:20%;
    color: #e0e0e0;
    font-size: 3.5vh;
  }

  #sunderland{
    position: absolute;
    cursor: pointer;
    top:65%;
    left:40%;
    color: #e0e0e0;
    font-size: 3.5vh;
  }

  #south_tyneside{
    position: absolute;
    cursor: pointer;
    top:35%;
    left:40%;
    color: #e0e0e0;
    font-size: 3.5vh;
  }

  #north_tyneside{
    position: absolute;
    cursor: pointer;
    top:15%;
    left:35%;
    color: #e0e0e0;
    font-size: 3.5vh;
  }

  .audio{
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    top: 10%;
    right: 10%;
    position: absolute;
    margin: 10px;

  }

  .scores-display{
    position: absolute;
    color: #142e2e;
    top: 10%;
    right: 25%;
    font-size: 6vh;
    transform: translate(25%,0%);
  }

  #scores-you-get{
    position: absolute;
    right: 50%;
    transform: translate(50%,0%);
    font-size: 8vh;
  }

  .progress-container {
    width: 100%;
    max-width: 80vw;
    text-align: center;
    position: absolute;
    top:95%;
    left:50%;
    transform: translate(-50%,-90%);
  }

  /* Custom progress bar */
  .progress-bar-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 25px;
    overflow: hidden;
  }

  .progress-bar {
    height: 5vh;
    width: 0;
    background-color: #2196f3;
    text-align: center;
    line-height: 5vh;
    color: white;
    transition: width 0.3s ease;
  }

  #right{
    position: absolute;
    right: 25%;
    top:60%;
    transform: translate(25%,0%);
    display: none;
    color: #88CDEE;
  }
  #wrong{
    position: absolute;
    right: 25%;
    top:60%;
    transform: translate(25%,0%);
    display: none;
    color: #88CDEE;
  }

  #right2{
    position: absolute;
    right: 25%;
    top:60%;
    transform: translate(25%,0%);
    display: none;
    color: #88CDEE;
  }
  #wrong2{
    position: absolute;
    right: 25%;
    top:60%;
    transform: translate(25%,0%);
    display: none;
    color: #88CDEE;
  }
}


</style>

