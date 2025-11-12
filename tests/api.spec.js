import { test, expect } from '@playwright/test';

test( 'GET session token from API', async ( { page,request} ) => {
    test.setTimeout(60000);
    const response = await page.goto( 'https://vbee.vn')
    await response.waitForLoadState('networkidle');
    expect(response?.status()).toBe(200);
    const signin = await page.getByRole('button', { name: 'Đăng nhập' }); // role='button', id='Login-button'
    await signin.waitFor({ state: 'visible', timeout: 10000 });
    const click = await signin.click();
    console.log(page.url());
    await page.waitForNavigation();
    console.log(page.url());
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

    // Assertions
    expect(response1.status()).toBe(200);
    const body = await response1.json();
    console.log(body.result.redirect_uri);
    await page.goto(body.result.redirect_uri);
    await page.waitForLoadState('networkidle');

})