<template>
  <div class="page-container">
    <!-- Logo and Header Section -->
    <div class="header">
      <div class="logo-section">
        <img src="path-to-newcastle-logo" alt="Newcastle University" class="logo"/>
        <img src="path-to-ukri-logo" alt="UKRI" class="logo"/>
        <img src="path-to-festival-logo" alt="Festival of Social Science" class="logo"/>
      </div>
    </div>

    <!-- Audio Sources -->
    <div class="content-section">
      <h3>Audio sources:</h3>
      <ul>
        <li>
          Corrigan, Karen P., Isabelle Buchstaller, Adam Mearns, and Hermann Moisl. 2012. <em>The Diachronic Electronic Corpus of Tyneside English</em>. Newcastle University. Funded by AHRC (AH/H037691/1).
          <a href="https://research.ncl.ac.uk/decte" target="_blank">https://research.ncl.ac.uk/decte</a>
        </li>
        <li>
          Cole, Beth, Karen P. Corrigan, and Daniel Duncan. 2023. SEL2091 Sociolinguistic Interview Project.
        </li>
      </ul>
    </div>

    <!-- Maps Source Section -->
    <div class="content-section">
      <h3>Maps source:</h3>
      <p>Office for National Statistics licensed under the Open Government Licence v3.0</p>
      <p>Contains OS data © Crown and database right 2023</p>
    </div>

    <!-- Funding Section -->
    <div class="content-section">
      <h3>Funding:</h3>
      <p>This project is partially funded by the Institute for Social Science, Newcastle University through a Pioneer Award to Dr. Cong Zhang.</p>
      <p>The Festival of Social Science event – <em>Wey aye, man: Think you know a North-East accent when you hear one?</em> – is funded by ESRC Impact Acceleration Account.</p>
    </div>

    <!-- Team Section -->
    <div class="content-section">
      <h3>Event Leads:</h3>
      <ul>
        <li>Dr. Cong Zhang</li>
        <li>Prof. Karen Corrigan</li>
        <li>Dr. Daniel Duncan</li>
        <li>Dr. Mary Robinson</li>
        <li>Dr. Lei Shi</li>
      </ul>

      <h3>Game Developer:</h3>
      <p>Jiacheng Cheng</p>

      <h3>Graphic Design:</h3>
      <p>Yu Zhao</p>

      <h3>Researchers:</h3>
      <ul>
        <li>Yanyu Li</li>
        <li>Damar Hoogland</li>
      </ul>
    </div>

    <!-- QR Code Section -->
    <div class="qr-code-section">
      <p>Scan the QR code for more info on this project:</p>
      <img src="path-to-qr-code" alt="QR Code" class="qr-code"/>
      <a href="https://research.ncl.ac.uk/ne-accent-games" target="_blank">https://research.ncl.ac.uk/ne-accent-games</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPage",
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo-section {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
}

.logo {
  height: 80px;
  margin-right: 20px;
}

.content-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  text-align: left;
}

.content-section h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.content-section ul {
  list-style-type: none;
  padding-left: 0;
}

.content-section ul li {
  margin-bottom: 5px;
}

.qr-code-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 30px;
}

.qr-code {
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #0066cc;
}

p {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
}
</style>
