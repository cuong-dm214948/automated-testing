import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.closeButton = page.locator("a[data-dismiss='modal']");
    this.userProfileLink = page.locator('i.icon-user');
    this.phoneInput = page.getByRole('textbox', { name: 'Số Điện Thoại' });
    this.passwordInput = page.getByRole('textbox', { name: 'Mật Khẩu' });
    this.loginButton = page.getByRole('button', { name: 'Đăng Nhập' });
    this.errorMessage1 = page.locator('p.text-danger:has-text("Số điện thoại không tồn tại. Vui lòng đăng ký tài khoản.")');
    this.errorMessage2 = page.locator('p.text-danger:has-text("Tài khoản hoặc mật khẩu không đúng")');
    this.errorMessage3 = page.locator('div.text-danger:has-text("Số Điện Thoại Không Hợp Lệ!")');
 }

  async goto() {
    await this.page.goto('https://dominos.vn/');
  }
  async login(phone, password) {
    await this.closeButton.click();;
    await this.userProfileLink.click();
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    }

  async assertLoginError1() {
    
    const error1Visible = await this.errorMessage1.isVisible().catch(() => false);
    expect(error1Visible).toBeTruthy();
  }

  async assertLoginError2() {
      const error2Visible = await this.errorMessage2.isVisible().catch(() => false);
      expect(error2Visible).toBeTruthy();
  }

    async assertLoginError3() {
      const error3Visible = await this.errorMessage3.isVisible().catch(() => false);
      expect(error3Visible).toBeTruthy();
  }
}
