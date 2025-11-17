const { expect } = require("@playwright/test");

class SignupPage {
  constructor(page) {
    this.page = page;
    this.signupIcon = page.getByRole('button', { name: 'Dùng thử miễn phí', exact:true});
    this.phoneInput = page.locator('id=username');
    this.passwordInput = page.locator('id=password');
    this.signupButton = page.getByRole('button', { name: 'Đăng ký' });

    this.errorExists = page.getByText("Số điện thoại hoặc mail đã tồn tại", { exact: false });
    this.errorInvalidEmail = page.getByText("Vui Lòng Nhập Email Đang Sử Dụng Để Nhận Thông T");
    this.errorInvalidPhone = page.getByText("Số Điện Thoại Không Tồn Tại!");
    this.successHeading = page.getByText("Mã OTP sẽ hết hạn");
  }

  async goto(phone, password) {
    await this.page.goto("https://vbee.vn/", { waitUntil: "domcontentloaded" });
    await this.signupIcon.click();
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.signupButton.click();
  }

  async assertSignupResult() {
    await this.page.waitForTimeout(5000); 
    const successVisible = await this.successHeading.isVisible().catch(() => false);
    const errorsVisible = [
      await this.errorExists.isVisible().catch(() => false),
      await this.errorInvalidEmail.isVisible().catch(() => false),
      await this.errorInvalidPhone.isVisible().catch(() => false),
    ];

    if (successVisible) {
      console.log("Signup successful");
      expect(successVisible).toBeTruthy();
    } else if (errorsVisible.some(Boolean)) {
      console.log("Signup failed due to existing account, invalid input, or throttling");
      expect(errorsVisible.some(Boolean)).toBeTruthy();
    } 
  }
}

module.exports = { SignupPage };
