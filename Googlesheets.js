const { GoogleSpreadsheet } = require('google-spreadsheet');
const {promisify} = require('util');
const config = require('./src/config/main.json')

const creds = require('./client_secret.json');

async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet(`${config.GoogleSheets.SheetID}`);
    await promisify(doc.useServiceAccountAuth(creds));

    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheet[1];
    console.log(`title: ${sheet.title}, Rows: ${sheet.rowCount}`);
}

accessSpreadsheet();