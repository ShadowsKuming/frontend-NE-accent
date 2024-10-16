<template>
  <div class="information-page">

    <!-- Bubble section -->
    <div class="bubble">
      <img src="@/assets/Union.svg" alt="">
      <div class="man-said">{{ currentText }}</div> <!-- Dynamic text rotation -->
    </div>

    <!-- Form section -->
    <div class="information-form">
      <p class="information-advocate">Let’s gather some quick info before you dive into the dialect adventure!</p>

      <!-- Page 1: Username and Email -->
      <div v-if="page === 1" class="username-email">
        <div class="information-title">
          <p class="title-1">Enter Your</p>
          <p class="title-2">Username & Email</p>
          <p class="info-progress">(1/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="custom-form">
          <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Email" type="email"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- Page 2: Education Level -->
      <div v-else-if="page === 2" class="education-level">
        <div class="information-title">
          <p class="title-1">What’s Your</p>
          <p class="title-2">Education Level?</p>
          <p class="info-progress">(2/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="custom-form" >
          <el-form-item prop="education">
            <el-radio-group class="radio-group-vertical" v-model="form.education">
              <el-radio class="el-radio" label="Preschool">Preschool</el-radio>
              <el-radio class="el-radio" label="Primary School">Primary School</el-radio>
              <el-radio class="el-radio" label="Middle School">Middle School</el-radio>
              <el-radio class="el-radio" label="High School">High School</el-radio>
              <el-radio class="el-radio" label="College/University">College/University</el-radio>
              <el-radio class="el-radio" label="Postgraduate">Postgraduate</el-radio>
              <el-radio class="el-radio" label="PhD">PhD</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <!-- Page 3: Postcode and Address -->
      <div v-else-if="page === 3" class="postcode-address">
        <div class="information-title">
          <p class="title-1">Enter Your</p>
          <p class="title-2">Postcode & Address</p>
          <p class="info-progress">(3/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="custom-form">
          <el-form-item label="Postcode" prop="postcode">
            <el-input v-model="form.postcode" placeholder="Postcode"></el-input>
          </el-form-item>
          <el-form-item label="Address" prop="current_address">
            <el-input v-model="form.current_address" placeholder="Current Address"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- Page 4: Childhood and Long-term Residence -->
      <div v-else-if="page === 4" class="long-child-address">
        <div class="information-title">
          <p class="title-1">Enter Your</p>
          <p class="title-2">Childhood & Long-term Residence</p>
          <p class="info-progress">(4/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="100px" class="custom-form">
          <el-form-item label="Childhood Address" prop="child_address">
            <el-input v-model="form.child_address" placeholder="Childhood Address"></el-input>
          </el-form-item>
          <el-form-item label="Long-term Address" prop="long_address">
            <el-input v-model="form.long_address" placeholder="Long-term Address"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- Page 5: Age (Date Picker) -->
      <div v-else-if="page === 5" class="age-selection">
        <div class="information-title" style="font-size: 2em;"> <!-- Double size for the title -->
          <p class="title-1">Select Your</p>
          <p class="title-2">Date of Birth</p>
          <p class="info-progress">(5/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="custom-form">
          <el-form-item prop="age">
            <el-date-picker
                v-model="form.age"
                type="date"
                placeholder="Select Birth Date"
                size="large"
                format="dd-MM-yyyy"
                value-format="dd-MM-yyyy">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <!-- Page 6: Gender -->
      <div v-else-if="page === 6" class="gender-selection">
        <div class="information-title">
          <p class="title-1">Select Your</p>
          <p class="title-2">Gender</p>
          <p class="info-progress">(6/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="custom-form">
          <el-form-item prop="gender">
            <el-radio-group class="radio-group-vertical" v-model="form.gender">
              <el-radio class="el-radio" label="Male">Male</el-radio>
              <el-radio class="el-radio" label="Female">Female</el-radio>
              <el-radio class="el-radio" label="Non-binary">Non-binary</el-radio>
              <el-radio class="el-radio" label="Prefer not to say">Prefer not to say</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <!-- Page 7: First Language -->
      <div v-else-if="page === 7" class="language-selection">
        <div class="information-title">
          <p class="title-1">Is English Your</p>
          <p class="title-2">First Language?</p>
          <p class="info-progress">(7/7)</p>
        </div>
        <div class="custom-form" style="display: flex; justify-content: center; align-items: center; flex-direction: column">
          <el-radio-group class="radio-group-horizontal" v-model="form.is_English_First_Language">
            <el-radio class="el-radio" label="Yes">Yes</el-radio>
            <el-radio class="el-radio" label="No">No</el-radio>
          </el-radio-group>

          <!-- Dropdown for first language selection -->
          <el-select v-if="form.is_English_First_Language === 'No'" v-model="form.first_language" placeholder="Select your first language" filterable
                     popper-class="custom-select-dropdown">
            <!-- Options for language selection -->
            <el-option label="Afrikaans" value="Afrikaans"></el-option>
            <el-option label="Albanian" value="Albanian"></el-option>
            <el-option label="Amharic" value="Amharic"></el-option>
            <el-option label="Arabic" value="Arabic"></el-option>
            <el-option label="Armenian" value="Armenian"></el-option>
            <el-option label="Azerbaijani" value="Azerbaijani"></el-option>
            <el-option label="Basque" value="Basque"></el-option>
            <el-option label="Belarusian" value="Belarusian"></el-option>
            <el-option label="Bengali" value="Bengali"></el-option>
            <el-option label="Bosnian" value="Bosnian"></el-option>
            <el-option label="Bulgarian" value="Bulgarian"></el-option>
            <el-option label="Catalan" value="Catalan"></el-option>
            <el-option label="Cebuano" value="Cebuano"></el-option>
            <el-option label="Chichewa" value="Chichewa"></el-option>
            <el-option label="Chinese" value="Chinese"></el-option>
            <el-option label="Corsican" value="Corsican"></el-option>
            <el-option label="Croatian" value="Croatian"></el-option>
            <el-option label="Czech" value="Czech"></el-option>
            <el-option label="Danish" value="Danish"></el-option>
            <el-option label="Dutch" value="Dutch"></el-option>
            <el-option label="Esperanto" value="Esperanto"></el-option>
            <el-option label="Estonian" value="Estonian"></el-option>
            <el-option label="Filipino" value="Filipino"></el-option>
            <el-option label="Finnish" value="Finnish"></el-option>
            <el-option label="French" value="French"></el-option>
            <el-option label="Galician" value="Galician"></el-option>
            <el-option label="Georgian" value="Georgian"></el-option>
            <el-option label="German" value="German"></el-option>
            <el-option label="Greek" value="Greek"></el-option>
            <el-option label="Gujarati" value="Gujarati"></el-option>
            <el-option label="Haitian Creole" value="Haitian Creole"></el-option>
            <el-option label="Hausa" value="Hausa"></el-option>
            <el-option label="Hawaiian" value="Hawaiian"></el-option>
            <el-option label="Hebrew" value="Hebrew"></el-option>
            <el-option label="Hindi" value="Hindi"></el-option>
            <el-option label="Hmong" value="Hmong"></el-option>
            <el-option label="Hungarian" value="Hungarian"></el-option>
            <el-option label="Icelandic" value="Icelandic"></el-option>
            <el-option label="Igbo" value="Igbo"></el-option>
            <el-option label="Indonesian" value="Indonesian"></el-option>
            <el-option label="Irish" value="Irish"></el-option>
            <el-option label="Italian" value="Italian"></el-option>
            <el-option label="Japanese" value="Japanese"></el-option>
            <el-option label="Javanese" value="Javanese"></el-option>
            <el-option label="Kannada" value="Kannada"></el-option>
            <el-option label="Kazakh" value="Kazakh"></el-option>
            <el-option label="Khmer" value="Khmer"></el-option>
            <el-option label="Korean" value="Korean"></el-option>
            <el-option label="Kurdish (Kurmanji)" value="Kurdish (Kurmanji)"></el-option>
            <el-option label="Kyrgyz" value="Kyrgyz"></el-option>
            <el-option label="Lao" value="Lao"></el-option>
            <el-option label="Latin" value="Latin"></el-option>
            <el-option label="Latvian" value="Latvian"></el-option>
            <el-option label="Lithuanian" value="Lithuanian"></el-option>
            <el-option label="Luxembourgish" value="Luxembourgish"></el-option>
            <el-option label="Macedonian" value="Macedonian"></el-option>
            <el-option label="Malagasy" value="Malagasy"></el-option>
            <el-option label="Malay" value="Malay"></el-option>
            <el-option label="Malayalam" value="Malayalam"></el-option>
            <el-option label="Maltese" value="Maltese"></el-option>
            <el-option label="Maori" value="Maori"></el-option>
            <el-option label="Marathi" value="Marathi"></el-option>
            <el-option label="Mongolian" value="Mongolian"></el-option>
            <el-option label="Myanmar (Burmese)" value="Myanmar (Burmese)"></el-option>
            <el-option label="Nepali" value="Nepali"></el-option>
            <el-option label="Norwegian" value="Norwegian"></el-option>
            <el-option label="Odia" value="Odia"></el-option>
            <el-option label="Pashto" value="Pashto"></el-option>
            <el-option label="Persian" value="Persian"></el-option>
            <el-option label="Polish" value="Polish"></el-option>
            <el-option label="Portuguese" value="Portuguese"></el-option>
            <el-option label="Punjabi" value="Punjabi"></el-option>
            <el-option label="Romanian" value="Romanian"></el-option>
            <el-option label="Russian" value="Russian"></el-option>
            <el-option label="Samoan" value="Samoan"></el-option>
            <el-option label="Scots Gaelic" value="Scots Gaelic"></el-option>
            <el-option label="Serbian" value="Serbian"></el-option>
            <el-option label="Sesotho" value="Sesotho"></el-option>
            <el-option label="Shona" value="Shona"></el-option>
            <el-option label="Sindhi" value="Sindhi"></el-option>
            <el-option label="Sinhala" value="Sinhala"></el-option>
            <el-option label="Slovak" value="Slovak"></el-option>
            <el-option label="Slovenian" value="Slovenian"></el-option>
            <el-option label="Somali" value="Somali"></el-option>
            <el-option label="Spanish" value="Spanish"></el-option>
            <el-option label="Sundanese" value="Sundanese"></el-option>
            <el-option label="Swahili" value="Swahili"></el-option>
            <el-option label="Swedish" value="Swedish"></el-option>
            <el-option label="Tajik" value="Tajik"></el-option>
            <el-option label="Tamil" value="Tamil"></el-option>
            <el-option label="Telugu" value="Telugu"></el-option>
            <el-option label="Thai" value="Thai"></el-option>
            <el-option label="Turkish" value="Turkish"></el-option>
            <el-option label="Ukrainian" value="Ukrainian"></el-option>
            <el-option label="Urdu" value="Urdu"></el-option>
            <el-option label="Uzbek" value="Uzbek"></el-option>
            <el-option label="Vietnamese" value="Vietnamese"></el-option>
            <el-option label="Welsh" value="Welsh"></el-option>
            <el-option label="Xhosa" value="Xhosa"></el-option>
            <el-option label="Yiddish" value="Yiddish"></el-option>
            <el-option label="Yoruba" value="Yoruba"></el-option>
            <el-option label="Zulu" value="Zulu"></el-option>
            <!-- Add other languages here -->
          </el-select>

        </div>

      </div>

      <!-- Button section -->
      <div class="progress-button-center">
        <el-button v-if="page === 1" @click="validatePage" type="primary" class="button-next">
          Next <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>

      <div class="progress-button">
        <el-button v-if="page > 1" @click="prevPage" type="primary" class="button-back">
          <i class="el-icon-arrow-left"></i> Back
        </el-button>
        <el-button v-if="page < 7& page>1" @click="validatePage" type="primary" class="button-next">
          Next <i class="el-icon-arrow-right"></i>
        </el-button>
        <el-button v-if="page === 7" @click="submitForm" type="primary" class="button-submit">
          Submit
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      page: 1, // Current page
      form: {
        username: '',
        email: '',
        education: '',
        postcode: '',
        current_address: '',
        long_address: '',
        child_address: '',
        age: '',
        gender: '',
        is_English_First_Language: '',
        first_language: '',
      },
      currentText: 'Hi', // Initial text
      textOptions: ['Hi', 'Alreet', 'Howay'], // List of rotating text options
      currentIndex: 0, // Index for current text
      // Validation rules
      rules: {
        username: [
          { required: true, message: 'Username is required', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{3,15}$/, message: 'Username must be 3-15 characters long and cannot contain special characters', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
        ],
        education: [
          { required: true, message: 'Education level is required', trigger: 'change' }
        ],
        postcode: [
          { required: true, message: 'Postcode is required', trigger: 'blur' },
          { min: 3, message: 'Postcode must be at least 3 characters long', trigger: 'blur' }
        ],
        current_address: [
          { required: true, message: 'Address is required', trigger: 'blur' },
          { min: 5, message: 'Address must be at least 5 characters long', trigger: 'blur' }
        ],
        long_address: [
          { required: true, message: 'Long-term address is required', trigger: 'blur' },
          { min: 5, message: 'Long-term address must be at least 5 characters long', trigger: 'blur' }
        ],
        child_address: [
          { required: true, message: 'Childhood address is required', trigger: 'blur' },
          { min: 5, message: 'Childhood address must be at least 5 characters long', trigger: 'blur' }
        ],
        age: [
          { required: true, message: 'Age is required', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              const birthYear = new Date(value).getFullYear();
              const currentYear = new Date().getFullYear();
              if (currentYear - birthYear < 1) {
                callback(new Error('Age must be at least 1 year old'));
              } else {
                callback();
              }
            }, trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Gender is required', trigger: 'change' }
        ]
      }
    };
  },
  mounted() {
    this.startTextRotation(); // Start text rotation
  },
  methods: {
    nextPage() {
      if (this.page < 7) {
        this.page++;
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    validatePage() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.nextPage();
        } else {
          console.log('Validation failed');
          return false;
        }
      });
    },
    submitForm() {
      request.post("/personal-information/add-user", this.form)
          .then(res => {
            if (res.code === '0') {
              // Redirect to the game page with client_id parameter from res
              this.$router.push({ name: 'game', params: { client_id: res.data} });
            } else {
              alert(res.message); // Show error message if submission fails
              return false;
            }
          })
          .catch(error => {
            console.error('Form submission error:', error); // Log any errors during submission
          });
    },
    // Start text rotation function
    startTextRotation() {
      setInterval(() => {
        // Switch to the next text
        this.currentIndex = (this.currentIndex + 1) % this.textOptions.length;
        this.currentText = this.textOptions[this.currentIndex];
      }, 2000); // Switch text every 2 seconds
    },
  },
};
</script>

<style>
.information-page {
  position: relative;
  background-image: url("@/assets/BackgroundImage 1.png");
  background-size: 100vw 100vh;
  height: 100vh;
  width: 100vw;
}

.bubble {
  top: 15%;
  left: 20%;
  position: absolute;
}

.man-said {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-100%);
  font-size: 38px; /* Adjust text size */
  font-style: normal;
  font-weight: 700;
  line-height: 46px;
  color: black;
  text-align: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.information-form {
  position: absolute;
  right: 15vw;
  top: 20vh;
  width: 550px;
  background: white;
  padding: 40px;
  border-radius: 10px;

  transform: scale(1.5);  /* 1.5x scaling */
  transform-origin: top center;
}

.information-advocate {
  font-feature-settings: 'liga' off, 'clig' off;
  align-self: stretch;
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 22px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.information-title {
  display: flex;
  margin-top: 33px;
  margin-bottom: 33px;
  font-size: 17px;
  font-weight: 700;
  line-height: 22px;
  white-space: normal;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.title-1 {
  color: black;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 29px;
  font-weight: 700;
  line-height: 38px;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.title-2 {
  color: #00A58E;
  font-feature-settings: 'liga' off, 'clig' off;
  margin: 0 8px;
  font-size: 29px;
  font-weight: 700;
  line-height: 38px;
  white-space: normal;
  word-wrap: break-word;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.info-progress {
  font-size: 12px;
  font-weight: 510;
  line-height: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.radio-group-vertical {
  display: flex;
  flex-direction: column;
}
.radio-group-horizontal {
  display: flex;
  flex-direction: row;
  margin-bottom: 33px;
}

.el-radio{
  margin-bottom: 8px;
  color: black;
  font-size: 20px;
  font-weight: 510;
  line-height: 20px;

}

.custom-form{
  margin-bottom: 33px;
  font-size: 1.5em;
}



.custom-select-dropdown .el-select-dropdown__item {
  font-size: 20px;
}

.progress-button-center {
  display: flex;
  justify-content: center; /* Center align the button */
  margin-top: 20px;
}

.progress-button {
  display: flex;
  justify-content: space-between;
}

.button-back, .button-next {
  background-color: #eaf6f5;
  color: #008080;
  border-radius: 4px;
  border: none;
  outline: none;
}

/* When button is clicked, change color to #00a48d */
.button-back:active, .button-next:active, .button-submit:active,
.button-back:focus, .button-next:focus, .button-submit:focus {
  background-color: #00a48d;
  color: white;
}

/* Hover effect on buttons */
.button-back:hover, .button-next:hover, .button-submit:hover {
  background-color: #00a48d;
  color: white;
}

.button-next i, .button-back i {
  margin-right: 4px;
}





.el-picker-panel .el-date-table {
  font-size: 1.35em;
}

.el-picker-panel .el-month-table {
  font-size: 1.35em;
}

.el-picker-panel .el-year-table {
  font-size: 1.35em;
}


@media (max-width: 768px) {
  .information-form {
    position: relative;
    margin: 0 auto;
    top: 40%;
    right: 0;
    width: 90%;
    padding: 20px;

    transform: scale(1);  /* Reset scaling for mobile */
    transform-origin: center;
  }
}
</style>
