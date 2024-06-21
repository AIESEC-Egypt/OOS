const partnerSheetName = "Partners";
const igvPartnerFormIteamID = 1688195521;
const igtPartnerFormIteamID = 1688195521;

/*------------------------------------------------------------------------ General Constants ------------------------------------------------------------------------*/
const egypt_expa_id = 1609;
const access_token = "";
const mcvpIM = "";

const gvSheet = "IGV Submissions";
const gvHeaderRow = 3;
const gvSlots = "IGV Slots";
const contractSystem_GV = "IGV Contracts System";
const gvSlotsHeaderRow = 2;
const referenceIDColumn = 15;
const gvSheet_not_submitted = "Opportunities opened without submiting - GV";
const gvSheet_not_submitted_header_row = 1;
const startContractSystemDateColumn_GV = 34;

const gtSheet = "IGTa/e Submissions";
const gtHeaderRow = 3;
const gtSlots = "IGT Slots";
const contractSystem_GT = "IGTa/e Contracts System";
const gtSlotsHeaderRow = 3;
const gtSheet_not_submitted = "Opportunities opened without submiting - GTa/e";
const gtvSheet_not_submitted_header_row = 1;
const startContractSystemDateColumn_GT = 34;

const options_delete = {
  method: "DELETE",
  headers: {
    Accept: "application/json",
  },
};

/*------------------------------------------------------------------------ Erros Messages ---------------------------------------------------------------------*/
const wrong100 = "100 - Wrong Opportunity ID"; // Can't be found in slots sheet
const wrong101 = "101 - Wrong Opportunity ID";
const wrong200 = "200 - Opportunity doesn't have any created slots";

/*------------------------------------------------------------------------ Constants for GVCode ---------------------------------------------------------------------*/
const emails_for_the_GV_submissions =
  "m.algelany@aiesec.org.eg,mohamed.algelany@aiesec.net";
const opportunity_id_column_GV = 9;
const expa_status_column_GV = 1;
const opened_by_name_column_GV = 2;
const updated_at_column_GV = 3;
const closed_by_ecb_column_GV = 32;
const audited_by_mc_column_GV = 4;
const audited_by_ecb_column_GV = 5;
const full_name_column_GV = 10;
const email_column_GV = 17;
const wrong_opp_id_colum_GV = 145;
const contract_type_GV = 39;
const organization_name_GV = 40;

/*------------------------------------------------------------------------ Constants for GTCode ---------------------------------------------------------------------*/
const emails_for_the_GT_submissions = "youssef.abbas9@aiesec.net";
const opportunity_id_column_GT = 9;
const expa_status_column_GT = 1;
const opened_by_name_column_GT = 2;
const updated_at_column_GT = 3;
const closed_by_ecb_column_GT = 32;
const audited_by_mc_column_GT = 4;
const audited_by_ecb_column_GT = 5;
const full_name_column_GT = 10;
const email_column_GT = 17;
const wrong_opp_id_colum_GT = 145;
const contract_type_GT = 39;
const organization_name_GT = 40;

/*------------------------------------------------------------------------ Constants for macros ---------------------------------------------------------------------*/
// Write the number of the column for exmaple A -> 1, B -> 2. You can get the number of the column by writing =COLUMN() forumla in the desired column
const mcvpStatusColumn_GV = 4;
const ecbStatusColumn_GV = 5;
const submissionMonthColumn_GV = 6;
const signatureMonthColumn_GV = 7;
const totalOpeningsColumn_GV = 44;

const mcvpStatusColumn_GT = 4;
const ecbStatusColumn_GT = 5;
const submissionMonthColumn_GT = 6;
const signatureMonthColumn_GT = 7;
const totalOpeningsColumn_GT = 47;
const referenceCodeColumn_GT = 49;
