const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const cucumber = require('cypress-cucumber-preprocessor').default



module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      on('task', {
        token: {
          getToken: () => this.token || null,
          setToken: (token) => {
            this.token = token;
            return null;
          },
          clearToken: () => {
            this.token = undefined;
            return null;
          }
        },

      });

      return config;
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://gorest.co.in/public/v2 ",
    chromeWebSecurity: false,
  },
});
