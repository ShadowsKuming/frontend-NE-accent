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

          <a href="#" class="rank-link">View Detailed Results <i class ="el-icon-arrow-right"></i></a>
        </div>
        <div class = "accuracy-symbol">
          <p>Accuracy</p>
          <div class= "data-frame">{{accuracy}}%</div>
        </div>
      </div>
      <button class="custom-button" @click="viewRanking">Play Again</button>

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
      questionDetails: []
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

  background-color: rgb(0, 168, 144);
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:active,
.custom-button:focus{
  background-color: #e8f4f3;
  color: #00a48d;
}

.custom-button:hover {
  background-color: #e8f4f3;
  color: #00a48d;
}

@media (max-width: 768px) {
  .result-frame {
    display: flex;
    justify-content: center;
    align-items: center;

    transform: scale(0.6);  /* Reset scaling for mobile */
    transform-origin: center;
  }
}

</style>
