import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage.js';

test('home page test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.dashboard();
  expect(page.url()).toBe('https://dominos.vn/'); 
  await page.locator('div.slick-active').click();
  await expect(page).toHaveURL(/promotion-listing/);
  const homePage2 = new HomePage(page);
  await homePage2.goto();
  await homePage2.dashboard();
  await page.locator('a.nav-link:has-text("Khuyến Mãi Mỗi Ngày")').click();
  await expect(page).toHaveURL(/promotion-listing/);
  const homePage3 = new HomePage(page);
  await homePage3.goto();
  await homePage3.dashboard();
  await page.getByRole('button', { name: 'Xem Thêm' }).click();
  await expect(page).toHaveURL(/product-listing/);
});

test('voucher test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.voucher();
  //await expect(page.url()).toBe('https://dominos.vn/voucher-default');
  await page.getByRole('textbox', { name: 'Nhập Mã E-voucher' }).click();
  await page.getByRole('textbox', { name: 'Nhập Mã E-voucher' }).fill('');
  await page.getByRole('button', { name: 'Áp Dụng' }).click();
  expect(page.getByText('Some things went wrong').isVisible()).toBeTruthy();
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

test('menu test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.menu();
  //expect(page.url()).toBe('https://dominos.vn/product-listing?');
  expect(page.getByText('Sản phẩm').isVisible()).toBeTruthy();
});

test('tracking test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.tracking();
  //expect(page.url()).toBe('https://dominos.vn/tracking'); 
  await page.getByPlaceholder('Nhập số điện thoại').click();
  await page.getByPlaceholder('Nhập số điện thoại').fill('');
  expect(page.getByText('Vui lòng nhập số điện thoại').isVisible()).toBeTruthy();
  await page.getByPlaceholder('Nhập số điện thoại').fill('0123456789');
  await page.locator("id=sign-in-button").click();
  expect(page.getByText('Hôm nay bạn không có đơn hàng nào').isVisible()).toBeTruthy();
  // await page.getByPlaceholder('Nhập số điện thoại').fill('0123456789');
  // await page.locator("id=sign-in-button").click();
  // expect(page.getByText('Mã đơn hàng').isVisible()).toBeTruthy();
});

test('store location test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.storelocation();
  //expect(page.url()).toBe('https://dominos.vn/store-locations'); 
  //expect(page.getByRole('main').getByText('Danh Sách Cửa Hàng').isVisible()).toBeTruthy();
});

test('blog test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.blog();
  //expect(page.url()).toBe('https://dominos.vn/blog');
  expect(page.getByText('Tin tức').isVisible()).toBeTruthy();
  await page.getByText('Tuyển dụng').click();
  expect(page.url()).toBe('https://tuyendung.vfbs.vn/');
});

test('user test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.user();
  expect(page.url()).toBe('https://dominos.vn/');
  expect(page.getByRole('tab',{name:'Đăng Nhập'}).isVisible()).toBeTruthy();
});

test('language test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.vietnamese(); 
  expect(page.getByText('Switch To').isVisible()).toBeTruthy();
  await homePage.goto();
  await homePage.english();
  expect(page.getByText('Chuyển Phiên Bản').isVisible()).toBeTruthy();
});

test('notifycart', async ({page}) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.notifycart();
  expect(page.getByText('0').isVisible).toBeTruthy; 
});

test('cart test', async ({page}) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.cart();
  //expect(page.url()).toBe('https://dominos.vn/cart?');
  expect (page.getByText('Giỏ hàng trống').isVisible).toBeTruthy();
  await page.getByText('Tiếp tục chọn món').click();
  //expect (page.url()).toBe('https://dominos.vn/product-listing?');
});