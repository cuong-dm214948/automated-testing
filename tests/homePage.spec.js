import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage.js';

test('home page test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.dashboard();
  expect(page.url()).toBe('https://dominos.vn/'); 
  await page.locator('div.slick-slide').click();
  expect(page.url()).toBe('https://dominos.vn/promotion-listing?');
  await page.locator('a.nav-link:has-text("khuyến mãi")').click();
  expect(page.url()).toBe('https://dominos.vn/promotion-listing?');
  await page.getByRole('button', {name:"Xem them"}).click();
  expect(page.url()).toBe('https://dominos.vn/product-listing?');
});

test('voucher test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.voucher();
  expect(page.url()).toBe('https://dominos.vn/voucher-default?');
  await page.getByPlaceholder('Nhập mã e-voucher').click();
  await page.getByPlaceholder('Nhập mã e-voucher').fill('');
  await page.getByRole('button', { name: 'Áp dụng' }).click();
  expect(page.getByText('Some things went wrong').isVisible()).toBeTruthy();
  await page.getByPlaceholder('Nhập mã e-voucher').fill('123456789');
  await page.getByRole('button', { name: 'Áp dụng' }).click();
  expect(page.getByText('Ma voucher khong ton tai').isVisible()).toBeTruthy();
  // await page.getByPlaceholder('Nhập mã e-voucher').fill('ev');
  // await page.getByRole('button', { name: 'Áp dụng' }).click();
  // expect(page.getByText('Ma voucher khong ton tai').isVisible()).toBeTruthy();
});

test('menu test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.menu();
  expect(page.url()).toBe('https://dominos.vn/product-listing?');

  
});

test('tracking test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.tracking();
  expect(page.url()).toBe('https://dominos.vn/tracking'); 
  await page.getByPlaceholder('Nhập so dien thoai').click();
  await page.getByPlaceholder('Nhập so dien thoai').fill('');
  expect(page.getByText('Vui lòng nhập số điện thoại').isVisible()).toBeTruthy();
  await page.getByPlaceholder('Nhập so dien thoai').fill('0123456789');
  await page.getByRole('button', { name: 'Theo dõi đơn hàng' }).click();
  expect(page.getByText('Hom nay ban khong co don hang nao').isVisible()).toBeTruthy();
});

test('store location test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.storelocation();
  expect(page.url()).toBe('https://dominos.vn/store-locator'); 
});

test('blog test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.blog();
  expect(page.url()).toBe('https://dominos.vn/blog');
  await page.locator('article').first().click();
  expect(page.url()).toContain('https://dominos.vn/blog/');
  await page.locator('button:has-text"Tuyen dung"').click();
  expect(page.url()).toBe('https://vfbs.carreers.vn');
});

test('user test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.user();
  expect(page.url()).toBe('https://dominos.vn/');
  expect(page.getByText('Đăng Nhập').isVisible()).toBeTruthy();
});

test('language test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.vietnamese(); 
  expect(page.getByText('Thuc don').isVisible()).toBeTruthy();
  await homePage.english();
  expect(page.getByText('menu').isVisible()).toBeTruthy();
});

test('notifycart', async ({page}) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.notifycart();
  expect(page.getByText('0').isVisible).toBeTruthy; 
});

test('cart test', async ({page}) => {
  await homePage.cart();
  expect(page.url()).toBe('https://dominos.vn/cart?');
  expect (page.getByText('Gio hang trong').isVisible).toBeTruthy();
  await page.getByRole('button', {name: 'Tiep tuc chon mon'} ).click();
  expect (page.url().toBe('https://dominos.vn/product-listing?'));
});