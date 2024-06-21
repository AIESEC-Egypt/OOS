function APDsCount() {
  const oos_sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IGV Submissions");
  const apd_sheet = SpreadsheetApp.openById(
    "1_JbN517SC1tRVjeCOcz44rDLQMJhdGAEnLUC404ghSI"
  ).getSheetByName("IGV");
  let oos_idsss = oos_sheet
    .getRange(4, 9, oos_sheet.getLastRow() - 3, 1)
    .getValues();
  let apds_ids = apd_sheet
    .getRange(2, 1, apd_sheet.getLastRow(), 1)
    .getValues();
  let apds_status = apd_sheet
    .getRange(2, 3, apd_sheet.getLastRow(), 1)
    .getValues();

  for (let i = 0; i < oos_idsss.length; i++) {
    let count = 0;
    for (let j = 0; j < apds_ids.length; j++) {
      let apd_id = apds_ids[j][0].split("_")[1];
      if (apd_id == oos_idsss[i][0] && apds_status[i][0] != "approval_broken")
        count++;
    }
    oos_sheet.getRange(i + 4, 105, 1, 1).setValue(count);
    Logger.log(count);
  }
}
