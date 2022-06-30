<template>
  <v-container fluid>
    <h1 class="heading-analytics">Аналитика по визитам</h1>
    <Char />
  </v-container>
</template>

<script>
import Char from "@/components/Char.vue";

export default {
  name: "AnalyticsView",
  components: { Char },
};
</script>

<style>
.heading-analytics {
  /* text-align: center; */
  font-weight: 400;
  margin: 30px;
  font-size: 22px;
}
</style>
