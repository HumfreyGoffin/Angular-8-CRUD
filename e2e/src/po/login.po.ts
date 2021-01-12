import {by, element, promise} from "protractor";
import {StudentListPo} from "./student-list.po";

export class LoginPo {

  public fillUsername(username: string): promise.Promise<LoginPo> {
    return element(by.id('username')).sendKeys(username)
      .then(() => this);
  }

  public fillPassword(password: string): promise.Promise<LoginPo> {
    return element(by.id('password')).sendKeys(password)
      .then(() => this);
  }

  public clickLogin(): promise.Promise<StudentListPo> {
    return element(by.id('login-button')).click()
      .then(() => new StudentListPo());
  }
}
