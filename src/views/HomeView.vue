<template>
  <div class="start-page">
    <!-- Main content section with images -->
    <div class="content">
      <!-- Title image -->
      <img id="start-page-title-font" src="../assets/HomeView/start-page-title-font.gif" alt="">
      <!-- Button image which opens the dialog -->
      <img id="start-page-title-button" src="../assets/HomeView/start-page-title-button.png" alt="" @click="dialogVisible = true">
    </div>

    <!-- Dialog content -->
    <el-dialog
        :visible.sync="dialogVisible"
        width="80%"
        center>

      <!-- Custom title for the dialog -->
      <template #title>
        <h1 class="custom-title">Declaration of Informed Consent</h1>
      </template>

      <!-- Dialog body with informed consent content -->
      <span>
        <ul>
          <li>I agree to participate in this study, the purpose of which is to investigate the perception of speech.</li>
          <li>I have understood the information provided for the research.</li>
          <li>I have been informed that I may decline to answer any questions or withdraw from the study without penalty of any kind.</li>
          <li>
            I have been informed that all of my responses will be kept confidential and secure, and that I will not be identified in any report or other publication resulting from this research.
          </li>
          <li>
            I have been informed that the investigator will answer any questions regarding the study and its procedures. I can contact the investigator via email
            <a :href="emailLink">cong.zhang@newcastle.ac.uk</a> or by telephone on
            <a :href="telLink">+44 (0) 191 208 5208</a>.
          </li>
        </ul>
      </span>

      <!-- Footer with buttons for user action -->
      <span slot="footer" class="dialog-footer">
        <!-- Disagree and exit button -->
        <el-button class="customize-button" type="info" @click="dialogVisible = false" round>Disagree & Exit</el-button>
        <!-- Agree and continue button -->
        <el-button class="customize-button" type="primary" @click="handleAccept" round>Agree & Continue</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, // Controls visibility of the dialog
      emailLink: "mailto:cong.zhang@newcastle.ac.uk", // Email link for contact
      telLink: "tel:+441912085208" // Telephone link for contact
    };
  },
  methods: {
    // Handles the acceptance of the consent and routes to the next page
    handleAccept() {
      this.$router.push({name: 'personal-information'});
    }
  }
};
</script>


<style scoped>
/* Main container for the start page */
.start-page {
  position: relative;
  background-image: url("@/assets/bg 1.png");
  background-size: cover;
  //background: linear-gradient(to bottom, #4cc1f1, #1b88e5);
  height: 100vh;
}

/* Adjust layout for portrait orientation */
@media (orientation: portrait) {
  #start-page-title-font{
    position: absolute;
    width: 130vw;
    top:20%;
    left:-15%;
  }
  #start-page-title-button{
    position: absolute;
    width: 60vw;
    top:80%;
    left:20%;
  }
  /* Title styling for dialog in portrait mode */
  .custom-title{
    padding-top: 5px;
    font-size: 25px;
  }
  /* Adjust ul styling for scrolling in portrait mode */
  ul{
    font-size: 20px;
    height: 50vh;
    overflow-y: auto;
    word-break: normal;
    white-space: normal;
    overflow-wrap: break-word;
  }
  ul li{
    margin-bottom: 10px;
  }
}

/* Adjust layout for landscape orientation */
@media (orientation: landscape) {
  #start-page-title-font{
    position: absolute;
    width: 65vw;
    top:10%;
    left:20%;
  }
  #start-page-title-button{
    position: absolute;
    width: 20vw;
    top:70%;
    left:40%;
    cursor: pointer;
  }
  /* Adjust ul styling for landscape mode */
  ul{
    font-size: 35px;
    margin-left: 20px;
    word-break: normal;
    white-space: normal;
    overflow-wrap: break-word;
  }
  /* Button customization for dialog in landscape mode */
  .customize-button{
    margin-left: 10vw;
    margin-right: 10vw;
    font-size: 25px;
    padding: 60px 48px;
    margin-bottom: 40px;
  }
  /* Title styling for dialog in landscape mode */
  .custom-title{
    font-size: 50px;
    margin: 5px;
  }
}
</style>
