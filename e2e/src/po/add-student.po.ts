import {promise} from "protractor";
import {Util} from "./util.po";
import {StudentListPo} from "./student-list.po";

export class AddStudentPo {

  public fillFirstName(firstName: string): promise.Promise<AddStudentPo> {
    return Util.fillInput('first-name', firstName).then(() => this)
  }

  public fillLastName(lastName: string): promise.Promise<AddStudentPo> {
    return Util.fillInput('last-name', lastName).then(() => this)
  }

  public fillEmail(email: string): promise.Promise<AddStudentPo> {
    return Util.fillInput('email', email).then(() => this)
  }

  public fillPhoneNumber(phoneNumber: string): promise.Promise<AddStudentPo> {
    return Util.fillInput('phone', phoneNumber).then(() => this)
  }

  public clickSubmit(): promise.Promise<StudentListPo> {
    return Util.clickButton('submit-new-student').then(() => new StudentListPo())
  }
}
