<template>
  <div>
    <div id='county-level'>
      <div id = 'durham' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)' >Durham</div>
      <div id = 'tyne_and_wear' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)'>Tyne and Wear</div>
      <div id = 'northumberland' @click = 'selectAnswer($event)' @mouseover = 'colourChange($event)' @mouseout='colourResume($event)'>Northumberland</div>

      <el-button type="primary" circle plain class="audio" :disabled="audioPlaying" @click="playAudio">
        <i class="el-icon-video-play" style="font-size: 50px;" ></i>
      </el-button>
      <audio ref="audioPlayer" ></audio>

      <div class="scores-display">
        <div> Your Scores </div>
        <div id = 'scores-you-get'> {{currentQuestion.score}} </div>
      </div>

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

      <el-button type="primary" circle plain class="audio" :disabled="audioPlaying" @click="playAudio">
        <i class="el-icon-video-play" style="font-size: 50px;" ></i>
      </el-button>
      <audio ref="audioPlayer" ></audio>

      <div class="scores-display">
        <div> Your Scores </div>
        <div id = 'scores-you-get'> {{currentQuestion.score}} </div>
      </div>

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

      <el-dialog
          title="Congratulations!!"
          :visible.sync="dialogVisible"
          width="30%"
          center>
        <span style="font-size: 20px">You have already finished the County level game. Let's increase the difficulty a bit—can you distinguish accents at the borough level?</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">Go to the County Level!</el-button>
        </span>
      </el-dialog>

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
        element.style.color = "blue";
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
                  }, 2000);

                }else{

                  document.getElementById('wrong').style.display = 'block';
                  document.getElementById('wrong2').style.display = 'block';
                  setTimeout(() => {
                    document.getElementById('wrong').style.display = 'none';
                    document.getElementById('wrong2').style.display = 'none';
                  }, 2000);
                }

                setTimeout(()=>{
                  if(res.data.questionNum === 21){
                    this.dialogVisible = true;
                  }
                    this.handleResponse(res);
                },2000);

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
          const audioUrl = `http://localhost:8081${res.data}`;  //
          this.$refs.audioPlayer.src = audioUrl;
          this.$refs.audioPlayer.play();
        } else {
          alert(res.message);
          return false;
        }
        this.audioPlaying = true;

        setTimeout(() => {
          this.answerClickable = true;
        }, 4000);

      });
    },
    finishGame(){
      this.$router.push({ name: 'result', params: { result_id: Number(this.client_id)} });
    }
  }
}
</script>


<style scoped>

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
    color: #46ff40;
  }
  #wrong{
    position: absolute;
    right: 8%;
    top:30%;
    transform: translate(12%,0%);
    display: none;
    color: #ff4050;
  }

  #right2{

    position: absolute;
    right: 8%;
    top:30%;
    transform: translate(12%,0%);
    display: none;
    color: #46ff40;
  }
  #wrong2{
    position: absolute;
    right: 8%;
    top:30%;
    transform: translate(12%,0%);
    display: none;
    color: #ff4050;
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
    color: #46ff40;
  }
  #wrong{
    position: absolute;
    right: 25%;
    top:60%;
    transform: translate(25%,0%);
    display: none;
    color: #ff4050;
  }

  #right2{
    position: absolute;
    right: 25%;
    top:60%;
    transform: translate(25%,0%);
    display: none;
    color: #46ff40;
  }
  #wrong2{
    position: absolute;
    right: 25%;
    top:60%;
    transform: translate(25%,0%);
    display: none;
    color: #ff4050;
  }
}


</style>

