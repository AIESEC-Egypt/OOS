function updateOpportunityData_GT() {
  // Get the sheet of the Igt opportunities
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    `${gtSheet}`
  );
  const gtSlotsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    `${gtSlots}`
  );
  var gtIDs = gtSlotsSheet
    .getRange(
      gtSlotsHeaderRow + 1,
      1,
      gtSlotsSheet.getLastRow() - gtSlotsHeaderRow,
      1
    )
    .getValues();
  gtIDs = gtIDs.flat(1);
  var gtStatus = gtSlotsSheet
    .getRange(
      gtSlotsHeaderRow + 1,
      8,
      gtSlotsSheet.getLastRow() - gtSlotsHeaderRow,
      1
    )
    .getValues();
  gtStatus = gtStatus.flat(1);
  var gtOpenedDate = gtSlotsSheet
    .getRange(
      gtSlotsHeaderRow + 1,
      10,
      gtSlotsSheet.getLastRow() - gtSlotsHeaderRow,
      1
    )
    .getValues();
  gtOpenedDate = gtOpenedDate.flat(1);
  const opportunityData = sheet
    .getRange(
      gtHeaderRow + 1,
      1,
      sheet.getLastRow() - gtHeaderRow,
      sheet.getLastColumn()
    )
    .getValues();
  const lr = sheet.getLastRow() - gtHeaderRow;

  for (let i = 0; i < lr; i++) {
    console.log(i);
    try {
      var index = gtIDs.indexOf(
        parseInt(opportunityData[i][opportunity_id_column_GT - 1])
      );
      if (index < 0) {
        try {
          var response = UrlFetchApp.fetch(
            `https://gis-api.aiesec.org/v2/opportunities/${
              opportunityData[i][opportunity_id_column_GT - 1]
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
      var status = gtStatus[index];
      if (status == "open") {
        sheet
          .getRange(i + gtHeaderRow + 1, expa_status_column_GT)
          .setValue(status)
          .setFontColor("white")
          .setBackground("green");
      } else if (status == "un_publish") {
        sheet
          .getRange(i + gtHeaderRow + 1, expa_status_column_GT)
          .setValue(status)
          .setFontColor("black")
          .setBackground("yellow");
      } else if (status == "expired") {
        sheet
          .getRange(i + gtHeaderRow + 1, expa_status_column_GT)
          .setValue(status)
          .setFontColor("white")
          .setBackground("red");
      }
      var openedDate = gtOpenedDate[index];
      sheet
        .getRange(i + gtHeaderRow + 1, updated_at_column_GT)
        .setValue(openedDate);

      var response = UrlFetchApp.fetch(
        `https://gis-api.aiesec.org/v2/opportunities/${
          opportunityData[i][opportunity_id_column_GT - 1]
        }?access_token=${access_token}`
      );
      var recievedDate = JSON.parse(response.getContentText());

      if (recievedDate.opened_by != null) {
        sheet
          .getRange(i + gtHeaderRow + 1, opened_by_name_column_GT)
          .setValue(recievedDate.opened_by.full_name);
      } else {
        sheet
          .getRange(i + gtHeaderRow + 1, opened_by_name_column_GT)
          .setValue("-");
      }
      if (recievedDate.status == "open") {
        if (
          (opportunityData[i][closed_by_ecb_column_GT - 1] == "Close" &&
            opportunityData[i][audited_by_ecb_column_GT - 1] ==
              "Audited & Not Passed") ||
          opportunityData[i][audited_by_mc_column_GT - 1] != "Passed"
        ) {
          UrlFetchApp.fetch(
            `https://gis-api.aiesec.org/v2/opportunities/${
              opportunityData[i][opportunity_id_column_GT - 1]
            }?access_token=${access_token}`,
            options_delete
          );
          sheet
            .getRange(i + gtHeaderRow + 1, expa_status_column_GT)
            .setValue("removed")
            .setBackground("red")
            .setFontColor("white");

          let message = `Dear ${
            opportunityData[i][full_name_column_GT - 1]
          },\nYour Opportunity that has this ID ${
            opportunityData[i][opportunity_id_column_GT - 1]
          } got closed becuase it's not approved by ECB or MCVP as it doesn't meet opportunity opening guidelines.`;
          GmailApp.sendEmail(
            opportunityData[i][email_column_GT - 1],
            `Your Opportunity Got Closed - Opportunity ID: ${
              opportunityData[i][opportunity_id_column_GT - 1]
            }`,
            message,
            {
              body: message,
              cc: `${emails_for_the_GT_submissions}`,
              bcc: "a.ellithy@aiesec.org.eg",
            }
          );
          sheet
            .getRange(i + gtHeaderRow + 1, updated_at_column_GT)
            .setValue(recievedDate.updated_at.toString().substring(0, 10));
        }
      }
    } catch (e) {
      if (
        opportunityData[i][wrong_opp_id_colum_GT - 1] != true &&
        e == wrong100
      ) {
        let message = `Dear ${
          opportunityData[i][full_name_column_GT - 1]
        },\nYou have entered a wrong opportunity ID in Opportunities Openning System V2 Form which its role title is ${
          opportunityData[i][contract_type_GT - 1]
        } with this partner ${organization_name_GT}. PLEASE UPDATE it with the right one!`;

        GmailApp.sendEmail(
          opportunityData[i][email_column_GT - 1],
          "Wrong Submission In Opportunities Openning System Form",
          message,
          {
            body: message,
            cc: `${emails_for_the_GT_submissions}`,
          }
        );
        sheet
          .getRange(i + gtHeaderRow + 1, wrong_opp_id_colum_GT)
          .setValue(true);
        sheet
          .getRange(i + gtHeaderRow + 1, expa_status_column_GT)
          .setValue(wrong100)
          .setBackground("red")
          .setFontColor("white");
      } else if (e == wrong200) {
        sheet
          .getRange(i + gtHeaderRow + 1, wrong_opp_id_colum_GT)
          .setValue(true);
        sheet
          .getRange(i + gtHeaderRow + 1, expa_status_column_GT)
          .setValue(wrong200)
          .setBackground("yellow")
          .setFontColor("black");
      }
    }
  }
}
