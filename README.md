# Introduction
UI Search Functionality Test Suite

# Overview
This project automates the testing of the search functionality on the Unibet blog web page using Cypress. It includes a set of tests that cover various scenarios, such as searching with valid data, invalid data, empty data, and special characters. The objective is to ensure that the search functionality behaves as expected under different conditions.

# Project Structure and Design
This project follows the Page Object Model (POM) design pattern:
1. UI_search_spec.js: Contains the test cases for the search functionality.
2. UI_searchPage.js: This file contains methods that handle interactions with the search page.
3. locators.js: Defines the locators for the elements used in the tests.
4. cypress.config.js - Configures settings for compilation and test execution.
5. package.json - Lists npm packages and project dependencies.
6. package-lock.json - Automatically generated to lock dependencies versions.
7. Nodejs - Cypress built on Node.js and comes packaged as an npm module.
8. tsconfig.json - Configuration file which specifies the compiler options and settings for how TypeScript code should be compiled into JavaScript. 
9. Mocha - Mocha Framework is used to write test cases

# Installation
1. Download and install Node.js.
2. Download and install Visual Studio Code.
3. Install Cypress, Run in the terminal: npm install cypress
4. Install other things related to cypress: npm install --save-dev cypress cypress-xpath; npm install --save-dev @types/cypress;npm install --save-dev @types/mocha; npm install --save-dev @types/jquery
5. Open Cypress Test Runner with the command: node_modules/.bin/cypress open.(or) npx cypress open

# To Run
Open the project in the Test Runner and execute the tests (or)
Run this command in VS code terminal - npx cypress run