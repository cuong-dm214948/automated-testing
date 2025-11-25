const fs = require("fs");
const { google } = require("googleapis");

async function uploadZAPReport() {
  // Load your service account credentials
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const zapReport = JSON.parse(fs.readFileSync("report_json.json", "utf8"));

  const data = [
    ['Program Name', zapReport['@programName'] || ''],
    ['Version', zapReport['@version'] || ''],
    ['Generated', zapReport['@generated'] || ''],
    ['Site Name', zapReport.site?.[0]['@name'] || ''],
    ['Port', zapReport.site?.[0]['@port'] || '']
  ];

   const alertData = zapReport.site?.[0]?.alerts?.map(alert => {
    const instance = alert.instances?.[0] || {};
    return [
      alert.name || '',
      alert.riskdesc || '',
      instance.uri || '',
      instance.method || ''
    ];
  }) || [];

  const spreadsheetId = "1IVdSe8Gcal4gkLYMv-_MlVFKoiZqC73ukN6X8vFduKA";

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Zap!A2:B6",
    valueInputOption: "RAW",
    resource: { values: data },
  });

    await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Zap!D2",
    valueInputOption: "RAW",
    resource: { values: alertData },
  });

  console.log("Report uploaded to Google Sheets successfully!");
}

uploadZAPReport().catch(console.error);
