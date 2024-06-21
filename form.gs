/*function fillFormDropDownList() {
  var sheet = SpreadsheetApp.openById(ssID).getSheetByName(`${partnerSheetName}`)
  var values = sheet.getRange(2,1,sheet.getLastRow()-1,1).getValues()
  values= values.flat(1)
  var igvForm = FormApp.openById(igvFormID)
  var igtForm = FormApp.openById(igtFormID)
  var igvItem = igvForm.getItemById(igvPartnerFormIteamID)
  var igtIteam = igtForm.getItemById(igtPartnerFormIteamID)
  igvItem.asListItem().setChoiceValues(values)
  igtIteam.asListItem().setChoiceValues(values)
}
*/
