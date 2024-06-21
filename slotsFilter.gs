function slotsFilterIGV() {
  let months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };
  let IGV_sheet1 = SpreadsheetApp.openById(
    "1eyp_vRSb7wxTmd8_RBGHzw41xdsAlceNx7yBw986qgU"
  ).getSheetByName("iGV");
  let slots_list = IGV_sheet1.getRange(
    3,
    1,
    IGV_sheet1.getLastRow(),
    IGV_sheet1.getLastColumn()
  ).getValues();
  let new_IGV_sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("iGV Slots Arranged");

  slots_list.sort();

  // the two pointers technique to group all the slots together and get the one with the maximum date
  let oppIDs = new_IGV_sheet
    .getRange(3, 1, new_IGV_sheet.getLastRow(), 1)
    .getValues()
    .flat();
  Logger.log(oppIDs);
  let final_list = [];
  let found_list = [];
  let i = 0,
    j = 0;
  while (j < slots_list.length) {
    while (j < slots_list.length && slots_list[i][0] == slots_list[j][0]) {
      j++;
    }
    let max_value = slots_list[i];
    for (let k = i + 1; k < j; k++) {
      let date1 = new Date(slots_list[k][14]).toUTCString().split(" ");
      let date2 = new Date(max_value[14]).toUTCString().split(" ");
      date1 = `${date1[1]}/${months[date1[2]]}/${date1[3]}`;
      date2 = `${date2[1]}/${months[date2[2]]}/${date2[3]}`;
      if (date1 >= date2) max_value = slots_list[k];
    }
    let index = oppIDs.indexOf(max_value[0]);
    if (index < 0) {
      final_list.push(max_value);
    } else {
      for (let k = 1; k < max_value.length; k++) {
        new_IGV_sheet.getRange(index + 1, k, 1, 1).setValue(max_value[k - 1]);
      }
    }
    i = j;
  }

  for (let i = 0; i < final_list.length; i++) {
    let lrow = new_IGV_sheet.getLastRow();
    for (let k = 1; k < final_list[i].length; k++) {
      new_IGV_sheet.getRange(lrow + 1, k, 1, 1).setValue(final_list[i][k - 1]);
    }
  }
}
