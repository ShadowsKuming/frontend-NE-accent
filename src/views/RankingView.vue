<template>
  <div>
    <div id ="award_podium">
      <img src="@/assets/awardPodiumBackground.png" alt="">


    </div>
    <div>
      <el-table id = "rank_table" :data="leaderboard" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="ranking" label="Rank" width="180"></el-table-column>
        <el-table-column prop="userName" label="Name" width="180"></el-table-column>
        <el-table-column prop="scores" label="Scores"></el-table-column>
        <el-table-column prop="boroughCorrect" label="boroughCorrect"></el-table-column>
        <el-table-column prop="countyCorrect" label="countyCorrect"></el-table-column>
      </el-table>
    </div>
  </div>


</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      leaderboard: [


      ]
    };
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  },
  created() {
    request.get("/ranking/getRanking").then(res=>{
      console.log(res.data);
      this.leaderboard = res.data;
    })
  }
};
</script>


<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

#award_podium{

  height: 40vh;

}

#rank_table{

  width: 80%;
}
</style>


