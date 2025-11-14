const fs = require("fs");
const { google } = require("googleapis");

async function main() {
  // Authenticate with Google Sheets
  const auth = new google.auth.GoogleAuth({
    keyFile: "./scripts/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1IVdSe8Gcal4gkLYMv-_MlVFKoiZqC73ukN6X8vFduKA";

  // Read Playwright JSON result
  const jsonText = fs.readFileSync("resultLogin.json", "utf-8");
  const result = JSON.parse(jsonText);

  // 🧩 Playwright JSON reporters store tests under `suites`
  // Let's flatten all test entries from nested suites
  const allTests = [];
  function collectTests(suite) {
    if (suite.suites) suite.suites.forEach(collectTests);
    if (suite.specs)
      suite.specs.forEach(spec => {
        allTests.push({
          title: spec.title,
          status: spec.ok ? "passed" : "failed",
          duration: spec.tests?.[0]?.results?.[0]?.duration || "N/A",
        });
      });
  }
  collectTests(result);

  // Prepare rows
  const rows = allTests.map(t => [t.title, t.status, t.duration, new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })]);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet2!D2",
    valueInputOption: "USER_ENTERED",
    resource: { values: rows },
  });

  console.log("Results successfully appended to Google Sheets!");
}

main().catch(err => {
  console.error("Error in report.js:", err);
});
