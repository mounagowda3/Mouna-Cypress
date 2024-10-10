import locators from './locators';

class SearchPage {
    navigate() {
        cy.visit('https://www.unibet.co.uk/blog');
        cy.log('Navigated to UI blog page');
    }

    clickSearchIcon() {
        cy.get(locators.searchIcon).should('be.visible');
        cy.get(locators.searchIcon).eq(1).click();
        cy.log('Clicked on the search icon');
    }

    verifySearchText() {
        cy.get(locators.searchText).should('have.text', 'Search');  // Verfy Search Text display
        cy.get(locators.searchInnerText).should('have.attr', 'placeholder', 'Search ...');
        cy.log('Verified search text and placeholder');
    }

    getRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }

    typeSearchInput(searchElement) {
        if (searchElement !== '') {
            cy.xpath(locators.searchInput).type(searchElement).type("{enter}");    // Search Input
            cy.log('Typed Search input: ${searchElement}');
        } else {
            cy.xpath(locators.searchInput).type("{enter}");
            cy.log('Typed Empty search input');
        }
    }

    verifySearchResultsContain(searchElement) {
        let allContain = true;
        cy.get(locators.cardTitles).each(($el) => {
            const text = $el.text();
            if (!text.includes(searchElement)) {
                allContain = false; // Set flag to false if any text does not contain the search term
                return false; // Returning false stops the iteration
            }
            expect(text).to.contain(searchElement); // Perform the expectation
        }).then(() => {
            expect(allContain).to.be.true; // Final assertion after the loop
            cy.log('Verified that search results contain the search term');
        });
    }

    verifySearchResults(searchElement) {
        const verifyCurrentPageResults = () => {
            this.verifySearchResultsContain(searchElement);
        };
        verifyCurrentPageResults();     // Start by verifying the results on the first page
        // Handle pagination
        cy.get('.navigation .next.page-numbers').then(($nextButton) => {
            if ($nextButton.length) {               // Check if the "Next" button is available
                cy.get('.navigation .next.page-numbers').click().then(() => {
                    verifyCurrentPageResults();     // Verify the new page results
                    this.verifySearchResults(searchElement);    // Recursively call the function until no more pages
                });
            } else {
                cy.log('No more pages to navigate.'); 
            }
        });
    }

    storeInitialElements() {
        return cy.get(locators.cardTitles).then($initialElements => {
            // Convert the jQuery object to an array and map the text content
            const initialElementTexts = $initialElements.toArray().map(el => Cypress.$(el).text());
            cy.log(initialElementTexts.join(', '));     // Log the initial element texts as string    
            return Cypress.Promise.resolve(initialElementTexts);    // Return the array of initial texts using Cypress.Promise
        });
    }

    verifyEmptySearchResultsContain(searchElement, initialElements) {
        // Get elements after the search
        cy.get(locators.cardTitles).then($secondSet => {
            const elementsTextAfterSearch = $secondSet.map((index, el) => Cypress.$(el).text()).get(); // Get text content as an array        
            initialElements.forEach((text, index) => {
                expect(text).to.contain(elementsTextAfterSearch[index]); // Compare corresponding elements
                cy.log(`Comparing row ${index + 1}: "${text}" and "${elementsTextAfterSearch[index]}"`);
            });
        });
    }

    verifyNoResultsFound() {
        cy.xpath(locators.noResultsHeader)
            .should('contain.text', 'Nothing Found');
        cy.xpath(locators.noResultsMessage)
            .should('contain.text', 'Sorry, but nothing matched your search criteria. Please try again with some different keywords.');
        cy.log('Verified that no results were found');
    }
}

export default new SearchPage();
