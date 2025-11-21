const fs = require("fs");
const { google } = require("googleapis");

async function uploadZAPReport() {
  // Load your service account credentials
  const auth = new google.auth.GoogleAuth({
    keyFile: "./scripts/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const data = JSON.parse(fs.readFileSync("report_json.json", "utf8"));

  const rows = [];

  data.site.forEach(site => {
    site.alerts.forEach(alert => {
        alert.instances.forEach(instance => {
        rows.push({
            alertName: alert.name,
            risk: alert.riskdesc,
            url: instance.uri,
            method: instance.method,
            description: alert.desc,
            solution: alert.solution
        });
        });
    });
  });

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
