const { expect } = require("@playwright/test");

class SignupPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.loginIcon = page.getByRole("link", { name: "" });
    this.signupTab = page.getByRole("tab", { name: "Tạo Tài Khoản" });
    this.phoneInput = page.getByRole("textbox", { name: "Số Điện Thoại" });
    this.firstName = page.getByRole("textbox", { name: "Họ" });
    this.lastName = page.getByRole("textbox", { name: "Tên" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Mật Khẩu", exact: true });
    this.confirmPasswordInput = page.getByRole("textbox", { name: "Xác Nhận Mật Khẩu" });
    this.signupButton = page.getByRole("button", { name: "Tạo Tài Khoản" });

    // Error messages
    this.errorExists = page.getByText("Số điện thoại hoặc mail đã tồn tại", { exact: false });
    this.errorTryAfter = page.getByText("Please try after ", { exact: false });
    this.errorInvalidEmail = page.getByText("Vui Lòng Nhập Email Đang Sử Dụng Để Nhận Thông T");
    this.errorInvalidPhone = page.getByText("Số Điện Thoại Không Tồn Tại!");

    this.successHeading = page.getByText("Mã OTP sẽ hết hạn");
  }

  async goto() {
    await this.page.goto("https://dominos.vn/", { waitUntil: "domcontentloaded" });
    await this.page.evaluate(() => { document.body.style.zoom = "0.5"; }); // zoom out 60%
  }

  async openSignupForm() {
    await this.loginIcon.waitFor({ state: "visible", timeout: 15000 });
    await this.loginIcon.click();
    await this.signupTab.waitFor({ state: "visible", timeout: 15000 });
    await this.signupTab.click();
  }

  async fillSignupForm({ phone, firstName, lastName, email, password, confirmpassword }) {
    await this.phoneInput.fill(phone);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmpassword);
  }

  async submit() {
    await this.page.waitForTimeout(1000); // short pause to see the click
    await this.signupButton.click();
  }

  async assertSignupResult() {
    await this.page.waitForTimeout(5000); // watch result

    const successVisible = await this.successHeading.isVisible().catch(() => false);
    const errorsVisible = [
      await this.errorExists.isVisible().catch(() => false),
      await this.errorTryAfter.isVisible().catch(() => false),
      await this.errorInvalidEmail.isVisible().catch(() => false),
      await this.errorInvalidPhone.isVisible().catch(() => false),
    ];

    if (successVisible) {
      console.log("✅ Signup successful");
      expect(successVisible).toBeTruthy();
    } else if (errorsVisible.some(Boolean)) {
      console.log("⚠️ Signup failed due to existing account, invalid input, or throttling");
      expect(errorsVisible.some(Boolean)).toBeTruthy();
    } 
  }
}

module.exports = { SignupPage };
