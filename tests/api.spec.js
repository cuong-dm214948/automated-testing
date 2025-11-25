import { test, expect } from '@playwright/test';

test( 'Login API testing', async ( { page,request} ) => {
    await page.goto( 'https://vbee.vn')
    await page.getByRole('button', { name: 'Đăng nhập' }).click(); // role='button', id='Login-button'
    await page.waitForNavigation();
    const sessionToken = page.url().split('session=')[1];
    console.log('Session Token:', sessionToken);
    
    const response1 = await request.post('https://accounts.vbee.vn/api/v1/login', {
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Origin': 'https://auth.vbee.vn',
        'Referer': 'https://auth.vbee.vn/'
        },
        data: {
        username: 'cuong.dm214948@sis.hust.edu.vn',
        password: '1',
        session: sessionToken
        }
    });
    expect(response1.status()).toBe(200);
    const body = await response1.json();
    console.log(body.result.redirect_uri);
    const response2 = await page.goto(body.result.redirect_uri);
    expect(response2?.status()).toBe(200);
})

test('Register API testing', async ({ request, page }) => {
    await page.goto( 'https://vbee.vn')
    await page.getByRole('button', { name: 'Đăng nhập' }).click(); // role='button', id='Login-button'
    await page.waitForNavigation();
    const sessionToken = page.url().split('session=')[1];
    console.log('Session Token:', sessionToken);
    const payload = {
        username: `user_${Date.now()}@mail.com`,
        password: "123456",
        session: sessionToken
    };

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://auth.vbee.vn",
        "Recaptcha-Version": "V3",
        "Recaptcha-Action": "register",
        "Recaptcha-Token": "dummy_token_for_testing" // dùng real token nếu server bắt buộc
    };

    const response = await request.post(
        "https://accounts.vbee.vn/api/v1/register",
        {
        headers: headers,
        data: payload
        }
    );

    console.log("Status:", response.status());

    const body = await response.json();
    console.log("Response:", body);

    // Expect API status
    expect(response.ok()).toBeTruthy();

    // Expect standard fields
    expect(body).toHaveProperty("success");
    expect(body).toHaveProperty("message");
});

test(`GET payment types`, async ({ request }) => {
    const res = await request.get(`https://dominos.vn/api/v1/payment-types?`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    console.log(`devic`, body);
});

test("POST prepare order", async ({ request }) => {

  const url = "https://dominos.vn/api/v1/orders/prepare";

  const payload = {
    "order_details": [
      {
        "product_id": 6109,
        "quantity": 2,
        "tmp_id": 1 //?
      },
      {
        "product_id": 6310,
        "quantity": 1,
        "tmp_id": 1 //?
      },
      {
        "product_id": 6323,
       "quantity": 1,
       "tmp_id": 1 //?
    }
    ],
    "customer_info": {
      "phone": "0898777978",
      "name": "cuong",
      "address": "1 Phố Phạm Huy Thông,Ngọc Khánh,Ba Đình,Hanoi,Vietnam",
      "gender": 1
    },
    "customer_tax_code": { "phone": "04768642444" },
    "promotions": [],
    "discount": null,
    "booking_date": null,
    "order_type": 6,
    "store_id": 1205,
    "table": null,
    "device-enum": 0,
    "is_check_price": true,
    "payments": [
      { "amount": 304000, "type": "1" }
    ],
    "return_url": "https://dominos.vn/successful-delivery?order_id=",
    "lat": "21.02701960000000",
    "lng": "105.82350280000000"
  };


  const response = await request.post(url, {
    data: payload,
  });
  console.log(await response.json());
  expect(response.status()).toBe(200);
});

test("Discover delivery area bounds", async ({ request }) => {
    const latStart = 20.9586;
    const latEnd = 21.0893;
    const lngStart = 105.7384;
    const lngEnd = 105.8494;

    function randomCoord(min, max) {
        return Math.random() * (max - min) + min;
    }
    const lat = randomCoord(latStart, latEnd);
    const lng = randomCoord(lngStart, lngEnd);

    const payload = { lat, lng };
    const response = await request.post(
    "https://dominos.vn/api/v1/stores/check-point",
    {
        data: payload,
    }
    );
    const json = await response.json(); 
    console.log(json);
    
});

test("Check voucher code", async ({ request }) => {
  const voucherCode = "fg";

  const payload = {
    order_details: [],
    customer_info: {
      phone: "",
      name: "",
      address: "1 Phố Phạm Huy Thông,Ngọc Khánh,Ba Đình,Hanoi,Vietnam",
      gender: 0
    },
    customer_tax_code: { phone: "" },
    promotions: [],
    total_amount: 0,
    discount: null,
    final_amount: 0,
    booking_date: null,
    order_type: 6,
    store_id: 1205,
    table: null,
    payments: [{ amount: 0, type: "1" }],
    return_url: "https://dominos.vn/successful-delivery?order_id=",
    lat: "21.02701960000000",
    lng: "105.82350280000000"
  };

  const response = await request.post(`https://dominos.vn/api/v1/promotions/vouchers?voucher-code=${voucherCode}`, {
    data: payload,
  });

  const json = await response.json();
  console.log(json);
});

test(`GET promotion`, async ({ request }) => {
    const res = await request.get(`https://dominos.vn/api/v1/promotions?promotion-code=D70PIZ10`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    console.log(`promotion`, body);
});

test("Check orer tracking", async ({ request }) => {
  const response = await request.post(`https://dominos.vn/api/v1/Orders/token?customer-info.phone=&customerPhone=&fields=checkindate&fields=OrderDetails&fields=payments&id=&token-id=0397825923`);
  const json = await response.json();
  console.log(json);
});






