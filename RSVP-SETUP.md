# RSVP → Excel / Google Sheet setup

The wedding site is hosted on **GitHub Pages, which has no server**, so it can't
write a file by itself. Instead, each RSVP is POSTed to a free **Google Apps
Script Web App** that appends a row to a **Google Sheet** you own. That Sheet
opens directly in Excel and can be downloaded as an `.xlsx` file any time.

You only do this once (~5 minutes). After that, every submission shows up as a
new row automatically.

---

## 1. Create the Google Sheet

1. Go to <https://sheets.new> (signed in with your Google account).
2. Rename it something like **"Sarvin & Asha RSVPs"**. Leave it otherwise empty —
   the script creates the header row for you.

## 2. Add the script

1. In that Sheet: **Extensions → Apps Script**.
2. Delete whatever code is in the editor.
3. Open [`scripts/rsvp-apps-script.gs`](scripts/rsvp-apps-script.gs) from this
   repo, copy **everything**, and paste it in.
4. Click the **Save** icon (💾).

## 3. Deploy it as a Web App

1. Top-right: **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** `RSVP`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**  ← important, so guests can submit
4. Click **Deploy**.
5. Google will ask you to **Authorize access** → pick your account →
   "Google hasn't verified this app" → **Advanced → Go to (project) → Allow**.
   (This is normal for your own scripts.)
6. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfy..../exec`

> Tip: paste that URL into a browser tab — you should see
> "Sarvin & Asha RSVP endpoint is running." That confirms it's live.

## 4. Put the URL into the site

Open [`src/components/RSVP.jsx`](src/components/RSVP.jsx) and replace the
placeholder near the top:

```js
const RSVP_ENDPOINT =
  import.meta.env.VITE_RSVP_ENDPOINT || 'PASTE_YOUR_WEB_APP_URL_HERE'
```

Change `'PASTE_YOUR_WEB_APP_URL_HERE'` to your Web app URL, e.g.:

```js
const RSVP_ENDPOINT =
  import.meta.env.VITE_RSVP_ENDPOINT || 'https://script.google.com/macros/s/AKfy..../exec'
```

Then commit and push to `main`:

```bash
git add src/components/RSVP.jsx
git commit -m "Wire RSVP form to Google Sheet"
git push
```

GitHub Actions rebuilds and redeploys the site automatically (a minute or two).

## 5. Test it

Open the live site, submit a test RSVP, and check your Google Sheet — a new row
should appear with Timestamp, Full Name, Attendance, Guests, and Message.

## Getting it as Excel

In the Sheet: **File → Download → Microsoft Excel (.xlsx)**. You can do this any
time to get a real Excel file, or just keep working in Google Sheets (it behaves
like Excel and updates live).

---

## The "Wishes" wall — showing guests' messages on the site

The site has a **Wishes** section that displays the messages guests leave, so
their blessings appear on the page. Messages show **automatically**, and you can
hide any one with a single un-tick in the Sheet.

### One-time: re-deploy the updated script

The read feature lives in the same `rsvp-apps-script.gs`, so you need to push the
latest version once:

1. Open [`scripts/rsvp-apps-script.gs`](scripts/rsvp-apps-script.gs), copy
   **everything**, and paste it over the code in your Apps Script editor
   (**Extensions → Apps Script**). Save 💾.
2. **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy.**
   The URL stays the same, so nothing on the site needs to change.

### Showing / hiding messages

- Messages appear on the Wishes wall **automatically**. When a guest submits one,
  a new row gets a **pre-checked box in the "Show on site" column** (column F).
- To **hide** a message, **un-tick its box**; tick it again to show it. Only the
  message and the guest's name are ever shown — never their attendance or
  anything else.
- Changes appear on the site within a minute or two (a guest may need to refresh).

## Prefer not to use Apps Script?

The form just POSTs JSON (`{ name, attendance, guests, message }`) to
`RSVP_ENDPOINT`. Any form-to-spreadsheet service works — e.g.
[SheetMonkey](https://sheetmonkey.io) or [Formspree](https://formspree.io) —
just paste their endpoint URL in step 4 instead. Google Apps Script is
recommended because it's free, unlimited, and the Sheet is fully yours.
