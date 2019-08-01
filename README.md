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