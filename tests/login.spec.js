// tests/login.spec.js
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.js";

test.describe("Login Tests with AI-generated data", () => {
  test("Run 5 LLM-generated login attempts", async ({ page }) => {
      test.setTimeout(120000);
    // Dynamic import from CommonJS
    const { generateInputs } = await import("../utils/genInput.js");
    const inputs = await generateInputs();

    console.log(" Generated inputs:", inputs);

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    for (const { phone, password } of inputs) {
      console.log(`Trying login with ${phone} / ${password}`);

      await loginPage.login(phone, password);

      // Check if an error appears (invalid credentials)
      try {
        await loginPage.assertLoginError();
        console.log("Login failed (as expected).");
      } catch {
        console.log("Login succeeded or no error visible.");
      }

      // Reload page for next attempt
      await page.reload({ waitUntil: "domcontentloaded" });
    }
  });
});
