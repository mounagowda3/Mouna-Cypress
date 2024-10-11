import SearchPage from '../pages/UI_searchPage';

describe('UI Search Functionality', () => {
    // Navigate to the search page before each test
    beforeEach(() => {
        SearchPage.navigate();
        cy.log('Navigated to the UI page');
    });

    it('Search with valid data', () => {
        const searchElement: string = 'Casino';
        cy.log(`Search with valid data: ${searchElement}`);
        SearchPage.clickSearchIcon();               // Click the search icon 
        SearchPage.verifySearchText();              // Verify the search text placeholder    
        SearchPage.typeSearchInput(searchElement);  // Type the search input  
        SearchPage.verifySearchResultsContain(searchElement); // Verify that search results contain the search element
    });

    it('Search with invalid data', () => {
        const searchElement: string = SearchPage.getRandomString(6);
        cy.log(`Search with invalid data: ${searchElement}`);
        SearchPage.clickSearchIcon();               // Click the search icon
        SearchPage.typeSearchInput(searchElement);  // Type the search input  
        SearchPage.verifyNoResultsFound();          // Verify that no results are found
    });

    it('Search with empty data', () => {
        const searchElement: string = '';
        cy.log('Search with empty data');
        // Store elements before the search
        SearchPage.storeInitialElements().then((initialElements: string[]) => {
            SearchPage.clickSearchIcon();                  // Click the search icon
            SearchPage.typeSearchInput(searchElement);     // Type the empty search input    
            SearchPage.verifyEmptySearchResultsContain(searchElement, initialElements);   // Verify search results after the search
        });
    });

    it('Search with special characters data', () => {
        const searchElement: string = SearchPage.getRandomString(3) + '$#';
        cy.log(`Search with special characters: ${searchElement}`);
        SearchPage.clickSearchIcon();                // Click the search icon
        SearchPage.typeSearchInput(searchElement);   // Type the search input
        SearchPage.verifyNoResultsFound();           // Verify that no results are found
    });

});
