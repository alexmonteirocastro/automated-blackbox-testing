/// <reference types="Cypress" />

import * as calculator from '../page_objects/calculator.component'

const lotOptions = [{
    text: 'Short-Term Parking',
    value: 'STP'
  },
  {
    text: 'Economy Parking',
    value: 'EP'
  },
  {
    text: 'Long-Term Surface Parking',
    value: 'LTS'
  },
  {
    text: 'Long-Term Garage Parking',
    value: 'LTG'
  },
  {
    text: 'Valet Parking',
    value: 'VP'
  }
]

context('The Parking Calculator', () => {
  before(() => {
    cy.visit('/')
  });

  it('page title should be Parking Calculator', () => {
    calculator.assertPageTitleToBe('PARKING CALCULATOR')
  });

  it('should select all different lot options', () => {
    lotOptions.forEach(option => calculator.selectLotOption(option.text, option.value))
  });

  it('entry time field should accept inputs n HH:MM format', () => {
    calculator.fillTimeField(calculator.selectors.entryTime, '00:01')
  });

  it('should toggle entry AM and PM time for entry', () => {
    calculator.setAmFmTime(calculator.selectors.entryTimeAMPM, true)
    calculator.setAmFmTime(calculator.selectors.entryTimeAMPM, false)
  });

  it('should provide an entry date', () => {
    calculator.fillInDate(calculator.selectors.entryDate, '09/01/2019')
  });

  it('leave time field should accept inputs n HH:MM format', () => {
    calculator.fillTimeField(calculator.selectors.exitTime, '11:59')
  });

  it('should toggle entry AM and PM time for exit', () => {
    calculator.setAmFmTime(calculator.selectors.exitTimeAMPM, true)
    calculator.setAmFmTime(calculator.selectors.exitTimeAMPM, false)
  });

  it('should provide an exit date', () => {
    calculator.fillInDate(calculator.selectors.exitDate, '09/02/2019')
  });

  it('default price should be $ 0', () => {
    calculator.expectPriceToBe('0')
  });

  it('should correctly calculate duration of parking', () => {
    calculator.setEntry('09:00', '09/01/2019')
    calculator.setExit('10:00', '09/01/2019')
    calculator.clickCalculateButton()
    calculator.durationShoulBe(0, 1, 0)
    calculator.setEntry('09:00', '09/01/2019')
    calculator.setExit('10:00', '09/02/2019')
    calculator.clickCalculateButton()
    calculator.durationShoulBe(1, 1, 0)
    calculator.setEntry('09:00', '09/01/2019')
    calculator.setExit('11:30', '09/01/2019')
    calculator.clickCalculateButton()
    calculator.durationShoulBe(0, 2, 30)
    calculator.setEntry('09:00', '09/01/2019')
    calculator.setExit('12:30', '09/01/2019')
    calculator.clickCalculateButton()
    calculator.durationShoulBe(0, 3, 30)
  });

  it('should return an error if exit date is earlier than entry date', () => {
    calculator.setEntry('09:00', '09/02/2019')
    calculator.setExit('10:00', '09/01/2019')
    calculator.clickCalculateButton()
    calculator.resultShouldReturnError()
  });

  it('should return an error if exit time is earlier than entry time', () => {
    calculator.setEntry('11:00', '09/02/2019')
    calculator.setExit('10:00', '09/01/2019')
    calculator.clickCalculateButton()
    calculator.resultShouldReturnError()
  });

  it('the same parking duration for different parking lot options should return different prices ', () => {
    calculator.selectLotOption(lotOptions[0].text, lotOptions[0].value)
    calculator.setEntry('09:00', '09/01/2019')
    calculator.setExit('10:00', '09/02/2019')
    calculator.clickCalculateButton()
    calculator.getPrice().then(price1 => {
      calculator.selectLotOption(lotOptions[1].text, lotOptions[1].value)
      calculator.clickCalculateButton()
      calculator.getPrice().then(price2 => {
        expect(price2).to.not.equal(price1)
        calculator.selectLotOption(lotOptions[2].text, lotOptions[2].value)
        calculator.clickCalculateButton()
        calculator.getPrice().then(price3 => {
          expect(price3).to.not.equal(price2)
          calculator.selectLotOption(lotOptions[3].text, lotOptions[3].value)
          calculator.clickCalculateButton()
          calculator.getPrice().then(price4 => {
            expect(price4).to.not.equal(price3)
            calculator.selectLotOption(lotOptions[3].text, lotOptions[3].value)
            calculator.clickCalculateButton()
            calculator.getPrice().then(price5 => {
              expect(price5).to.not.equal(price4)
            })
          })
        })
      })
    })
  });
});