<template>
  <v-app>
    <app-bar></app-bar>
    <router-view />
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";

export default {
  name: "App",
  data: () => ({}),
  components: { AppBar },
};
</script>

<style>
.input {
  padding: 10px 15px;
  height: 44px;
  max-width: 300px;
  width: 100%;
  outline: 1px solid #e3e3e3;
  letter-spacing: 1.5px;
  transition: 0, 3s;
}
.input:focus {
  transition: 0, 3s;

  outline: 1px solid lightblue;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  width: 100%;
  padding: 10px;
  height: 44px;
  letter-spacing: 1.5px;
  background: lightblue;
  outline: 1px solid transparent;
  transition: 0, 3s;
}
.btn:hover {
  background: rgb(177, 213, 224);
  transition: 0, 3s;
}
.btn:active {
  background: lightblue;
  transition: 0, 3s;
}
.btn:focus {
  outline: 1px solid rgb(138, 185, 199);
  transition: 0, 3s;
}
</style>
