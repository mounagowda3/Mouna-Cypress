declare namespace Cypress {
    interface Chainable {
      xpath(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
  