<template>
  <v-container fluid class="form-container">
    <form action="" class="form-id" @submit.prevent="submit">
      <label hidden>id</label>
      <input
        type="text"
        class="form-id__input input"
        v-model="value"
        @input="setShowAlert(false)"
        placeholder="id сайт..."
      />
      <button class="form-id__btn btn">Войти</button>
    </form>
    <v-alert
      v-if="getShowAlert"
      transition="scale-transition"
      type="error"
      max-width="300"
      elevation="8"
      >id сайта должен содержать 24 символа</v-alert
    >
  </v-container>
</template>

<script>
import router from "@/router";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    value: "",
  }),

  computed: mapGetters(["getSiteID", "getShowAlert", "getResponse"]),

  methods: {
    ...mapMutations(["setSiteID", "setShowAlert"]),
    ...mapActions(["fetchRes"]),

    async submit() {
      if (this.value.trim().length === 24) {
        this.setSiteID(this.value);
        await this.fetchRes(this.getSiteID);

        if (this.getResponse.message === "ok") {
          localStorage.setItem("leadhit-site-id", this.getSiteID);
          router.push({ path: "/analytics" });
        }
      } else {
        this.setShowAlert(true);
      }
    },
  },
};
</script>

<style>
.form-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-id {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  width: 100%;
  gap: 30px;
}

.v-alert {
  position: absolute;
  right: 36px;
  top: 100px;
  /* transform: translate(-50%, -50%); */
}
</style>
