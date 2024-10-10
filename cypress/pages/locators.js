// Locator for the UI search 
const locators = {
    searchIcon: 'svg#searchIcon',
    searchText: 'span.screen-reader-text',
    searchInnerText: 'input[placeholder*="Search ..."]',
    searchInput: '//*[@id="searchContainer"]/div/form/label/input',
    cardTitles: 'h5.card-title.text-dark.fw-bold.text-ellipsis-lines-3',
    noResultsHeader: '//*[contains(@class,"no-results")]/header/h1',
    noResultsMessage: '//*[contains(@class,"no-results")]/p',
};

export default locators;
