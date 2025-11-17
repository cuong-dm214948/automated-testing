import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.closeButton = page.locator("a[data-dismiss='modal']");
    this.userProfileLink = page.getByRole('button', { name: 'Đăng Nhập' });
    this.phoneInput = page.locator('id=username');
    this.passwordInput = page.locator('id=password');
    this.loginButton = page.getByRole('button', { name: 'Đăng Nhập' });
    this.errorMessage1 = page.locator('p.text-xs:has-text("Thông tin đăng nhập không chính xác")');
    this.errorMessage2 = page.locator('p.text-xs:has-text("Email hoặc số điện thoại không đúng định dạng")');
 }

  async goto() {
    await this.page.goto('https://vbee.vn/', {
    waitUntil: 'domcontentloaded'
  });
  }
  async login(phone, password) {
    //await this.closeButton.click();;
    await this.userProfileLink.click();
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    console.log(`Attempted login with phone: ${phone} and password: ${password}`);
    }

  async assertLoginError1() { 
    await expect(this.errorMessage1).toBeVisible({ timeout: 10000 });
    console.log("Login failed as expected with incorrect credentials");
  }

  async assertLoginError2() {
    await expect(this.errorMessage2).toBeVisible({ timeout: 20000 });
    console.log("Login failed as expected with incorrect phone format.");
  }
}
