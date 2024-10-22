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
        <p class="information-explanation">Your username will show on the leaderboard!</p>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="custom-form">
          <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" placeholder="Username"></el-input>
          </el-form-item>
          <p class="information-explanation">Email is only needed for winning a voucher</p>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Email" type="email"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- Page 2: Education Level -->
      <div v-else-if="page === 2" class="education-level">
        <div class="information-title">
          <p class="title-1">What’s Your</p>
          <p class="title-2">Highest Education Level?</p>
          <p class="info-progress">(2/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="custom-form" >
          <el-form-item prop="education">
            <el-radio-group class="radio-group-vertical" v-model="form.education">
              <el-radio class="el-radio" label="Primary School and Below">Primary School or Below</el-radio>
              <el-radio class="el-radio" label="Secondary School">Secondary School</el-radio>
              <el-radio class="el-radio" label="Bachelor’s Degree">Bachelor’s Degree</el-radio>
              <el-radio class="el-radio" label="Master’s Degree">Master’s Degree</el-radio>
              <el-radio class="el-radio" label="PhD">PhD</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <!-- Page 3: Postcode and Address -->
      <div v-else-if="page === 3" class="postcode-address">
        <div class="information-title">
          <p class="title-1">Where Do You </p>
          <p class="title-2">Currently Live?</p>
          <p class="info-progress">(3/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="custom-form">
          <el-form-item label="Postcode" prop="postcode">
            <el-input v-model="form.postcode" placeholder="Postcode"></el-input>
          </el-form-item>

          <el-form-item label="Current Address" prop="current_address">
            <el-cascader
                :options="addressOptions"
                placeholder="Select your current address"
                @change="handleAddressChange('current_address', $event)"
                clearable>
            </el-cascader>
          </el-form-item>

        </el-form>
      </div>

      <!-- Page 4: Child & Long-term Address -->
      <div v-else-if="page === 4" class="address-page">
        <div class="information-title">
          <p class="title-1">Tell us about</p>
          <p class="title-2">Your Residence</p>
          <p class="info-progress">(4/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" class="custom-form">
          <!-- Child Address -->
          <el-form-item label="Where did you live the longest between ages 6 and 18?" prop="child_address">
            <el-cascader
                :options="addressOptions"
                placeholder="Select your childhood address"
                @change="handleAddressChange('child_address', $event)"
                clearable>
            </el-cascader>
          </el-form-item>

          <!-- Long Address -->
          <el-form-item label="Where have you lived the longest up until now?" prop="long_address">
            <el-cascader
                :options="addressOptions"
                placeholder="Select your long-term address"
                @change="handleAddressChange('long_address', $event)"
                clearable>
            </el-cascader>
          </el-form-item>


        </el-form>
      </div>


      <!-- Page 5: Age (Date Picker) -->
      <div v-else-if="page === 5" class="age-selection">
        <div class="information-title" style="font-size: 2em;"> <!-- Double size for the title -->
          <p class="title-1">Select Your</p>
          <p class="title-2">Year of Birth</p>
          <p class="info-progress">(5/7)</p>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="custom-form">
          <el-form-item prop="age">
            <el-date-picker
                v-model="form.age"
                type="year"
                placeholder="Select Birth Year"
                size="large"
                format="yyyy"
                value-format="yyyy">
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
          <!-- Input for first language if not English -->
          <el-input v-if="form.is_English_First_Language === 'No'"
                    v-model="form.first_language"
                    placeholder="Please specify your first language">
          </el-input>
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
      addressOptions: [
        {
          value: 'England',
          label: 'England',
          children: [
            { value: 'Bedfordshire', label: 'Bedfordshire' },
            { value: 'Berkshire', label: 'Berkshire' },
            { value: 'Bristol', label: 'Bristol' },
            { value: 'Buckinghamshire', label: 'Buckinghamshire' },
            { value: 'Cambridgeshire', label: 'Cambridgeshire' },
            { value: 'Cheshire', label: 'Cheshire' },
            { value: 'City of London', label: 'City of London' },
            { value: 'Cornwall', label: 'Cornwall' },
            { value: 'Cumbria', label: 'Cumbria' },
            { value: 'Derbyshire', label: 'Derbyshire' },
            { value: 'Devon', label: 'Devon' },
            { value: 'Dorset', label: 'Dorset' },
            { value: 'Durham', label: 'Durham' },
            { value: 'East Riding of Yorkshire', label: 'East Riding of Yorkshire' },
            { value: 'East Sussex', label: 'East Sussex' },
            { value: 'Essex', label: 'Essex' },
            { value: 'Gloucestershire', label: 'Gloucestershire' },
            {
              value: 'Greater London',
              label: 'Greater London',
              children: [
                { value: 'City of London', label: 'City of London' }
              ]
            },
            { value: 'Greater Manchester', label: 'Greater Manchester' },
            { value: 'Hampshire', label: 'Hampshire' },
            { value: 'Herefordshire', label: 'Herefordshire' },
            { value: 'Hertfordshire', label: 'Hertfordshire' },
            { value: 'Isle of Wight', label: 'Isle of Wight' },
            { value: 'Kent', label: 'Kent' },
            { value: 'Lancashire', label: 'Lancashire' },
            { value: 'Leicestershire', label: 'Leicestershire' },
            { value: 'Lincolnshire', label: 'Lincolnshire' },
            { value: 'Merseyside', label: 'Merseyside' },
            { value: 'Norfolk', label: 'Norfolk' },
            { value: 'North Yorkshire', label: 'North Yorkshire' },
            { value: 'Northamptonshire', label: 'Northamptonshire' },
            {
              value: 'Northumberland',
              label: 'Northumberland',
              children: [
                { value: 'Blyth Valley', label: 'Blyth Valley' },
                { value: 'Wansbeck', label: 'Wansbeck' },
                { value: 'Castle Morpeth', label: 'Castle Morpeth' },
                { value: 'Alnwick', label: 'Alnwick' },
                { value: 'Berwick-upon-Tweed', label: 'Berwick-upon-Tweed' },
                { value: 'Hexham', label: 'Hexham' },
                { value: 'Tynedale', label: 'Tynedale' }
              ]
            },
            { value: 'Nottinghamshire', label: 'Nottinghamshire' },
            { value: 'Oxfordshire', label: 'Oxfordshire' },
            { value: 'Rutland', label: 'Rutland' },
            { value: 'Shropshire', label: 'Shropshire' },
            { value: 'Somerset', label: 'Somerset' },
            { value: 'South Yorkshire', label: 'South Yorkshire' },
            { value: 'Staffordshire', label: 'Staffordshire' },
            { value: 'Suffolk', label: 'Suffolk' },
            { value: 'Surrey', label: 'Surrey' },
            {
              value: 'Tyne and Wear',
              label: 'Tyne and Wear',
              children: [
                { value: 'Newcastle upon Tyne', label: 'Newcastle upon Tyne' },
                { value: 'Gateshead', label: 'Gateshead' },
                { value: 'Sunderland', label: 'Sunderland' },
                { value: 'North Tyneside', label: 'North Tyneside' },
                { value: 'South Tyneside', label: 'South Tyneside' }
              ]
            },
            { value: 'Warwickshire', label: 'Warwickshire' },
            { value: 'West Midlands', label: 'West Midlands' },
            { value: 'West Sussex', label: 'West Sussex' },
            { value: 'West Yorkshire', label: 'West Yorkshire' },
            { value: 'Wiltshire', label: 'Wiltshire' },
            { value: 'Worcestershire', label: 'Worcestershire' }
          ]
        },
        {
          value: 'Scotland',
          label: 'Scotland',
          children: [
            { value: 'Aberdeen City', label: 'Aberdeen City' },
            { value: 'Aberdeenshire', label: 'Aberdeenshire' },
            { value: 'Angus', label: 'Angus' },
            { value: 'Argyll and Bute', label: 'Argyll and Bute' },
            { value: 'Clackmannanshire', label: 'Clackmannanshire' },
            { value: 'Dumfries and Galloway', label: 'Dumfries and Galloway' },
            { value: 'Dundee City', label: 'Dundee City' },
            { value: 'East Ayrshire', label: 'East Ayrshire' },
            { value: 'East Dunbartonshire', label: 'East Dunbartonshire' },
            { value: 'East Lothian', label: 'East Lothian' },
            { value: 'East Renfrewshire', label: 'East Renfrewshire' },
            { value: 'Edinburgh (City of Edinburgh)', label: 'Edinburgh (City of Edinburgh)' },
            { value: 'Falkirk', label: 'Falkirk' },
            { value: 'Fife', label: 'Fife' },
            { value: 'Glasgow City', label: 'Glasgow City' },
            { value: 'Highland', label: 'Highland' },
            { value: 'Inverclyde', label: 'Inverclyde' },
            { value: 'Midlothian', label: 'Midlothian' },
            { value: 'Moray', label: 'Moray' },
            { value: 'Na h-Eileanan Siar (Western Isles)', label: 'Na h-Eileanan Siar (Western Isles)' },
            { value: 'North Ayrshire', label: 'North Ayrshire' },
            { value: 'North Lanarkshire', label: 'North Lanarkshire' },
            { value: 'Orkney Islands', label: 'Orkney Islands' },
            { value: 'Perth and Kinross', label: 'Perth and Kinross' },
            { value: 'Renfrewshire', label: 'Renfrewshire' },
            { value: 'Scottish Borders', label: 'Scottish Borders' },
            { value: 'Shetland Islands', label: 'Shetland Islands' },
            { value: 'South Ayrshire', label: 'South Ayrshire' },
            { value: 'South Lanarkshire', label: 'South Lanarkshire' },
            { value: 'Stirling', label: 'Stirling' },
            { value: 'West Dunbartonshire', label: 'West Dunbartonshire' },
            { value: 'West Lothian', label: 'West Lothian' }
          ]
        },
        {
          value: 'Wales',
          label: 'Wales',
          children: [
            { value: 'Anglesey (Isle of Anglesey)', label: 'Anglesey (Isle of Anglesey)' },
            { value: 'Blaenau Gwent', label: 'Blaenau Gwent' },
            { value: 'Bridgend', label: 'Bridgend' },
            { value: 'Caerphilly', label: 'Caerphilly' },
            { value: 'Cardiff', label: 'Cardiff' },
            { value: 'Carmarthenshire', label: 'Carmarthenshire' },
            { value: 'Ceredigion', label: 'Ceredigion' },
            { value: 'Conwy', label: 'Conwy' },
            { value: 'Denbighshire', label: 'Denbighshire' },
            { value: 'Flintshire', label: 'Flintshire' },
            { value: 'Gwynedd', label: 'Gwynedd' },
            { value: 'Merthyr Tydfil', label: 'Merthyr Tydfil' },
            { value: 'Monmouthshire', label: 'Monmouthshire' },
            { value: 'Neath Port Talbot', label: 'Neath Port Talbot' },
            { value: 'Newport', label: 'Newport' },
            { value: 'Pembrokeshire', label: 'Pembrokeshire' },
            { value: 'Powys', label: 'Powys' },
            { value: 'Rhondda Cynon Taf', label: 'Rhondda Cynon Taf' },
            { value: 'Swansea', label: 'Swansea' },
            { value: 'Torfaen', label: 'Torfaen' },
            { value: 'Vale of Glamorgan', label: 'Vale of Glamorgan' },
            { value: 'Wrexham', label: 'Wrexham' }
          ]
        },
        {
          value: 'Northern Ireland',
          label: 'Northern Ireland',
          children: [
            { value: 'Antrim', label: 'Antrim' },
            { value: 'Armagh', label: 'Armagh' },
            { value: 'Down', label: 'Down' },
            { value: 'Fermanagh', label: 'Fermanagh' },
            { value: 'Londonderry (Derry)', label: 'Londonderry (Derry)' },
            { value: 'Tyrone', label: 'Tyrone' }
          ]
        },
        {
          value: 'Overseas',
          label: 'Overseas',

        }
      ],


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
          { required: false, message: 'Email is required', trigger: 'blur' },
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
          { required: true, message: 'Current Address is required', trigger: 'change' },
        ],
        long_address: [
          { required: true, message: 'Long-term address is required', trigger: 'change' },
        ],
        child_address: [
          { required: true, message: 'Childhood address is required', trigger: 'change' },
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
    handleAddressChange(fieldName, selectedValues) {
      console.log(`Selected values for ${fieldName}:`, selectedValues); // Debugging: Log selected values
      if (selectedValues && selectedValues.length > 0) {
        // Join the selected values using a hyphen and update the form field
        this.form[fieldName] = selectedValues.join('-');
        console.log(`Updated ${fieldName}:`, this.form[fieldName]); // Debugging: Log updated field value
      } else {
        this.form[fieldName] = ''; // Reset the field if no values are selected
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
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

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

.information-explanation {
  font-feature-settings: 'liga' off, 'clig' off;
  align-self: stretch;
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #00A58E;
  text-align: right;
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
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.custom-select-dropdown .el-select-dropdown__item {
  font-size: 20px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.el-picker-panel .el-month-table {
  font-size: 1.35em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.el-picker-panel .el-year-table {
  font-size: 1.35em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  width: 100%; /* Full width for better mobile display */
  max-width: 300px; /* Set a max width */

}


@media (max-width: 600px) {
  .information-form {
    position: relative;
    margin: 0 auto;
    top: 40%;
    right: 0;
    width: 90%;
    padding: 20px;

    transform: scale(1);  /* Reset scaling for mobile */
    transform-origin: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
}
</style>
