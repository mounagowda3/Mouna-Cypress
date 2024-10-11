import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on: any, config: any) {
      // Implement node event listeners here
    },
    specPattern: 'cypress/integration/*.ts',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
  },
});

module.exports = defineConfig({
    e2e: {
        reporter: 'mocha-spec', // Specify the reporter here
        reporterOptions: {
            // Options for the reporter can be specified here
            "reporterOptions": {
                "reporter": "spec",
            }
        }
    },
});
