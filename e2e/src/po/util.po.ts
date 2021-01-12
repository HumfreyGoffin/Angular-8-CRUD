import {browser, by, element, ElementFinder, promise, protractor} from "protractor";

export class Util {
  static clickButton(id: string): promise.Promise<any> {
    return this.waitForElementById(id)
      .then(() => element(by.id(id)).click());
  }

  static isElementEnabled(id: string): promise.Promise<boolean> {
    return element(by.id(id)).isEnabled();
  }

  static selectOption(id: string): promise.Promise<any> {
    return this.waitForElementToBeClickable(id)
      .then(() => element(by.id(id)).click());
  }

  static fillInput(id: string, text: any): promise.Promise<any> {
    return this.waitForElementById(id)
      .then(() => {
          element(by.id(id)).clear();
          element(by.id(id)).sendKeys(text);
        }
      );
  }

  static isElementPresent(id: string): promise.Promise<boolean> {
    return element(by.id(id)).isPresent();
  }

  static isElementPresentByName(name: string): promise.Promise<boolean> {
    return element(by.name(name)).isPresent();
  }

  static clearInput(id: string): promise.Promise<any> {
    return this.waitForElementById(id)
      .then(() => {
        element(by.id(id)).clear();
        element(by.id(id)).sendKeys('x');
        element(by.id(id)).sendKeys(' \b');
      });
  }

  static fillMonthYearInput(id: string, date: string): promise.Promise<any> {
    return this.clickButton(id)
      .then(() => this.fillInput(id, date));
  }

  static waitForElementById(id: string): promise.Promise<ElementFinder> {
    return browser.wait(() => {
        browser.waitForAngularEnabled();
        return browser.isElementPresent(by.id(id));
      }, 5 * 1000,
      'Waited for 5 seconds on element id: [' + id + '] but failed')
      .then(() => browser.executeScript(`document.getElementById("${id}").scrollIntoView({block: "center"});`))
      .then(() => element(by.id(id)))
      .catch(reason => {
        console.log('[waitForElementById error]: ', reason);
      });
  }

  static waitForElementByCssSelector(cssSelector: string): promise.Promise<ElementFinder> {
    return browser.wait(() => {
        browser.waitForAngularEnabled();
        return browser.isElementPresent(by.css(cssSelector));
      }, 5 * 1000,
      'Waited for 5 seconds on element id: [' + cssSelector + '] but failed')
      .then(() => browser.executeScript(`document.querySelector("${cssSelector}").scrollIntoView({block: "center"});`))
      .then(() => element(by.css(cssSelector)))
      .catch(reason => {
        console.log('[waitForElementByCssSelector error]: ', reason);
      });
  }

  static waitUrl(expectedUrl: string) {
    return browser.getCurrentUrl().then(url => url.includes(expectedUrl));
  }

  static waitForElementToBeClickable(id: string): promise.Promise<any> {
    return this.waitForElementById(id)
      .then(() => browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.id(id)))));
  }
}
