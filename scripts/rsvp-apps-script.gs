/**
 * RSVP -> Google Sheet backend for the Sarvin & Asha wedding site.   [v4-autoshow]
 *
 *   1. doPost — appends each RSVP submission as a new row.
 *   2. doGet  — with ?callback=... (JSONP), returns every message so the site's
 *      "Wishes" section can display them. Messages show AUTOMATICALLY — there is
 *      no checkbox to tick. To hide one message, clear the text in its "Message"
 *      cell (the rest of that person's RSVP stays intact).
 *
 * Paste this whole file into the Apps Script editor bound to your Google Sheet
 * (Extensions -> Apps Script). IMPORTANT — how to make changes go live:
 *   Deploy -> Manage deployments -> click the PENCIL (Edit) on your EXISTING
 *   deployment -> Version: "New version" -> Deploy.
 * Do NOT use "New deployment" (that creates a different URL the site won't use).
 *
 * To confirm a deploy worked, open the Web app URL in a browser: it should say
 * "... running. [v4-autoshow]". If the version in brackets doesn't match, the
 * new code isn't live yet.
 */

var SHEET_NAME = 'RSVPs';
var HEADERS = ['Timestamp', 'Full Name', 'Attendance', 'Guests', 'Message'];
var VERSION = 'v4-autoshow';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid two submissions writing the same row

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    ensureHeaders(sheet);

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.attendance || '',
      data.guests || '',
      (data.message || '').toString().trim(),
    ]);

    return jsonOut({ result: 'success' });
  } catch (err) {
    return jsonOut({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  // JSONP request from the Wishes section: return messages wrapped in the
  // requested callback so it isn't blocked by the browser's CORS policy.
  var callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(getMessages()) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  // Plain visit in a browser — confirms the endpoint is live AND which version.
  return ContentService
    .createTextOutput('Sarvin & Asha RSVP endpoint is running. [' + VERSION + ']')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Makes sure row 1 holds the header. Self-heals sheets created by an earlier
 * version of this script.
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
 * Returns [{ name, message }] for every row that has a message. To hide a
 * message from the site, clear its "Message" cell in the Sheet.
 */
function getMessages() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) return [];

  var values = sheet.getDataRange().getValues();
  var header = values[0];
  var nameCol = header.indexOf('Full Name');
  var msgCol = header.indexOf('Message');

  var out = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var message = (msgCol !== -1 ? row[msgCol] : '').toString().trim();
    if (!message) continue;

    out.push({
      name: (nameCol !== -1 ? row[nameCol] : '').toString().trim(),
      message: message,
    });
  }
  return out;
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
