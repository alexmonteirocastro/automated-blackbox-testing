# Automated Black Box Testing Demo Exercise 

__Writing a few automated tests forn testing a blackbox system__

## Purpose of the exercise

To provide an automated test suite for a black-box system, designed to calculate parking pricing when given a selection of options.

## System under test

They tests will be running on [this](http://adam.goucher.ca/parkcalc/) system. 

## Test planning

Upon a quick exploratory test, these are the main aspects of the application to test.

Individual components:

* __Lot selection dropdown:__ We should test that this dropdown  opens on click and that it alows users to pick an option
* __entry date and time fields:__ We should test these input fields. Assert that format of inputs accepted should respect the business logic.
* __leaving date and time fields:__ We should test these input fields. Assert that format of inputs accepted should respect the business logic. 
* __cost field:__ Should display a string for the price and another for the duration
* __calculate button:__ Should be clickable

### Testing the integration of the affore mentioned components together. 

We should cover general use cases such as: 

  * Providing a certain entry date, a posterior leaving date and clicking the calculate button should render price and the calculated duration of parking
  * Providing a certain leaving date prior to the entry date and clicking the calculate button should render an error message
  * Providing invalid values for entry and leaving time and clicking the calculate button should render an error message
  * Providing a certain entry date, a posterior leaving date and clicking the calculate button should render different prices for different selected lots

## Code design pattern for automated tests

The code design pattern used was the page object model for it provides for less repeated code and better code reusability. The source code for the page pbjects can be found under the `cypress/page_objects` folder.

## Running the automated tests

The automated test suite files can be found within the `cypress/integration` folder. 

How to run the automated tests? 

1. Download the project's dependencies using

```
npm run install
```

2. Launch the cypress standalone application with 

```
npm run cypress:open
```

3. Run the automaated tests in headless mode using

```
npm run cypress:headless
```

In a CI pipeline, the tests would be running on the headless mode. 

## Points for improvement

There are several improvements for this automated test suit: 

* Implement a plugin that can generate both test and coverage reports
* Integrate the automated tests into a CI pipeline (such as Jenkins, TravisCI, CircleCI, bamboo, etc...)
* The current automated test suite does not run tests in different browsers or devices. It would be a good idea to implement a functionality that would allow to run tests in different browsers and in different emulated devices. 
