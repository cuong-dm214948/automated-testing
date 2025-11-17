import { test } from "@playwright/test";
import { SignupPage } from "../pages/signup.js";

test("Signup ", async ({ page }) => {
    const signupPage = new SignupPage(page);
    const { phone, password } = { phone: "cuong.dm214948@sis.hust.edu.vn", password: "2" }
    await signupPage.goto(phone, password);
    await signupPage.assertSignupResult();
  
});
