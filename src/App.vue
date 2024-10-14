<template>
  <div id="app">
    <TermsOfUse/>
    <router-view/>

  </div>
</template>


<style>
</style>

<script>
import TermsOfUse from './components/TermsOfUse.vue';

export default {
  components: {
    TermsOfUse,
  },
};
</script>
