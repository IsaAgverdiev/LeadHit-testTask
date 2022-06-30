<template>
  <header class="header">{{ heading }}</header>
</template>

<script>
export default {
  data: () => ({
    heading: "LeadHit",
  }),

  watch: {
    $route(to, from) {
      if (to.path === "/analytics") {
        this.heading = "Аналитика";
      } else if (to.path === "/") {
        this.heading = "LeadHit";
      }
    },
  },
};
</script>

<style scoped>
.header {
  max-width: 100%;
  width: 100%;
  background: lightblue;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1.5px;
}
</style>
