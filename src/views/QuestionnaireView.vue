<template>
  <div class="questionnaire-view">
    <div class="feedback-form">
      <h2>Complete the feedback form to qualify for a chance to win a voucher!</h2>

      <el-form :model="form" :rules="rules" ref="form" label-width="0" class="custom-form">
        <!-- First Page Questions -->
        <div v-if="currentPage === 1">
          <el-form-item class="custom-form-item custom-error-position" :prop="'attended_event'" >
            <p>1. I’m glad I attended this event</p>
            <el-radio-group v-model="form.attended_event" class="group-vertical">
              <el-radio label="Agree">Agree</el-radio>
              <el-radio label="Disagree">Disagree</el-radio>
              <el-radio label="Neither">Neither</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="custom-form-item custom-error-position" :prop="'learned_something'">
            <p>2. I’ve learned something new</p>
            <el-radio-group v-model="form.learned_something" class="group-vertical">
              <el-radio label="Agree">Agree</el-radio>
              <el-radio label="Disagree">Disagree</el-radio>
              <el-radio label="Neither">Neither</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="custom-form-item custom-error-position" :prop="'venue_use'">
            <p>3. How often do you use this venue?</p>
            <el-radio-group v-model="form.venue_use" class="group-vertical">
              <el-radio label="Frequently">Frequently</el-radio>
              <el-radio label="Not often">Not often</el-radio>
              <el-radio label="First time visitor">First time visitor</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="custom-form-button">
            <el-button type="primary" @click="nextPage">Next <i class="el-icon-arrow-right"></i></el-button>
          </el-form-item>
        </div>

        <!-- Second Page Questions -->
        <div v-if="currentPage === 2">
          <el-form-item :prop="'learned_new'">
            <p>4. Have you learned something new today?</p>
            <el-input type="textarea" v-model="form.learned_new"></el-input>
          </el-form-item>

          <el-form-item :prop="'enjoyed_most_least'">
            <p>5. What did you enjoy most or least about this exhibition?</p>
            <el-input type="textarea" v-model="form.enjoyed_most_least"></el-input>
          </el-form-item>

          <el-form-item :prop="'changed_views'">
            <p>6. Has this exhibition changed your views in any way? Please explain how.</p>
            <el-input type="textarea" v-model="form.changed_views"></el-input>
          </el-form-item>

          <el-form-item :prop="'comments_feedback'">
            <p>7. Any comments, feedback, suggestions, or reflections you’d like to share?</p>
            <el-input type="textarea" v-model="form.comments_feedback"></el-input>
          </el-form-item>

          <el-form-item class="progress-button">
            <el-button @click="prevPage" id="pre-page">
              <i class="el-icon-arrow-left"></i> Back
            </el-button>
            <el-button type="primary" @click="submitForm" id="submit-button">Submit <i class="el-icon-arrow-right"></i></el-button>
          </el-form-item>
        </div>
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
      currentPage: 1,
      form: {
        id: this.questionnaire_id,
        attended_event: '',
        learned_something: '',
        venue_use: '',
        learned_new: '',
        enjoyed_most_least: '',
        changed_views: '',
        comments_feedback: ''
      },
      rules: {
        attended_event: [{ required: true, message: 'Please select an option', trigger: 'change' }],
        learned_something: [{ required: true, message: 'Please select an option', trigger: 'change' }],
        venue_use: [{ required: true, message: 'Please select an option', trigger: 'change' }],
        learned_new: [{ required: true, message: 'This field is required', trigger: 'blur' }],
        enjoyed_most_least: [{ required: true, message: 'This field is required', trigger: 'blur' }],
        changed_views: [{ required: true, message: 'This field is required', trigger: 'blur' }],
        comments_feedback: [{ required: true, message: 'This field is required', trigger: 'blur' }]
      }
    };
  },
  methods: {
    nextPage() {
      this.$refs.form.validateField('attended_event');
      this.$refs.form.validateField('learned_something');
      this.$refs.form.validateField('venue_use');

      // Only proceed if the first page's required fields are valid
      if (this.form.attended_event && this.form.learned_something && this.form.venue_use) {
        this.currentPage += 1;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          request.post("/questionnaire/submit", this.form)
              .then(res => {
                this.$router.push({ name: 'thanks' });
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

.questionnaire-view {
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
  border-radius: 20px;
  background: #FFF;
  width: 1273px;
  padding: 40px;
  align-items: start;
  gap: 28px;
  transform: scale(1.1);
}

.group-vertical {
  display: flex;
  flex-direction: column;
}

h2 {
  text-align: center;
  align-self: stretch;
  color: #00A58E;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin: 0 0 28px;
  line-height: 32px; /* 133.333% */
}

.custom-form {
  padding: 0px;
  width: 100%;
  margin: 0;
}

.custom-form p {
  color: #161616;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  text-align: left;
}

.custom-form-item {
  margin: 0 0 8px;
}

.el-radio {
  margin-bottom: 12px;
  color: #252A31;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 510;
  line-height: 20px; /* 142.857% */
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

.el-button {
  width: auto;
  background-color: #00A58E;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-flex; /* Ensure buttons are inline */
  height: 52px;
  padding: 10px 16px 10px 24px;
  align-items: center;
  gap: 12px;
}

.el-button:active,
.el-button:focus,
.el-button:hover {
  background-color: #e8f4f3;
  color: #00a48d;
}

.progress-button {
  height: 52px;
}

#pre-page {
  position: absolute;
}

#submit-button {
  position: absolute;
  right: 0;
}

.custom-error-position .el-form-item__error {
  position: absolute;
  top: 20px;
  left: 400px;
  color: red;
  font-size: 12px;
}


/* Media queries for mobile responsiveness */
@media (max-width: 768px) {
  .feedback-form {
    width: 100%;
    transform: none;
    padding: 20px;
  }

  h2 {
    font-size: 18px;
    line-height: 24px;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }

  .el-radio {
    font-size: 12px;
  }

  .el-button {
    height: 40px;
    padding: 8px 16px;
    font-size: 14px;
  }

  .progress-button {
    height: 40px;
  }
}

/* Additional tweaks for very small screens */
@media (max-width: 480px) {
  .feedback-form {
    width: 100%;
    transform: none;
    padding: 15px;
  }

  h2 {
    font-size: 16px;
    line-height: 22px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
  }

  .el-radio {
    font-size: 12px;
  }

  .el-button {
    height: 36px;
    font-size: 12px;
  }

  .progress-button {
    height: 36px;
  }
}

</style>
