import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.js";

test("Login failed with incrorrect credentials", async ({ page }) => {
    const { phone, password } = { phone: "cuong.dm214948@sis.hust.edu.vn", password: "2" }
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(phone, password);
    await loginPage.assertLoginError1();
});

test("Login passed", async ({ page }) => {
    const { phone, password } = { phone: "cuong.dm214948@sis.hust.edu.vn", password: "1" }
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(phone, password);
    await expect(page).toHaveURL(/studio\/text-to-speech/);
});
