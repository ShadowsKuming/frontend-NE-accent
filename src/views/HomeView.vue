<template>
  <div class="start-page">
    <!-- Main content section with images -->
    <div class="content">
      <!-- Title image -->
      <img id="start-page-title-font" src="../assets/start-page-title-font.gif" alt="">
      <!-- Button image which opens the dialog -->
      <img id="start-page-title-button" src="../assets/start-page-title-button.png" alt="" @click="dialogVisible = true">
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
        <ul class="consent-list">
          <li>I agree to participate in this study, the purpose of which is to investigate the perception of speech.</li>
          <li>I have understood the information provided for the research.</li>
          <li>I have been informed that I may decline to answer any questions or withdraw from the study without penalty of any kind.</li>
          <li>
            I have been informed that all of my responses will be kept confidential and secure, and that I will not be identified in any report or other publication resulting from this research.
          </li>
          <li>
            I have been informed that the investigator will answer any questions regarding the study and its procedures. I can contact the investigator via email
            <a class="contact-link" :href="emailLink">cong.zhang@newcastle.ac.uk</a> or by telephone on
            <a class="contact-link" :href="telLink">+44 (0) 191 208 5208</a>.
          </li>
        </ul>
      </span>

      <!-- Footer with buttons for user action -->
      <span slot="footer" class="dialog-footer">
        <el-button class="customize-button" type="info" @click="dialogVisible = false" round>NO</el-button>
        <el-button class="customize-button" type="primary" @click="handleAccept" round>OK!</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      emailLink: "mailto:cong.zhang@newcastle.ac.uk",
      telLink: "tel:+441912085208"
    };
  },
  methods: {
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
  background-image: url("@/assets/BackgroundImage 1.png");
  background-size: cover;
  height: 100vh;
}

/* Base styles for font */
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

/* Responsive font sizes */
.custom-title {
  font-size: 3vw; /* Responsive size for title */
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.consent-list {
  font-size: 1rem; /* Base font size */
  text-align: justify;
  margin: 0 20px;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  overflow-wrap: break-word;
  word-break: normal;
  white-space: normal;

}

.consent-list li {
  margin-bottom: 10px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

/* Button customization */
.customize-button {
  margin-left: 10vw;
  margin-right: 10vw;
  font-size: 2rem;
  padding: 20px 30px;
}

/* Responsive adjustments for portrait orientation */
@media (orientation: portrait) {
  #start-page-title-font {
    position: absolute;
    width: 130vw;
    top: 20%;
    left: -15%;
  }
  #start-page-title-button {
    position: absolute;
    width: 60vw;
    top: 80%;
    left: 20%;
  }

  .custom-title {
    padding-top: 5px;
    font-size: 25px; /* Adjusted for small screens */
  }

  /* New styles to align buttons in portrait mode */
  .dialog-footer {
    display: flex;
    justify-content: space-between; /* Distributes space between buttons */
    padding: 10px; /* Reduced padding */
    max-width: 100%; /* Prevent overflow */
  }

  .customize-button {
    width: 30%; /* Set button width */
    font-size: 1rem; /* Smaller font size for smaller screens */
    padding: 8px 0; /* Reduced padding */
  }

}

/* Responsive adjustments for landscape orientation */
@media (orientation: landscape) {
  #start-page-title-font {
    position: absolute;
    width: 65vw;
    top: 10%;
    left: 20%;
  }
  #start-page-title-button {
    position: absolute;
    width: 20vw;
    top: 70%;
    left: 40%;
  }

  .consent-list {
    font-size: 1.5rem; /* Slightly smaller for landscape */
    margin-left: 40px;
    margin-right: 40px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    overflow-wrap: break-word;
    word-break: normal;
    white-space: normal;
  }

  .custom-title {
    font-size: 50px;
    margin: 5px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
}

/* Styles for contact links */
.contact-link {
  color: #30A7A8;
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}
</style>
