import {test, expect} from "@playwright/test";

test("Form", async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
    await page.locator('id=firstName').click();
    await page.locator('id=firstName').fill('Cuong');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Dm');
    await page.getByRole('textbox', { name: 'example' }).click();
    await page.getByRole('textbox', { name: 'example'}).fill('cuong@gmail.com');
    await page.getByText('Male', { exact: true }).click(); //locator in loop
    await page.getByText('Female').click();
    await page.getByText('Other').click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('0123456789');
    await page.locator('#dateOfBirthInput').click(); //id
    await page.locator('.react-datepicker__month-select').selectOption('4');
    await page.locator('.react-datepicker__year-select').selectOption('1995');
    await page.locator('.react-datepicker__day--015').click();
    await page.locator('id=subjectsInput').click();
    await page.locator('id=subjectsInput').fill('Maths');
    //await page.getByText('Maths', { exact: true }).click();
    await page.locator('div').filter({ hasText: /^Maths$/ }).nth(1).click();
    await page.locator('#subjectsInput').fill('e');
    await page.getByText('Chemistry', { exact: true }).click();
    await page.getByText('Sports').click();
    await page.getByText('Reading').click();
    await page.getByText('Music').click();
    await page.locator('id=uploadPicture').setInputFiles('tests/example.spec.js');
    await page.getByRole('textbox', { name: 'Current Address'}).click();
    await page.getByRole('textbox', { name: 'Current Address'}).fill('Hanoi');
    await page.locator('#state').click();
    await page.getByText('Uttar Pradesh', { exact: true }).click();
    await page.locator('#city').click();
    await page.getByText('Agra', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForSelector('#example-modal-sizes-title-lg', { timeout: 5000 });//wait for element
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
});