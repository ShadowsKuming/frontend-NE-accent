<template>
  <div>
    <div class="image-container">
      <img src="@/assets/thank2.png" alt="Long Image">
      <a href="https://research.ncl.ac.uk/ne-accent-games/">https://research.ncl.ac.uk/ne-accent-games/<i class ="el-icon-arrow-right"></i></a>
    </div>

    <div class="thanks-view">
      <a href="https://research.ncl.ac.uk/ne-accent-games/" >https://research.ncl.ac.uk/ne-accent-games/<i class ="el-icon-arrow-right"></i></a>
    </div>
  </div>







</template>

<script>


</script>


<style>

@media (orientation: portrait) {
  .image-container{
    display: block;
    height: 100vh;
    overflow-y: auto;
    flex-direction: column;

  }

  .image-container img {
    width: 100vw;
    height: 366.1577vw;
  }
  .thanks-view{
    display:none;
  }

  a{
    position: relative;
    bottom: 20px;
    left:80px;
  }
}



@media (orientation: landscape) {


  .image-container{
    display: none;
  }
  .thanks-view{
    display: flex;
    justify-content: center;
    align-items: end;
    position: relative;
    height: 100vh;
    width: 100vw;
    background-image: url("@/assets/thank1.png");
    background-size: contain;
    background-repeat: no-repeat;

    background-position: center;

  }

  a{
    margin-left: 30vw;
    margin-bottom:5vh ;
  }
}


</style>
