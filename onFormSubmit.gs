function checkReferenceID_GV() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    `${gvSheet}`
  );
  const lastRowData = sheet
    .getRange(sheet.getLastRow(), 1, 1, sheet.getLastColumn())
    .getValues();
  const contractSystem = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    `${contractSystem_GV}`
  );

  var referenceID = lastRowData[0][referenceIDColumn - 1];
  var index = contractSystem
    .createTextFinder(`${referenceID}`)
    .matchEntireCell(true)
    .findAll()
    .map((x) => x.getRow());

  if (index.length > 0) {
    var rowDate = contractSystem
      .getRange(index[0], 1, 1, contractSystem.getLastColumn())
      .getValues();
    sheet
      .getRange(
        sheet.getLastRow(),
        startContractSystemDateColumn_GV,
        1,
        rowDate[0].length
      )
      .setValues(rowDate);
  } else {
    let message = `Dear ${
      lastRowData[0][full_name_column_GV - 1]
    },\nYour Opportunity that has this ID ${
      lastRowData[0][opportunity_id_column_GV - 1]
    } got closed becuase it doesn't have a generated contract or you entered a wrong reference ID.`;
    GmailApp.sendEmail(
      lastRowData[0][email_column_GV - 1],
      `Your Opportunity Got Closed - Opportunity ID: ${
        lastRowData[0][opportunity_id_column_GV - 1]
      }`,
      message,
      {
        body: message,
        cc: `${emails_for_the_GV_submissions}`,
        bcc: "a.ellithy@aiesec.org.eg",
      }
    );
  }
}

function checkReferenceID_GT() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    `${gtSheet}`
  );
  const lastRowData = sheet
    .getRange(sheet.getLastRow(), 1, 1, sheet.getLastColumn())
    .getValues();
  const contractSystem = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    `${contractSystem_GT}`
  );

  var referenceID = lastRowData[0][referenceIDColumn - 1];
  var index = contractSystem
    .createTextFinder(`${referenceID}`)
    .matchEntireCell(true)
    .findAll()
    .map((x) => x.getRow());

  if (index.length > 0) {
    var rowDate = contractSystem
      .getRange(index[0], 1, 1, contractSystem.getLastColumn())
      .getValues();
    sheet
      .getRange(
        sheet.getLastRow(),
        startContractSystemDateColumn_GT,
        1,
        rowDate[0].length
      )
      .setValues(rowDate);
  } else {
    let message = `Dear ${
      lastRowData[0][full_name_column_GT - 1]
    },\nYour Opportunity that has this ID ${
      lastRowData[0][opportunity_id_column_GT - 1]
    } got closed becuase it doesn't have a generated contract or you entered a wrong reference ID.`;
    GmailApp.sendEmail(
      lastRowData[0][email_column_GT - 1],
      `Your Opportunity Got Closed - Opportunity ID: ${
        lastRowData[0][opportunity_id_column_GT - 1]
      }`,
      message,
      {
        body: message,
        cc: `${emails_for_the_GT_submissions}`,
        bcc: "a.ellithy@aiesec.org.eg",
      }
    );
  }
}
