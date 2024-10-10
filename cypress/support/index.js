import { SpecReporter } from 'jasmine-spec-reporter';

jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displayStacktrace: true,
    displayDuration: true,
  }
}));
