<template>
  <div id="" class="">
    <Bio />
    <Experience />
    <CertificationsAndAchievements />
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      // name: "Hamza",
      // date: new Date().getDate(),
      // month: new Date().getMonth(),
      // time: new Date().toTimeString(),
      // day: new Date().getDay(),
      // year: new Date().getFullYear(),
      // bold: "<b> Bold Text </b>",
      // blueText: "blueText",
      // pinkText: "pinkText",
      // highlightColor: "orange",
    };
  },
};
</script>

<style scoped>
#blueText {
  color: blue;
}
.pinkText {
  color: pink;
}
pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto; /* Allows horizontal scrolling for long lines */
}
code {
  font-family: "Courier New", Courier, monospace;
  color: #d63384;
}
</style>
