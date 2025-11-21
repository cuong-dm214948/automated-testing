const fs = require("fs");
const { google } = require("googleapis");

async function uploadZAPReport() {
  // Load your service account credentials
  const auth = new google.auth.GoogleAuth({
    keyFile: "./scripts/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Load ZAP JSON report
  const report = JSON.parse(fs.readFileSync("report_json.json", "utf8"));

  // Extract relevant info (alerts)
  const rows = report.site.flatMap(site =>
    site.alerts.map(alert => [
      site.name,
      alert.name,
      alert.risk,
      alert.url,
      alert.param,
      alert.evidence,
    ])
  );

  const spreadsheetId = "1IVdSe8Gcal4gkLYMv-_MlVFKoiZqC73ukN6X8vFduKA";
  const range = "Zap!A1";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    resource: { values: rows },
  });

  console.log("Report uploaded to Google Sheets successfully!");
}

uploadZAPReport().catch(console.error);
