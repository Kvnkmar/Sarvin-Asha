/**
 * RSVP → Google Sheet backend for the Sarvin & Asha wedding site.
 *
 * Paste this whole file into the Apps Script editor bound to your Google Sheet
 * (Extensions → Apps Script), then deploy it as a Web App. Full step-by-step
 * instructions are in RSVP-SETUP.md at the repo root.
 *
 * Every form submission is appended as a new row. Open the Sheet in Google
 * Sheets and use File → Download → Microsoft Excel (.xlsx) any time you want
 * it as an Excel file.
 */

var SHEET_NAME = 'RSVPs';
var HEADERS = ['Timestamp', 'Full Name', 'Attendance', 'Guests', 'Message'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid two submissions writing the same row

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Write the header row once.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.attendance || '',
      data.guests || '',
      data.message || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the Web App URL in a browser to confirm it's live.
function doGet() {
  return ContentService
    .createTextOutput('Sarvin & Asha RSVP endpoint is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
