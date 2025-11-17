const fs = require("fs");
const { google } = require("googleapis");

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./scripts/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1IVdSe8Gcal4gkLYMv-_MlVFKoiZqC73ukN6X8vFduKA";

  const jsonText = fs.readFileSync("resultForm.json", "utf-8");
  const result = JSON.parse(jsonText);

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

  const rows = allTests.map(t => [t.title, t.status, t.duration, new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })]);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!D:G",
    valueInputOption: "USER_ENTERED",
    resource: { values: rows },
  });

  console.log("Results successfully appended to Google Sheets!");
}

main().catch(err => {
  console.error("Error in reportForm.js:", err);
});
