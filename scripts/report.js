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

  const jsonText = fs.readFileSync("result.json", "utf-8");
  const result = JSON.parse(jsonText);

  if (!result.tests) {
    console.log("Result JSON:", result);
    return;
  }

  const rows = result.tests.map(t => [
    t.title || "N/A",
    t.outcome || t.status || "unknown",
    t.results?.[0]?.duration || "N/A",
    new Date().toLocaleString()
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!D:G",
    valueInputOption: "USER_ENTERED",
    resource: { values: rows },
  });

  console.log("Results successfully appended to Google Sheets!");
}

main().catch(err => {
  console.error(" Error in report.js:", err);
});
