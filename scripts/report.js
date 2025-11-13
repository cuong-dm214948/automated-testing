const { google } = require("googleapis");
const fs = require("fs");

async function main() {

  const auth = new google.auth.GoogleAuth({
    keyFile: "./scripts/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1IVdSe8Gcal4gkLYMv-_MlVFKoiZqC73ukN6X8vFduKA";// store in .env

  // Read Playwright JSON result
  const result = JSON.parse(fs.readFileSync("result.json", "utf-8"));
  console.log(resolve.json);
  console.log(result);
  const rows = result.tests.map(t => [t.title, t.status, t.duration]);

  // Append to sheet
  await googleSheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    resource: { values: rows },
  });

  console.log("Test results appended to Google Sheets!");
}

main().catch(console.error);
