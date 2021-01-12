import {browser, by, element, ElementFinder, promise, protractor} from "protractor";
import {By} from "selenium-webdriver";

const EC = protractor.ExpectedConditions;
const defaultTimeout = 30000;


export class Table {

  private static waitForElement(bySelector: By): promise.Promise<any> {
    return browser.wait(EC.visibilityOf(element(bySelector)), defaultTimeout);
  }

  private static scrollElementIntoView(id: string): promise.Promise<any> {
    return browser.executeScript(`document.getElementById("${id}").scrollIntoView({block: "center"});`);
  }

  private static getElementOrWait(bySelector: By): promise.Promise<any> {
    return browser.wait(EC.visibilityOf(element(bySelector)), defaultTimeout)
      .then(() => element(bySelector));
  }

  private static getElementsOrWait(id: string): promise.Promise<any> {
    return protractor.promise.all([this.waitForElement(by.id(id)), this.scrollElementIntoView(id)])
      .then(() => element.all(by.id(id)));
  }

  static assertTableHeaders(tableId: string, headers: string[]): promise.Promise<any> {
    return Table.getElementsOrWait(tableId).then((thead) => {
      thead[0].$$('th').then((headerColumns: ElementFinder[]) => {
        expect(headerColumns.length).toBe(headers.length, 'expect header length: ' + headerColumns.length + ' for id: ' + tableId);
        for (let i = 0; i < headers.length; i++) {
          expect(headerColumns[i].getText()).toBe(headers[i], 'with table id: ' + tableId);
        }
      });
    });
  }

  static assertTableValues(tableId: string, values: string[][]): promise.Promise<any> {
    return Table.getElementsOrWait(tableId)
      .then((tbody) => {
        tbody[0].$$('tr td')
          .then((valueColumns: ElementFinder[]) => {
            const flattedValues = [].concat.apply([], values);
            expect(valueColumns.length).toBe(flattedValues.length, 'expected different amount of elements in table - id: ' + tableId);
            for (let i = 0; i < valueColumns.length; i++) {
              if (flattedValues[i] !== '*****') {
                expect(valueColumns[i].getText()).toBe(flattedValues[i], 'expected different table value with table id: ' + tableId);
              }
            }
          });
      });
  }

  static clickOnElementInTable(tableId: string, rowNumber: number): promise.Promise<any> {
    return Table.getElementsOrWait(tableId).then((tbody) => {
      tbody[0].$$('td').then((valueColumns: ElementFinder[]) =>
        valueColumns[rowNumber].click());
    });
  }
}
