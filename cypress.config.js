const { defineConfig } = require("cypress");
const data = {};

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://big-proxy.oa.r.appspot.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here   
      on('task', {
        save(x) {
          data['sessionToken'] = x;
          return null;
        },
        load(){
          return data['sessionToken'] || null;
        }
      })
    },
  },
});
