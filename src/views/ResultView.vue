<template>
  <div class = "result-page">
    <div class = "result-frame">

      <div class = "congratulation-symbol">
        <img src="../assets/WiningCup.png" alt="">
        <p class = "congratulations">Congratulations</p>
        <p class = "congratulations-word">You’ve Completed the Challenge!</p>
        <p class = "performance-word">Let’s see how you performed in the game</p>
      </div>
      <div class = "result-symbol">
        <div class = "score-symbol">
          <p>Your Score</p>
          <div class= "data-frame">{{score}}</div>
        </div>
        <div class = "rank-symbol">
          <p>Your Rank</p>
          <div class= "data-frame">{{rank}}/{{total}}</div>

          <a href="#" class="rank-link" @click="viewRanking">View Detailed Results <i class ="el-icon-arrow-right"></i></a>
        </div>
        <div class = "accuracy-symbol">
          <p>Accuracy</p>
          <div class= "data-frame">{{accuracy}}%</div>
        </div>
      </div>
      <button class="custom-button" @click="dialogVisible=true">Finish Game</button>

    </div>

    <div v-if="dialogVisible" class="custom-dialog-overlay">
      <div class="custom-dialog">
        <img src="@/assets/voucher.svg" alt="">
        <div class="custom-dialog-content">
          <p class="voucher-title">Thank you for playing! The top 3 players will win vouchers!</p>
          <p class="voucher-content">To qualify for a prize, please take a moment to complete our short survey (just 1 min).
            Your feedback is essential for our event evaluation and will help us hold similar events in the future.</p>


        </div>


        <div class="custom-dialog-footer">
          <el-button type="primary" @click="goToQuestionnaire" class="custom-button">
            Start Survey and Win <i class="el-icon-arrow-right"></i>
          </el-button>

          <el-button type="primary" @click="goToThanksView" class="custom-button">
            Skip Survey and Prize
          </el-button>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
import request from "@/utils/request";

export default {
  props: {
    result_id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      score: this.result_id,
      accuracy: 90,
      rank:20,
      total:30,
      dialogVisible: false,
      questionDetails: [],

    };
  },
  created() {
    request.get("/result/end", { params: { id: this.result_id } }).then(res => {
      if (res.code === '0') {
        console.log(res);
        this.score = res.data.score;
        this.accuracy = res.data.accuracy;
        this.rank = res.data.rank;
        this.total = res.data.userCount;
      } else {
        alert(res.message);
        return false;
      }
    });
  },
  methods: {
    viewRanking(){
      this.$router.push({name: 'ranking'});
    },
    goToQuestionnaire(){
      this.$router.push({ name: 'questionnaire', params: { questionnaire_id: Number(this.result_id)} });
    },
    goToThanksView(){
      this.$router.push({name: 'thanks'})
    }
  }
};
</script>

<style>
.result-page{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/BackgroundImage 2.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.result-frame{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 50vh;
  background-color: rgba(255, 255, 255, 0);
  flex-direction: column;
}

.congratulation-symbol{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 54px;
}

.congratulations{
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #00A58E;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  margin: 0;
}

.congratulations-word{

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #161616;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 29px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px; /* 131.034% */
  margin: 0;
  text-align: center;
}

.performance-word{
  color: #6F6F6F;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 129.412% */
  margin: 0;
}

.result-symbol{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 54px;
}


.score-symbol{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin-right: 93px;
}

.rank-symbol{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin-right: 93px;
}

.accuracy-symbol{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin-right: 0;
}

.result-symbol p{
  color: #525252;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */
  margin: 0 0 8px;
}

.result-symbol .data-frame{

  display: flex;
  width: 191px;
  height: 62px;
  padding: 8px 28px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 60px;
  background:  #4589FF;


  color: #FFF;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 38px;
  font-style: normal;
  font-weight: 700;
  line-height: 46px; /* 121.053% */
}

.rank-link{
  margin-top: 18px;

  text-decoration: none;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #00A58E;
  font-size: 14px;
  font-style: normal;
  font-weight: 510;
  line-height: 20px;
}

.rank-link:active,
.rank-link:focus{
  color: #2b2d30;
}

.rank-link:hover {
  color: #2b2d30;
}



.custom-button{

  background-color: #e8f4f3;
  color: #00a48d;
  padding: 14px 24px;
  border: none;
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}



.custom-button:active,
.custom-button:focus{
  background-color: rgb(0, 168, 144);
  color: white;
}

.custom-button:hover {
  background-color: rgb(0, 168, 144);
  color: white;
}


/* Fullscreen overlay to make the background darker */
.custom-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
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
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  width: 540px;
  height: 474px;
  flex-shrink: 0;
  text-align: center;
}




.voucher-content{
  margin-bottom: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color:  #4F5E71;
  align-self: stretch;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

}
.voucher-title{
  margin-top: 16px;
  margin-bottom: 8px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  align-self: stretch;
  color: #FF832B;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
}

/* Footer with button */
.custom-dialog-footer {
  display: flex;
  justify-content: space-between;
}


@media (max-width: 768px) {

  .custom-dialog{
    width: 90vw;
  }
  .result-frame {
    display: flex;
    justify-content: center;
    align-items: center;

    transform: scale(0.48);  /* Reset scaling for mobile */
    transform-origin: center;
  }
}

</style>
