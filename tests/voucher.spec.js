import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage.js';

test('voucher test', async ({ page }) => {
//   const homePage = new HomePage(page);
//   await homePage.goto();
//   await homePage.voucher();
//   //await expect(page.url()).toBe('https://dominos.vn/voucher-default');
//   await page.getByRole('textbox', { name: 'Nhập Mã E-voucher' }).click();
//   await page.getByRole('textbox', { name: 'Nhập Mã E-voucher' }).fill('');
//   await page.getByRole('button', { name: 'Áp Dụng' }).click();
//   expect(page.getByText('Some things went wrong').isVisible()).toBeTruthy();
  const homePage1 = new HomePage(page);
  await homePage1.goto();
  await homePage1.voucher();
  await page.getByRole('textbox', { name: 'Nhập Mã E-voucher' }).fill('123456789');
  await page.getByRole('button', { name: 'Áp dụng' }).click();
  expect(page.getByText('Mã voucher không tồn tại').isVisible()).toBeTruthy();
  // await page.getByPlaceholder('Nhập mã e-voucher').fill('ev');
  // await page.getByRole('button', { name: 'Áp dụng' }).click();
  // expect(page.getByText('Ma voucher khong ton tai').isVisible()).toBeTruthy();
});