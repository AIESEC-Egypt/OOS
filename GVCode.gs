function updateOpportunityData_GV() {
  // Get the sheet of the IGV opportunities
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    `${gvSheet}`
  );
  const gvSlotsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    `${gvSlots}`
  );
  var gvIDs = gvSlotsSheet
    .getRange(
      gvSlotsHeaderRow + 1,
      1,
      gvSlotsSheet.getLastRow() - gvSlotsHeaderRow,
      1
    )
    .getValues();
  gvIDs = gvIDs.flat(1);
  var gvStatus = gvSlotsSheet
    .getRange(
      gvSlotsHeaderRow + 1,
      7,
      gvSlotsSheet.getLastRow() - gvSlotsHeaderRow,
      1
    )
    .getValues();
  gvStatus = gvStatus.flat(1);
  var gvOpenedDate = gvSlotsSheet
    .getRange(
      gvSlotsHeaderRow + 1,
      9,
      gvSlotsSheet.getLastRow() - gvSlotsHeaderRow,
      1
    )
    .getValues();
  gvOpenedDate = gvOpenedDate.flat(1);
  const opportunityData = sheet
    .getRange(
      gvHeaderRow + 1,
      1,
      sheet.getLastRow() - gvHeaderRow,
      sheet.getLastColumn()
    )
    .getValues();
  const lr = sheet.getLastRow() - gvHeaderRow;

  for (let i = 0; i < lr; i++) {
    console.log(i);
    try {
      var index = gvIDs.indexOf(
        parseInt(opportunityData[i][opportunity_id_column_GV - 1])
      );
      if (index < 0) {
        try {
          var response = UrlFetchApp.fetch(
            `https://gis-api.aiesec.org/v2/opportunities/${
              opportunityData[i][opportunity_id_column_GV - 1]
            }?access_token=${access_token}`
          );
          var recievedDate = JSON.parse(response.getContentText());
        } catch {
          throw wrong100;
        }
        if (recievedDate.openings == 0) {
          throw wrong200;
        }
      }
      var status = gvStatus[index];
      if (status == "open") {
        sheet
          .getRange(i + gvHeaderRow + 1, expa_status_column_GV)
          .setValue(status)
          .setFontColor("white")
          .setBackground("green");
      } else if (status == "un_publish") {
        sheet
          .getRange(i + gvHeaderRow + 1, expa_status_column_GV)
          .setValue(status)
          .setFontColor("black")
          .setBackground("yellow");
      } else if (status == "expired") {
        sheet
          .getRange(i + gvHeaderRow + 1, expa_status_column_GV)
          .setValue(status)
          .setFontColor("white")
          .setBackground("red");
      }
      var openedDate = gvOpenedDate[index];
      sheet
        .getRange(i + gvHeaderRow + 1, updated_at_column_GV)
        .setValue(openedDate);

      var response = UrlFetchApp.fetch(
        `https://gis-api.aiesec.org/v2/opportunities/${
          opportunityData[i][opportunity_id_column_GV - 1]
        }?access_token=${access_token}`
      );
      var recievedDate = JSON.parse(response.getContentText());

      if (recievedDate.opened_by != null) {
        sheet
          .getRange(i + gvHeaderRow + 1, opened_by_name_column_GV)
          .setValue(recievedDate.opened_by.full_name);
      } else {
        sheet
          .getRange(i + gvHeaderRow + 1, opened_by_name_column_GV)
          .setValue("-");
      }
      if (recievedDate.status == "open") {
        if (
          (opportunityData[i][closed_by_ecb_column_GV - 1] == "Close" &&
            opportunityData[i][audited_by_ecb_column_GV - 1] ==
              "Audited & Not Passed") ||
          opportunityData[i][audited_by_mc_column_GV - 1] != "Passed"
        ) {
          UrlFetchApp.fetch(
            `https://gis-api.aiesec.org/v2/opportunities/${
              opportunityData[i][opportunity_id_column_GV - 1]
            }?access_token=${access_token}`,
            options_delete
          );
          sheet
            .getRange(i + gvHeaderRow + 1, expa_status_column_GV)
            .setValue("removed")
            .setBackground("red")
            .setFontColor("white");

          let message = `Dear ${
            opportunityData[i][full_name_column_GV - 1]
          },\nYour Opportunity that has this ID ${
            opportunityData[i][opportunity_id_column_GV - 1]
          } got closed becuase it's not approved by ECB or MCVP as it doesn't meet opportunity opening guidelines.`;
          GmailApp.sendEmail(
            opportunityData[i][email_column_GV - 1],
            `Your Opportunity Got Closed - Opportunity ID: ${
              opportunityData[i][opportunity_id_column_GV - 1]
            }`,
            message,
            {
              body: message,
              cc: `${emails_for_the_GV_submissions}`,
              bcc: "a.ellithy@aiesec.org.eg",
            }
          );
          sheet
            .getRange(i + gvHeaderRow + 1, updated_at_column_GV)
            .setValue(recievedDate.updated_at.toString().substring(0, 10));
        }
      }
    } catch (e) {
      if (
        opportunityData[i][wrong_opp_id_colum_GV - 1] != true &&
        e == wrong100
      ) {
        let message = `Dear ${
          opportunityData[i][full_name_column_GV - 1]
        },\nYou have entered a wrong opportunity ID in Opportunities Openning System V2 Form which its role title is ${
          opportunityData[i][contract_type_GV - 1]
        } with this partner ${organization_name_GV}. PLEASE UPDATE it with the right one!`;

        GmailApp.sendEmail(
          opportunityData[i][email_column_GV - 1],
          "Wrong Submission In Opportunities Openning System Form",
          message,
          {
            body: message,
            cc: `${emails_for_the_GV_submissions}`,
          }
        );
        sheet
          .getRange(i + gvHeaderRow + 1, wrong_opp_id_colum_GV)
          .setValue(true);
        sheet
          .getRange(i + gvHeaderRow + 1, expa_status_column_GV)
          .setValue(wrong100)
          .setBackground("red")
          .setFontColor("white");
      } else if (e == wrong200) {
        sheet
          .getRange(i + gvHeaderRow + 1, wrong_opp_id_colum_GV)
          .setValue(true);
        sheet
          .getRange(i + gvHeaderRow + 1, expa_status_column_GV)
          .setValue(wrong200)
          .setBackground("yellow")
          .setFontColor("black");
      }
    }
  }
}
