'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./camera-rescue-a51eb6874b16.json');

const spreadsheet = new GoogleSpreadsheet('1A6iN6lsf2lEJ9nmtrQjmaC_MqSGvZRHdM2o4-xtiWO4'); // Sheet ID (visible in URL)

exports.handler = (event, context, callback) => {
  spreadsheet.useServiceAccountAuth(creds, () => {
    return spreadsheet.getInfo((sheetError, info) => {
      if (sheetError) {
        console.error(sheetError);

        return callback(sheetError);
      }

      const sheet = info.worksheets[0];

      const rowOptions = {
        limit: 1000,
        offset: 1,
        orderby: 'shopname'
      }

      return sheet.getRows(rowOptions, (rowsError, rows) => {
        if (rowsError) {
          console.error(rowsError);

          return callback(rowsError);
        } 

        let items = rows;

        // Delete unnecessary keys from rows
        const keysToDelete = [
          '_xml',
          'id',
          'app:edited',
          '_links',
          'save',
          'del',
        ]

        // Loop through rows
        for (let i = 0; i < items.length; i++) {
          let thisRow = items[i];

          // Delete each unnecessary key from each row
          for (let j = 0; j < keysToDelete.length; j++) {
            delete thisRow[keysToDelete[j]];
          }
        }

        return callback(null, items);
      });
    });
  });
};