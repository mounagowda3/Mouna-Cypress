import { SpecReporter } from 'jasmine-spec-reporter';
import 'cypress-xpath';


jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displayStacktrace: true,
    displayDuration: true,
  }
}));

require('cypress-xpath');
