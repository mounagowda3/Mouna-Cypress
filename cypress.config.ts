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
