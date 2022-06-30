<template>
  <v-container fluid class="form-container">
    <form action="" class="form-id">
      <label hidden>id</label>
      <input
        type="text"
        class="form-id__input input"
        v-model="value"
        @input="showAlert = false"
        placeholder="id сайт..."
      />
      <button class="form-id__btn btn" @click.prevent="validate">Войти</button>
    </form>
    <v-alert
      v-if="showAlert"
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

export default {
  data: () => ({
    value: "",
    isValide: null,
    showAlert: null,
  }),

  methods: {
    validate() {
      if (this.value.trim().length === 24) {
        this.isValide = true;
        this.getData(this.value);
      } else {
        this.showAlert = true;
        this.isValide = false;
      }
    },

    hiddenAlert() {
      this.showAlert = false;
    },

    async getData(value) {
      const response = await fetch(
        "https://track-api.leadhit.io/client/test_auth",
        {
          method: "GET",
          headers: {
            "Api-Key": "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo",
            "Leadhit-Site-Id": value,
          },
        }
      );

      if (response.ok) {
        let json = await response.json();
        // localStorage.setItem("leadhit-site-id", value);
        router.push({ path: "/analytics" });
      } else {
        alert("Ошибка HTTP: " + response.status);
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
