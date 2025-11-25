### Tools & Technologies
* Node JS
* VS Code (IDE)
* JavaScript

### To use this project

**`npm ci`**	

// this will download and install all required libraries mentioned in package.json file (ci is used to install all exact version dependencies or devDependencies from a package-lock. json file)

**`npx playwright test`**		

// this will run the tests

### Tutorial Steps - Playwright Page Object Model Project

* Step 1 - Create a new folder and open in IDE or Editor (like VS Code)
* Step 2 - Initialize a new Node.js project by running **`npm init -y`** to create a package.json file
* Step 3 - Install & Setup Playwright by running **`npm init playwright@latest`**
* Step 4 - Auto Test Generator to record **`npx playwright codegen`** --help for more detail
* Step 5 - Run all tests on all browsers in headless mode - **`npx playwright test`**
         - Run with 3 workers in parallel  - **`npx playwright test --workers 3`**
         - Run test only on chrome - **`npx playwright test --project=chromium`**
         - Run test in headed mode - **`npx playwright test --headed`**
         - check results - **`npx playwright show-report`**
         - Run test in specific file - **`npx playwright test example.spec.js`**
         - Run test in filename have one or two - **`npx playwright test one two`**
         - Run test debug mode - **`npx playwright test --debug`**
* Step 6 - Create new folder "pages" in your project, this will contain all page objects
* Step 7 - Create a new file and class for each page e.g. login.js and LoginPage
* Step 8 - In the class create element locators & action methods for login page
* Step 9 - In test file, import the page class, create instance of it, & use methods from LoginPage class
* Step 10 - Run the test **`npx playwright test`** and check results

"register":{"title":"Tạo Tài Khoản","fullName":"Họ Và Tên Của Bạn","lastName":"Họ","firstName":"Tên","phone":"Số Điện Thoại","email":"Email","password":"Mật Khẩu","birth":"Ngày Sinh","confirmPassword":"Xác Nhận Mật Khẩu","placeholderFullName":"Nhập Họ Và Tên Của Bạn","placeholderLastName":"Nhập Họ Của Bạn","placeholderFirstName":"Nhập Tên Của Bạn","placeholderPhone":"Nhập Số Điện Thoại Của Bạn","placeholderEmail":"Nhập Email Của Bạn","placeholderPass":"Nhập Mật Khẩu Của Bạn","placeholderConfirmPass":"Xác Nhận Mật Khẩu Của Bạn","noExistEmail":"Email Không Tồn Tại!","requiredEmail":"Vui Lòng Nhập Địa Chỉ Email!","requiredBirth":"Vui Lòng Nhập Ngày Sinh","requiredGender":"Vui Lòng Chọn Giới Tính","invalidDate":"Vui Lòng Nhập Ngày Trước Ngày Hiện Tại","registerBtn":"Tạo Tài Khoản","update":"Cập Nhật","successRegister":"Đăng Ký Thành Công","errorRegister":"Đăng Ký Không Thành Công","noti":"Vui Lòng Đăng Nhập Để Truy Cập Vào Tài Khoản Của Bạn","PasswordRequiresNonAlphanumeric":"Mật Khẩu Phải Bao Gồm Ký Tự Chữ Và Số","PasswordRequiresLower":"Mật Khẩu Phải Bao Gồm Ký Tự In Thường","PasswordRequiresUpper":"Mật Khẩu Phải Bao Gồm Ký Tự In Hoa","resend":"Gửi lại","notiEmail":"Vui Lòng Nhập Email Đang Sử Dụng Để Nhận Thông Tin Điểm Thưởng Và Chương Trình Thành Viên Từ Domino's","otpExpire":"Mã OTP Sẽ Hết Hạn Sau","seconds":"Giây","gender":"Giới Tính","male":"Nam","female":"Nữ","undefined":"Chưa Xác Định"

"formLogin":{"inputUsername":"Vui Lòng Nhập Tên Đăng Nhập!","ruleEmail":"Email Không Hợp Lệ!","rulePhone":"Số Điện Thoại Không Hợp Lệ!","inputPassword":"Vui Lòng Nhập Mật Khẩu!","inputEmail":"Vui Lòng Nhập Địa Chỉ Email Của Bạn!","inputPhoneNumber":"Vui Lòng Nhập Số Điện Thoại!","inputOTP":"Vui Lòng Nhập Mã OTP!"},"formRegister":{"inputFullname":"Vui Lòng Nhập Họ Và Tên Của Bạn!","inputLastname":"Vui Lòng Nhập Họ Của Bạn!","inputFirstname":"Vui Lòng Nhập Tên Của Bạn!","inputPhone":"Vui Lòng Nhập Số Điện Thoại Của Bạn!","isValidPhone":"Số Điện Thoại Không Tồn Tại!","inputEmail":"Vui Lòng Nhập Địa Chỉ Email Của Bạn!","ruleEmail":"Email Không Hợp Lệ!","inputPassword":"Vui Lòng Nhập Mật Khẩu Của Bạn!","rulePassword":"Mật Khẩu Ít Nhất Là 6 Kí Tự Gồm Chữ Hoa, Chữ Thường, Số Và Kí Tự Đặc Biệt!","inputConfirmPass":"Vui Lòng Nhập Lại Mật Khẩu Của Bạn!","matchPassword":"Mật Khẩu Không Trùng Khớp!"},"formProductFinish":{"inputUsername":"Vui Lòng Nhập Tên Đăng Nhập!","inputPhone":"Vui Lòng Nhập Số Điện Thoại!","rulePhone":"Số Điện Thoại Phải Là Số!","rulePhone2":"Số Điện Thoại Bắt Đầu Phải Là Số 0","lenghPhone":"Độ Dài Số Điện Thoại Hợp Lệ Là 10 Số!","inputEmail":"Vui Lòng Nhập Địa Chỉ Email!","ruleEmail":"Email Không Tồn Tại!","bookingDate":"Thời Gian Đặt Hàng Không Hợp Lệ"}},


"changePass":{"updateSuccess":"Cập Nhật Mật Khẩu Thành Công","errorValidate1":"Mật Khẩu Ít Nhất Là 6 Kí Tự Gồm Chữ Hoa, Chữ Thường, Số Và Kí Tự Đặc Biệt!","errorValidate2":"Mật Khẩu Không Trùng Khớp","errorValidate3":"Vui Lòng Nhập Mật Khẩu Mới","errorValidate4":"Vui Lòng Nhập Mật Khẩu Hiện Tại"

voucher-default":"notFound":"Không Tìm Thấy Mã Khuyễn Mãi!","existedVoucher":"Voucher Này Đã Có Sẵn Trong Giỏ Hàng"


"tracking":{"prepare":"Đang Chuẩn Bị","bake":"Đang Nướng Bánh","pack":"Đang Đóng Gói","delivery":"Đang Giao Hàng","takeAway":"Chờ Bạn Đến Lấy","success":"Thành Công","failed":"Thất Bại","cancel":"Đã Hủy"},



GET /api/v1/users/info HTTP/2
Host: dominos.vn
Cookie: _gcl_au=1.1.360379483.1761700787; _tt_enable_cookie=1; _ttp=01K8PRSH2TGRDP6VSMMQERC8Y5_.tt.1; _fbp=fb.1.1761700791584.280769700875541723; _gid=GA1.2.1762800957.1763952798; ttcsid_D0SIAGJC77UBTE66MUC0=1763952798268::b9GzbKaJrd2gSQQsjp1o.11.1763954824026.0; ttcsid=1763952798271::hxlNpQRaTU7o2mn_YYn_.11.1763954824026.0; domino_access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMmM3MDJjYi02NTFjLTRlNmEtODQ2ZC05NmQwMWU3NzVkNjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE4NzAzMjQiLCJVc2VySWQiOiJkYjRmYjI2OS1iNDVmLTQ1OWYtYTQwZC1mNzQ4YjU1MTYyNWEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDdXN0b21lciIsImV4cCI6MTc2NjU0NjgyNCwiaXNzIjoiaHR0cHM6Ly9hdXRoLnZmYnMudm4iLCJhdWQiOiJodHRwczovL2F1dGgudmZicy52biJ9.Ops8QbVr82aJOYrS6r0NqNrE1DWIfbaV38X8fPzgPlE; _ga=GA1.2.987146880.1761700787; _gat_UA-41910789-1=1; _ga_12HB7KTL5M=GS2.1.s1763952792$o12$g1$t1763954825$j59$l0$h1740174913; _ga_8GXKYDTW3R=GS2.1.s1763952796$o12$g1$t1763954825$j59$l0$h0
Sec-Ch-Ua-Platform: "Windows"
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMmM3MDJjYi02NTFjLTRlNmEtODQ2ZC05NmQwMWU3NzVkNjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE4NzAzMjQiLCJVc2VySWQiOiJkYjRmYjI2OS1iNDVmLTQ1OWYtYTQwZC1mNzQ4YjU1MTYyNWEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDdXN0b21lciIsImV4cCI6MTc2NjU0NjgyNCwiaXNzIjoiaHR0cHM6Ly9hdXRoLnZmYnMudm4iLCJhdWQiOiJodHRwczovL2F1dGgudmZicy52biJ9.Ops8QbVr82aJOYrS6r0NqNrE1DWIfbaV38X8fPzgPlE


POST /api/v1/users/change-password HTTP/2
Host: dominos.vn
Cookie: _gcl_au=1.1.360379483.1761700787; _tt_enable_cookie=1; _ttp=01K8PRSH2TGRDP6VSMMQERC8Y5_.tt.1; _fbp=fb.1.1761700791584.280769700875541723; _gid=GA1.2.1762800957.1763952798; domino_access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMmM3MDJjYi02NTFjLTRlNmEtODQ2ZC05NmQwMWU3NzVkNjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE4NzAzMjQiLCJVc2VySWQiOiJkYjRmYjI2OS1iNDVmLTQ1OWYtYTQwZC1mNzQ4YjU1MTYyNWEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDdXN0b21lciIsImV4cCI6MTc2NjU0NjgyNCwiaXNzIjoiaHR0cHM6Ly9hdXRoLnZmYnMudm4iLCJhdWQiOiJodHRwczovL2F1dGgudmZicy52biJ9.Ops8QbVr82aJOYrS6r0NqNrE1DWIfbaV38X8fPzgPlE; _ga=GA1.2.987146880.1761700787; ttcsid_D0SIAGJC77UBTE66MUC0=1763952798268::b9GzbKaJrd2gSQQsjp1o.11.1763954936276.0; ttcsid=1763952798271::hxlNpQRaTU7o2mn_YYn_.11.1763954936276.0; _ga_12HB7KTL5M=GS2.1.s1763952792$o12$g1$t1763954937$j60$l0$h1740174913; _ga_8GXKYDTW3R=GS2.1.s1763952796$o12$g1$t1763954937$j60$l0$h0
Content-Length: 84
Sec-Ch-Ua-Platform: "Windows"
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMmM3MDJjYi02NTFjLTRlNmEtODQ2ZC05NmQwMWU3NzVkNjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE4NzAzMjQiLCJVc2VySWQiOiJkYjRmYjI2OS1iNDVmLTQ1OWYtYTQwZC1mNzQ4YjU1MTYyNWEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDdXN0b21lciIsImV4cCI6MTc2NjU0NjgyNCwiaXNzIjoiaHR0cHM6Ly9hdXRoLnZmYnMudm4iLCJhdWQiOiJodHRwczovL2F1dGgudmZicy52biJ9.Ops8QbVr82aJOYrS6r0NqNrE1DWIfbaV38X8fPzgPlE
Accept-Language: vi
Sec-Ch-Ua: "Not_A Brand";v="99", "Chromium";v="142"
Sec-Ch-Ua-Mobile: ?0
Secret: VmZic0AjQEtpbGxCaXR0bw==
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36
Accept: application/json, text/plain, */*
Content-Type: application/json
Origin: https://dominos.vn
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://dominos.vn/account-info/change-password
Accept-Encoding: gzip, deflate, br
Priority: u=1, i

{"password":"1","new_password":"Createverify3)","confirm_password":"Createverify3)"}



payemtn , product finish, checout [point
]


voucher e voucher