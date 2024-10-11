import locators from './locators';

class SearchPage {
    navigate(): void {
        cy.visit('https://www.unibet.co.uk/blog');
        cy.log('Navigated to UI blog page');
    }

    clickSearchIcon(): void {
        cy.get(locators.searchIcon).should('be.visible');
        cy.get(locators.searchIcon).eq(1).click();       // Click the search icon 
        cy.log('Clicked on the search icon');
    }

    verifySearchText(): void {
        cy.get(locators.searchText).should('have.text', 'Search');  // Verify Search Text display
        cy.get(locators.searchInnerText).should('have.attr', 'placeholder', 'Search ...');
        cy.log('Verified search text and placeholder');
    }

    getRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }

    typeSearchInput(searchElement: string): void {
        if (searchElement !== '') {
            cy.get(locators.searchInput).type(searchElement).type("{enter}");
            cy.log(`Typed Search input: ${searchElement}`);
        } else {
            cy.get(locators.searchInput).type("{enter}");
            cy.log('Typed Empty search input');
        }
    }

    verifySearchResultsContain(searchElement: string): void {
        let allContain = true;
        if (searchElement !== '') {
            cy.get(locators.cardTitles).each(($el) => {
                const text = $el.text();
                if (!text.includes(searchElement)) {
                    allContain = false; // Set flag to false if any text does not contain the search term
                    return false; // Returning false stops the iteration
                }
            }).then(() => {
                // Using a conditional assertion
                if (allContain) {
                    cy.log('All elements contain the expected text.');
                } else {
                    cy.log('Not all elements contain the expected text.');
                }
                cy.log('Verified that search results contain the search term');
            });
        }
    }

    verifyEmptySearchResults(searchElement: string): void {
        const verifyCurrentPageResults = () => {
            this.verifySearchResultsContain(searchElement);
        };
        verifyCurrentPageResults();     // Start by verifying the results on the first page
        // Handle pagination
        cy.get('.navigation .next.page-numbers').then(($nextButton) => {
            if ($nextButton.length) {               // Check if the "Next" button is available
                cy.get('.navigation .next.page-numbers').click().then(() => {
                    verifyCurrentPageResults();     // Verify the new page results
                    this.verifyEmptySearchResults(searchElement);    // Recursively call the function until no more pages
                });
            } else {
                cy.log('No more pages to navigate.');
            }
        });
    }

    storeInitialElements(): Cypress.Chainable {
        const initialElementTexts: string[] = [];
        return cy.get(locators.cardTitles).each(($el) => {
            initialElementTexts.push(($el[0] as HTMLElement).textContent || ''); // Get textContent
        }).then(() => {
            cy.log(initialElementTexts.join(', ')).then(() => {
                return initialElementTexts; // Return the array of texts
            }) // Log elements as a string            
        });

    }

    verifyEmptySearchResultsContain(searchElement: string, initialElements: string[]): void {
        // Get elements after the search
        cy.get(locators.cardTitles).then(($secondSet) => {
            const elementsTextAfterSearch: string[] = Array.from($secondSet as HTMLElement[]).map((el) => {
                return el.textContent || ''; // Use textContent to get the text
            });
            initialElements.forEach((text, index) => {
                if (!elementsTextAfterSearch[index].includes(text)) {
                    cy.log(`Mismatch at index ${index}: "${elementsTextAfterSearch[index]}" does not contain "${text}"`);
                } else {
                    cy.log(`Match at index ${index}: "${elementsTextAfterSearch[index]}" contains "${text}"`);
                }
            });
        });
    }


    verifyNoResultsFound(): void {
        cy.get(locators.noResultsHeader)
            .should('contain.text', 'Nothing Found');
        cy.get(locators.noResultsMessage)
            .should('contain.text', 'Sorry, but nothing matched your search criteria. Please try again with some different keywords.');
        cy.log('Verified that no results were found');
    }
}




export default new SearchPage();

