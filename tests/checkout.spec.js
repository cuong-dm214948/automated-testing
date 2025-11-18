import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage.js';

test('checkout test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.menu();
  

});