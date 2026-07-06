// Shared configuration for the RSVP form and the Wishes wall.
//
// Google Apps Script Web App URL — the form POSTs submissions here (appended as
// rows to your Google Sheet), and the Wishes section reads approved messages
// back from it. See RSVP-SETUP.md for the one-time setup and how to re-deploy.
// You can also set VITE_RSVP_ENDPOINT at build time instead of editing this.
export const RSVP_ENDPOINT =
  import.meta.env.VITE_RSVP_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbwdL_VnIBdnsGFSmaNkwcsMTeWR-M4FtelUCczKns6y85ag0SyIo8Js5SkSYDc4fYk3cQ/exec'

// True once a real endpoint has been configured (not the setup placeholder).
export const RSVP_CONFIGURED =
  !!RSVP_ENDPOINT && !RSVP_ENDPOINT.includes('PASTE_YOUR_WEB_APP_URL_HERE')
