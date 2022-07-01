export default {
  state: {
    inputValue: "",
    data: [],
  },

  mutations: {
    setInputValue(state, payload) {
      state.inputValue = payload;
    },
    setData(state, payload) {
        state.inputValue = payload;
    }
  },

  getters: {
    getInputValue(state) {
      return state.inputValue;
    },
  },
  actions: {
    fetchData(value) {
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
        localStorage.setItem("leadhit-site-id", value);
        router.push({ path: "/analytics" });
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
    },
  },
  //   modules: {},
};
