/// <reference types="Cypress" />

export const selectors = {
  pageTitle: '.PageTitle',
  selectLot: '#Lot',
  lotOption: 'option',
  entryTime: '#EntryTime',
  entryTimeAMPM: '[name="EntryTimeAMPM"]',
  entryDate: '#EntryDate',
  exitTime: '#ExitTime',
  exitTimeAMPM: '[name="ExitTimeAMPM"]',
  exitDate: '#ExitDate',
  priceSpan: '.SubHead',
  bodyCopy: '.BodyCopy',
  calculateButton: '[type="submit"]'
}

export const assertPageTitleToBe = (title) => {
  cy.get(selectors.pageTitle).should('be.visible').invoke('text').should('equal', title)
}

export const selectLotOption = (option, optionValue) => {
  cy.get(selectors.selectLot).select(option).should('have.value', optionValue)
}

export const fillTimeField = (timeFieldSelector, time) => {
  cy.get(timeFieldSelector).should('be.visible').focus().clear().type(time).blur()
  cy.get(timeFieldSelector).should('have.value', time)
}

export const setAmFmTime = (ampmSelector, pmTime) => {
  cy.get(ampmSelector).eq(pmTime ? 1 : 0).check()
  cy.get(ampmSelector).eq(pmTime ? 1 : 0).should('be.checked')
}

export const fillInDate = (dateFieldSelector, date) => {
  cy.get(dateFieldSelector).focus().clear().type(date).blur()
  cy.get(dateFieldSelector).should('have.value', date)
}

export const getPrice = () => {
  return cy.get(selectors.priceSpan).last().invoke('text').then(priceString => {

    const price = priceString.split(' ')[1]

    return price
  })
}

export const expectPriceToBe = (price) => {
  cy.get(selectors.priceSpan).last().invoke('text').should('equal', `$ ${price}`)
}

export const setEntry = (time, date) => {
  fillTimeField(selectors.entryTime, time)
  setAmFmTime(selectors.entryTimeAMPM, false)
  fillInDate(selectors.entryDate, date)
}

export const setExit = (time, date) => {
  fillTimeField(selectors.exitTime, time)
  setAmFmTime(selectors.exitTimeAMPM, false)
  fillInDate(selectors.exitDate, date)
}

export const clickCalculateButton = () => {
  cy.get(selectors.calculateButton).should('be.visible').and('not.be.disabled').click()
}

export const getDuration = () => {
  return cy.get(selectors.bodyCopy).last().then($duration => {
    var regExp = /\(([^)]+)\)/;
    var matches = $duration.text().match(regExp)[1]

    return matches
  })
}

export const durationShoulBe = (days, hours, minutes) => {
  getDuration().then(duration => {
    expect(duration).to.eq(`${days} Days, ${hours} Hours, ${minutes} Minutes`)
  })
}

export const resultShouldReturnError = () => {
  cy.get(selectors.priceSpan).should('contain', 'ERROR!')
}