import {AppPage} from './app.po';
import {LoginPo} from "./po/login.po";
import {StudentListPo} from "./po/student-list.po";
import {browser} from "protractor";
import {AddStudentPo} from "./po/add-student.po";

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.driver.manage().window().maximize();
  });

  it('sanity', (done) => {
    page.navigateTo()
      .then(() => new LoginPo().fillUsername('admin@yopmail.com'))
      .then((loginPo: LoginPo) => loginPo.fillPassword('admin123'))
      .then((loginPo: LoginPo) => loginPo.clickLogin())
      .then((studentListPo: StudentListPo) => studentListPo.assertDefaultStudentTable())
      .then((studentListPo: StudentListPo) => studentListPo.clickNewStudentButton())
      .then((addStudentPo: AddStudentPo) => addStudentPo.fillFirstName('Albert'))
      .then((addStudentPo: AddStudentPo) => addStudentPo.fillLastName('Einstein'))
      .then((addStudentPo: AddStudentPo) => addStudentPo.fillEmail('Albert.Einstein@gmail.com'))
      .then((addStudentPo: AddStudentPo) => addStudentPo.fillPhoneNumber('9999999999'))
      .then((addStudentPo: AddStudentPo) => addStudentPo.clickSubmit())
      .then((studentListPo: StudentListPo) => studentListPo.assertStudentTableWithNewStudent())
      .then((studentListPo: StudentListPo) => studentListPo.clickLogoutButton())
      .then(() => done())
  });

});
