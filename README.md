# Playwright TypeScript Web Automation

[![Playwright](https://img.shields.io/badge/Playwright-1.51%2B-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-E2E%20Testing-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Bộ kiểm thử end-to-end tự động sử dụng **Playwright**, **TypeScript** và mô hình **Page Object Model (POM)**. Dự án bao gồm các luồng đăng nhập, mua hàng và những bài thực hành giao diện web như bảng dữ liệu, date picker, cuộn vô hạn và tab/window.

## ✨ Tính năng

- Tổ chức page object và test fixture để tái sử dụng thao tác trên trang.
- Chạy test trên Chromium/Chrome và Firefox.
- Chọn môi trường chạy `dev`, `uat` hoặc `stage` qua biến `TEST_ENV`.
- Hỗ trợ lọc test theo file, tag và browser.
- Tự động lưu screenshot khi test lỗi, video khi test thất bại và trace ở lần retry đầu tiên.
- Tạo báo cáo HTML bằng Playwright.

## 🧪 Phạm vi kiểm thử

| Nhóm | Nội dung |
| --- | --- |
| Login | Đăng nhập hợp lệ, đăng xuất, thông tin không hợp lệ và kiểm tra dữ liệu biên |
| Inventory & Shopping | Sắp xếp sản phẩm, thêm hàng vào giỏ và kiểm tra luồng đặt hàng |
| About | Điều hướng, nội dung, cuộn trang và yêu cầu demo |
| Data table | Kiểm tra header, validation, sửa và xóa sách |
| Data picker | Kiểm tra chọn ngày |
| Infinite scroll | Kiểm tra nội dung tải thêm khi cuộn |
| Tabs & windows | Kiểm tra tab và cửa sổ mới |

## 🧰 Công nghệ

- [Playwright Test](https://playwright.dev/docs/test-intro)
- TypeScript
- Node.js và npm
- dotenv để nạp cấu hình môi trường

## 🚀 Bắt đầu

### Yêu cầu

- Node.js và npm
- Tài khoản kiểm thử phù hợp với website mục tiêu

### Cài đặt

```bash
npm install
npx playwright install
```

### Cấu hình môi trường

Tạo file môi trường cần dùng trong thư mục dự án. Cấu hình URL trong `.env.<môi-trường>`:

```dotenv
BASE_URL=<URL-của-môi-trường>
```

Mật khẩu được đọc từ `PASSWORD` trong file bí mật tương ứng, ví dụ `.env.dev.secret`:

```dotenv
PASSWORD=<mật-khẩu-kiểm-thử>
```

Các script `test:dev`, `test:uat` và `test:stage` chọn môi trường tương ứng. Không đưa mật khẩu hoặc thông tin đăng nhập thật lên Git; các file `.env` và `*.secret` đã được cấu hình trong `.gitignore`.

## ▶️ Chạy kiểm thử

```bash
# Chạy toàn bộ test trên môi trường dev
npm run test:dev

# Chạy test trên môi trường uat hoặc stage
npm run test:uat
npm run test:stage

# Chạy một file test cụ thể
npm run test:dev -- src/tests/login/login.test.ts

# Chạy theo tag
npm run test:dev -- --grep "@smoke"

# Chạy có giao diện trình duyệt
npm run test:dev -- --headed

# Chạy trên một browser
npm run test:dev -- --project=chrome
npm run test:dev -- --project=firefox
```

Một số lệnh chạy nhanh đã có sẵn:

```bash
npm run test:smoke
npm run test:regression
npm run test:data-table
npm run test:tabs-window
npm run test:infinitive-scroll
```

## 📊 Báo cáo

Sau khi chạy test, mở báo cáo HTML bằng:

```bash
npm run report
```

Playwright lưu báo cáo trong `playwright-report/` và kết quả test trong `test-results/`.

## 📁 Cấu trúc dự án

```text
.
├── specs/                  # Tài liệu và test plan
├── src/
│   ├── config/             # Cấu hình môi trường
│   ├── data/               # Dữ liệu test
│   ├── fixtures/           # Playwright fixtures dùng chung
│   ├── pages/              # Page Object Model
│   └── tests/              # Các bài kiểm thử theo tính năng
├── utility/                # Global setup
├── playwright.config.ts    # Cấu hình Playwright và browser projects
├── tsconfig.json
└── package.json            # Dependencies và npm scripts
```

## 📄 Giấy phép

Dự án được phát hành theo [MIT License](./LICENSE).
