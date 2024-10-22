<template>
  <div class="questionnaire-view">
    <div class="feedback-form">
      <h2>Complete the feedback form to qualify for a chance to win a voucher!</h2>

      <el-form :model="form" ref="form" label-width="0" class="custom-form">
        <!-- Question 1 -->
        <el-form-item>
          <p>1. I’m glad I attended this event</p>
          <el-radio-group v-model="form.attended_event" class="group-vertical">
            <el-radio label="Agree">Agree</el-radio>
            <el-radio label="Disagree">Disagree</el-radio>
            <el-radio label="Neither">Neither</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- Question 2 -->
        <el-form-item>
          <p>2. I’ve learned something new</p>
          <el-radio-group v-model="form.learned_something">
            <el-radio label="Agree">Agree</el-radio>
            <el-radio label="Disagree">Disagree</el-radio>
            <el-radio label="Neither">Neither</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- Question 3 -->
        <el-form-item>
          <p>3. How often do you use this venue?</p>
          <el-radio-group v-model="form.venue_use">
            <el-radio label="Frequently">Frequently</el-radio>
            <el-radio label="Not often">Not often</el-radio>
            <el-radio label="First time visitor">First time visitor</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- Question 4 -->
        <el-form-item>
          <p>4. Have you learned something new today?</p>
          <el-input type="textarea" v-model="form.learned_new"></el-input>
        </el-form-item>

        <!-- Question 5 -->
        <el-form-item>
          <p>5. What did you enjoy most or least about this exhibition?</p>
          <el-input type="textarea" v-model="form.enjoyed_most_least"></el-input>
        </el-form-item>

        <!-- Question 6 -->
        <el-form-item>
          <p>6. Has this exhibition changed your views in any way? Please explain how.</p>
          <el-input type="textarea" v-model="form.changed_views"></el-input>
        </el-form-item>

        <!-- Question 7 -->
        <el-form-item>
          <p>7. Any comments, feedback, suggestions, or reflections you’d like to share?</p>
          <el-input type="textarea" v-model="form.comments_feedback"></el-input>
        </el-form-item>

        <!-- Submit Button -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
import request from "@/utils/request";

export default {
  props: {
    questionnaire_id: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      form: {
        id: this.questionnaire_id, // Assign the prop value to the form id
        attended_event: '',
        learned_something: '',
        venue_use: '',
        learned_new: '',
        enjoyed_most_least: '',
        changed_views: '',
        comments_feedback: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.form.id = this.questionnaire_id;  // Make sure id is properly set
      this.$refs.form.validate((valid) => {
        if (valid) {
          request.post("/questionnaire/submit", this.form)
              .then(res=>{
                this.$router.push({name: 'thanks'});
              });
        } else {
          console.log('Validation failed');
        }
      });
    }
  }
};
</script>

<style>

.questionnaire-view{
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

.feedback-form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 50vh;
  flex-direction: column;
}

.group-vertical{
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 20px;
}

.custom-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}

p {

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  margin-bottom: 10px;
}

</style>
