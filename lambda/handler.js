const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./camera-rescue-a51eb6874b16.json');

const spreadsheet = new GoogleSpreadsheet('1A6iN6lsf2lEJ9nmtrQjmaC_MqSGvZRHdM2o4-xtiWO4'); // Sheet ID (visible in URL)

function getRepairShops(event, context, callback) {
  console.log('Contacting Google Sheets...');
  try {
    spreadsheet.useServiceAccountAuth(creds, () => spreadsheet.getInfo((sheetError, info) => {
      if (sheetError) {
        console.error(sheetError);
        return callback(sheetError);
      }

      const sheet = info.worksheets[0];

      const rowOptions = {
        limit: 1000,
        offset: 1,
        orderby: 'shopname',
      };

      return sheet.getRows(rowOptions, (rowsError, rows) => {
        if (rowsError) {
          console.log(rowsError);
          return callback(rowsError);
        }

        const items = rows;

        // Delete unnecessary keys from rows
        const keysToDelete = [
          '_xml',
          'id',
          'app:edited',
          '_links',
          'save',
          'del',
        ];

        // Loop through rows
        for (let i = 0; i < items.length; i += 1) {
          const thisRow = items[i];

          // Delete each unnecessary key from each row
          for (let j = 0; j < keysToDelete.length; j += 1) {
            delete thisRow[keysToDelete[j]];
          }
        }

        console.log('Everything went as expected');

        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(items),
        };

        console.log(response);
        console.log('Everything went as expected. Returning response.');

        return callback(null, response);
      });
    }));
  } catch (e) {
    console.log('Could not finish request', e);
    return callback(e);
  }
}

module.exports = {
  getRepairShops,
};
