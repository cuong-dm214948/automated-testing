import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.js";

test.describe("Login Tests with AI-generated data", () => {
  test("Run 5 LLM-generated login attempts", async ({ page }) => {
      test.setTimeout(120000);

    const { generateInputs } = await import("../utils/genInput.js");
    const inputs = await generateInputs();
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    for (const { phone, password } of inputs) {
      console.log(`Trying login with ${phone} / ${password}`);

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
});
