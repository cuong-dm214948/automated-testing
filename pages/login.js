import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    // Define element locators
    this.loginicon = page.getByRole('link', { name: '' });
    this.phoneInput = page.getByRole('textbox', { name: 'Số Điện Thoại' });
    this.passwordInput = page.getByRole('textbox', { name: 'Mật Khẩu' });
    this.loginButton = page.getByRole('button', { name: 'Đăng Nhập' });
    this.errorMessage1 = page.getByText('Số điện thoại không tồn tại. Vui lòng đăng ký tài khoản.', { exact: false });
    this.errorMessage2 = page.getByText('Tài khoản hoặc mật khẩu không đúng.', { exact: false });
  }

  async goto() {
    console.log('Navigating to Dominos.vn...');
    await this.page.goto('https://dominos.vn/', { waitUntil: 'domcontentloaded' });
  }
  async login(phone, password) {
    console.log('Waiting for login icon...');
    await this.loginicon.waitFor({ state: 'visible', timeout: 10000 });

    console.log('Clicking login icon...');
    await this.loginicon.click();

    console.log('Filling in login credentials...');
    await this.phoneInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);

    console.log('Clicking login button...');
    await this.loginButton.click();
    }


  async assertLoginError() {
    // Check if either error appears
    const error1Visible = await this.errorMessage1.isVisible().catch(() => false);
    const error2Visible = await this.errorMessage2.isVisible().catch(() => false);

    expect(error1Visible || error2Visible).toBeTruthy();
  }
}
