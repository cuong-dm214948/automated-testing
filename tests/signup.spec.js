import { test } from "@playwright/test";
import { SignupPage } from "../pages/signup.js";

test.setTimeout(120000);

test("signup", async ({ page }) => {

  const { generateInputs } = await import("../utils/genSignup.js");

  // Get fake signup data from LLM
  const inputs = await generateInputs();
  console.log("Generated inputs:", inputs);

  const signupPage = new SignupPage(page);

  for (const data of inputs) {
    console.log(`\nRunning signup for: ${data.email}`);

    await signupPage.goto();
    await signupPage.openSignupForm();

    await signupPage.fillSignupForm(data);
    await signupPage.submit();
    await signupPage.assertSignupResult();
  }
});
