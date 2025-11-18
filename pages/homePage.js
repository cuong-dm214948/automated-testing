export class HomePage {
  constructor(page) {
    this.page = page;
    this.homeIcon = page.getByAltText('domino-icon');
    this.voucherInput = page.getByText('Mã e voucher');
    this.promotionInput = page.getByText('Mã khuyến mãi');
    this.menuIcon = page.getByText('Thực đơn');
    this.trackingButton = page.getByText('Theo dõi đơn hàng');
    this.storelocationButton = page.getByText('Danh sách cửa hàng');
    this.blogButton = page.getByText('Blog');
    this.userButton = page.locator('i.icon-user');
    this.vietnameseButton = page.getByAltText('flag-vn');
    this.englishButton = page.getByAltText('flag-en');
    this.notifycartIcon = page.locator('div.notify-cart');
    this.cartIcon = page.locator('i.icon-basket');
  }

  async goto() {
    await this.page.goto('https://dominos.vn/', { waitUntil: 'domcontentloaded' });
  }

  async dashboard() {
    await this.homeIcon.click();
  }

  async voucher() {
    await this.voucherInput.click();
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
