import { google } from "googleapis";
import fs from "fs";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

async function appendToSheet(data) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [data],
    },
  });
}

// Example: read test results (Playwright JSON)
const results = JSON.parse(fs.readFileSync("playwright-report/results.json"));
const summary = {
  repo: process.env.GITHUB_REPOSITORY,
  branch: process.env.GITHUB_REF_NAME,
  commit: process.env.GITHUB_SHA.substring(0, 7),
  passed: results.suites[0].stats.passed,
  failed: results.suites[0].stats.failed,
  date: new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
};

appendToSheet([
  summary.repo,
  summary.branch,
  summary.commit,
  summary.passed,
  summary.failed,
  summary.date,
]).then(() => console.log("Report sent to Google Sheets"));
