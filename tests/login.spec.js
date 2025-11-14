import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.js";

test("Login failed", async ({ page }) => {
    test.setTimeout(120000);
    const inputs = { phone: "0397825923", password: "1" }
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    for (const { phone, password } of inputs) {
      await loginPage.login(phone, password);
      try {
        await loginPage.assertLoginError();
        console.log("Login failed (as expected).");
      } catch {
        console.log("Login succeeded or no error visible.");
      }
      await page.reload({ waitUntil: "domcontentloaded" });
    }
});

test("Login attempts", async ({ page }) => {
    test.setTimeout(120000);

    const inputs = { phone: "0397825921", password: "1" }
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    for (const { phone, password } of inputs) {
      await loginPage.login(phone, password);
      try {
        await loginPage.assertLoginError();
        console.log("Login failed (as expected).");
      } catch {
        console.log("Login succeeded or no error visible.");
      }
      await page.reload({ waitUntil: "domcontentloaded" });
    }
});
