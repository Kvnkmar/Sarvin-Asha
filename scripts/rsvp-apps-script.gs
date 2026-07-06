/**
 * RSVP → Google Sheet backend for the Sarvin & Asha wedding site.
 *
 * Handles two things:
 *   1. doPost — appends each RSVP submission as a new row, and adds a pre-checked
 *      "Show on site" checkbox next to any message (shows automatically; un-tick
 *      the box to hide a message).
 *   2. doGet  — when called with ?callback=... (JSONP), returns the messages you
 *      have approved, so the site's "Wishes" section can display them.
 *
 * Paste this whole file into the Apps Script editor bound to your Google Sheet
 * (Extensions -> Apps Script), then deploy it as a Web App. Full step-by-step
 * instructions are in RSVP-SETUP.md at the repo root. IMPORTANT: after editing
 * this script you must re-deploy a NEW VERSION for changes to take effect
 * (Deploy -> Manage deployments -> Edit -> Version: New version -> Deploy).
 *
 * Every submission is appended as a new row. Open the Sheet in Google Sheets and
 * use File -> Download -> Microsoft Excel (.xlsx) any time you want it as Excel.
 */

var SHEET_NAME = 'RSVPs';
var HEADERS = ['Timestamp', 'Full Name', 'Attendance', 'Guests', 'Message', 'Show on site'];
var SHOW_COL = HEADERS.indexOf('Show on site') + 1; // 1-based column index (6)

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid two submissions writing the same row

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    ensureHeaders(sheet);

    var data = JSON.parse(e.postData.contents);
    var message = (data.message || '').toString().trim();

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.attendance || '',
      data.guests || '',
      message,
      '', // 'Show on site' — filled in below only when there's a message
    ]);

    // If the guest left a message, add a PRE-CHECKED "Show on site" checkbox so
    // the message appears on the Wishes wall automatically. Un-tick it to hide.
    if (message !== '') {
      var showCell = sheet.getRange(sheet.getLastRow(), SHOW_COL);
      showCell.insertCheckboxes();
      showCell.setValue(true);
    }

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

function doGet(e) {
  // JSONP request from the Wishes section: return approved messages wrapped in
  // the requested callback so it isn't blocked by the browser's CORS policy.
  var callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    var messages = getApprovedMessages();
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(messages) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  // Plain visit in a browser — confirms the endpoint is live.
  return ContentService
    .createTextOutput('Sarvin & Asha RSVP endpoint is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Makes sure row 1 holds the full header (including "Show on site"). This
 * self-heals sheets first created by an earlier version of this script, so the
 * approval column is always present.
 */
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }
  var current = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  for (var i = 0; i < HEADERS.length; i++) {
    if (current[i] !== HEADERS[i]) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      return;
    }
  }
}

/**
 * Returns [{ name, message }] for every row that (a) has a message and
 * (b) has its "Show on site" box ticked. A row is shown ONLY when the box is
 * explicitly checked — blank/unchecked rows stay private. If the header label
 * can't be found, we fall back to the fixed approval column so nothing is ever
 * exposed by accident.
 */
function getApprovedMessages() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) return [];

  var values = sheet.getDataRange().getValues();
  var header = values[0];
  var nameCol = header.indexOf('Full Name');
  var msgCol = header.indexOf('Message');
  var showCol = header.indexOf('Show on site');
  if (showCol === -1) showCol = SHOW_COL - 1; // fixed column F fallback

  var out = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var message = (msgCol !== -1 ? row[msgCol] : '').toString().trim();
    if (!message) continue;

    // Shown when the box is checked. Accept a real checkbox (boolean true) or a
    // plain "TRUE" cell, so it works however the value ends up stored.
    var flag = row[showCol];
    var shown = flag === true || (typeof flag === 'string' && flag.toUpperCase() === 'TRUE');
    if (!shown) continue;

    out.push({
      name: (nameCol !== -1 ? row[nameCol] : '').toString().trim(),
      message: message,
    });
  }
  return out;
}
