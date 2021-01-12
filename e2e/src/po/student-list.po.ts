import {Table} from "./table.po";
import {promise} from "selenium-webdriver";
import {Utils} from "tslint";
import {Util} from "./util.po";
import {AddStudentPo} from "./add-student.po";
import {LoginPo} from "./login.po";

export class StudentListPo {

  public assertDefaultStudentTable(): promise.Promise<StudentListPo> {
    return Table.assertTableHeaders('student-table', ['Sr. No.', 'First Name', 'Last Name', 'Email', 'Phone', 'Update', 'Delete'])
      .then(() => Table.assertTableValues('student-table', [
        ['1', 'Sangwin', 'Gawande', 'sangwin@yopmail.com', '+91-9503733178', "Update", 'Delete'],
        ['2', 'Oman', 'Umir', 'oman@yopmail.com', '+91-8574889658', "Update", 'Delete'],
        ['3', 'Tina', 'Dillon', 'tina@yopmail.com', '+91-7485889658', "Update", 'Delete'],
        ['4', 'John', 'Doe', 'john@yopmail.com', '+91-9685589748', "Update", 'Delete'],
        ['5', 'Peter', 'Parker', 'peter@yopmail.com', '+91-8595856547', "Update", 'Delete']]))
      .then(() => this)
  }

  public assertStudentTableWithNewStudent(): promise.Promise<StudentListPo> {
    return Table.assertTableHeaders('student-table', ['Sr. No.', 'First Name', 'Last Name', 'Email', 'Phone', 'Update', 'Delete'])
      .then(() => Table.assertTableValues('student-table', [
        ['1', 'Albert', 'Einstein', 'Albert.Einstein@gmail.com', '+91-9999999999', "Update", 'Delete'],
        ['2', 'Sangwin', 'Gawande', 'sangwin@yopmail.com', '+91-9503733178', "Update", 'Delete'],
        ['3', 'Oman', 'Umir', 'oman@yopmail.com', '+91-8574889658', "Update", 'Delete'],
        ['4', 'Tina', 'Dillon', 'tina@yopmail.com', '+91-7485889658', "Update", 'Delete'],
        ['5', 'John', 'Doe', 'john@yopmail.com', '+91-9685589748', "Update", 'Delete'],
        ['6', 'Peter', 'Parker', 'peter@yopmail.com', '+91-8595856547', "Update", 'Delete']]))
      .then(() => this)
  }

  public clickNewStudentButton(): promise.Promise<AddStudentPo> {
    return Util.clickButton('new-student-button').then(() => new AddStudentPo())
  }

  public clickLogoutButton(): promise.Promise<LoginPo> {
    return Util.clickButton('logout').then(() => new LoginPo())
  }
}

