export class HomePage {
  constructor(page) {
    this.page = page;
    this.homeIcon = page.locator('#sticky-navbar').getByAltText('domino-icon');
    this.closeIcon = page.locator('i.icon-close');
    this.voucherInput = page.getByRole('link', { name: 'Mã E-voucher', exact: true });
    this.promotionInput = page.getByRole('link', { name: 'Khuyến Mãi', exact: true });
    this.menuIcon = page.locator('#responsive-navbar-nav').getByRole('link', { name: 'Thực Đơn' });
    this.trackingButton = page.locator('#responsive-navbar-nav').getByRole('link', { name: 'Theo Dõi Đơn Hàng', exact: true });
    this.storelocationButton = page.locator('#responsive-navbar-nav').getByRole('link', { name: 'Danh Sách Cửa Hàng', exact: true });
    this.blogButton = page.locator('#responsive-navbar-nav').getByRole('link', { name: 'Blog', exact: true });
    this.userButton = page.locator('i.icon-user');
    this.vietnameseButton = page.locator('.text-decoration-none').first().getByAltText('flag-vn');
    this.englishButton = page.getByRole('button').getByAltText('flag-en');
    this.notifycartIcon = page.locator('div.notify-cart');
    this.cartIcon = page.locator('i.icon-basket');
  }

  async goto() {
    await this.page.goto('https://dominos.vn/', { waitUntil: 'domcontentloaded' });
    if (await this.closeIcon.isVisible()) {
      await this.closeIcon.click();
    }
  }

  async dashboard() {
    if (await this.closeIcon.isVisible()) {
      await this.closeIcon.click();
    }
    else
      {await this.homeIcon.click();}
  }

  async voucher() {
    console.log(this.page.url());
    await this.voucherInput.click();
    console.log(this.page.url());
  }

  async promotion() {
    await this.promotionInput.click();
  }

  async menu() {
    await this.menuIcon.click();
  }

  async tracking() {
    await this.trackingButton.click();
  } 

  async storelocation() {
    await this.storelocationButton.click();
  }

  async blog() {
    await this.blogButton.click();
  }

  async user() {
    await this.userButton.click();
  }   

  async vietnamese() {
    await this.vietnameseButton.click();
  } 

  async english() {
    await this.englishButton.click();
  } 

  async notifycart() {
    await this.notifycartIcon.click();
  } 

  async cart() {
    await this.cartIcon.click();
  } 
}
