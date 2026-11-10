/**
 * Logs resume download requests from the portfolio into this Google Sheet.
 *
 * Setup (one time):
 *  1. Create a Google Sheet. Open Extensions → Apps Script.
 *  2. Replace the contents of Code.gs with this file and click Save.
 *  3. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *     Click Deploy and authorise when asked.
 *  4. Copy the Web app URL (ends in /exec) into `resumeLogUrl` in src/data/portfolio.ts.
 *
 * If you edit this script later, use Deploy → Manage deployments → Edit → "New version"
 * so the same URL keeps working.
 */

const SHEET_NAME = 'Resume requests';
const HEADERS = ['Timestamp', 'Full name', 'Phone', 'Email', 'Company', 'Role', 'Reason', 'Consent', 'Page'];
const FIELDS = ['name', 'phone', 'email', 'company', 'role', 'reason', 'consent', 'page'];
const MAX_LENGTH = 300;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    const p = (e && e.parameter) || {};
    const row = [new Date()].concat(FIELDS.map(function (key) { return clean(p[key]); }));
    sheet.appendRow(row);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Trim, cap length, and stop values like "=..." or "+91..." being treated as formulas. */
function clean(value) {
  const text = String(value || '').trim().slice(0, MAX_LENGTH);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
