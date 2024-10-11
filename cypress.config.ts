import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'results',
      overwrite: false,
      html: true,
      json: true,
    },
      specPattern: 'cypress/integration/*.ts',
      screenshotOnRunFailure: true,
      screenshotsFolder: 'cypress/screenshots',
    },
  });

