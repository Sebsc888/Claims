# Phone app (PKG-02): how to put it online

This folder is a small website. It shows your ledger full screen so staff can put it on their phone like an app.
It is free on GitHub Pages. It holds no patient data: the ledger stays in your Google Sheet.

## A. Put the files online (once, about 15 minutes)

1. Go to **github.com** and tap **Sign up**. Make a free account (for example the name `drsantos`).
2. Tap **+** (top right) → **New repository**. Name it **claims**. Choose **Public**. Tap **Create repository**.
3. Tap **uploading an existing file**. Drag in **all the files in this folder**, including the **icons** folder
   (you do not need the `shots` folder or this README). Tap **Commit changes**.
4. Tap **Settings** → **Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**. Tap **Save**.
5. Wait 2 minutes. Your phone-app address is now `https://YOURNAME.github.io/claims/`.

## B. Tell the phone app your ledger link

6. In Apps Script: **Deploy → Manage deployments**. Copy the **Web app URL** (it ends in `/exec`).
7. On GitHub, open **config.js** → tap the pencil ✏️. Paste your link in place of the example `EXEC_URL`.
   Also type your clinic name in `CLINIC_NAME`, and put `https://YOURNAME.github.io/claims/install.html` in `INSTALL_URL`.
   Tap **Commit changes**.

## C. Switch it on in the ledger

8. Open the ledger → **Clinic details**.
9. In **Phone app (PKG-02)**, type `https://YOURNAME.github.io/claims/` in **Phone app address**. Tap **Save details**.
10. Make sure **App logins (PKG-01)** is on (staff need a username and PIN; Google sign-in does not work inside the phone app).
11. Open Clinic details again and tap **Turn on phone app**.
12. In Apps Script: **Deploy → Manage deployments → ✏️ edit** → Version: **New version**, Execute as: **Me**, Who has access: **Anyone** → **Deploy**.
    (Same link as before. Do not make a new deployment.)

## D. Install on each phone

13. Print **install-poster.html** (Ctrl+P, A4) and put it near the desk, or open `https://YOURNAME.github.io/claims/install.html` on the phone.
14. Android: open in **Chrome** → tap the big green **Install** button.
    iPhone: open in **Safari** → **Share** → **Add to Home Screen** → keep **Open as Web App** on → **Add**.
15. Open **Claims** from the home screen and sign in with the username and PIN.

## To turn it off (roll back)

Clinic details → Phone app → **Turn off phone app**. The phone app then shows nothing; the normal ledger link keeps working.
You may also delete the `claims` repository on GitHub (Settings → Delete this repository).

## If something does not work

- "No internet. Tap to try again": check Wi-Fi or mobile data, then tap.
- Blank or "Please open this from the Claims app": check the **Phone app address** in Clinic details is exactly your GitHub address, and that you deployed a **New version**.
- iPhone keeps asking to sign in: when you have internet, tap **Open in Safari/Chrome instead** on the Claims screen, or use the normal ledger link in Safari.

## If you ever turn App logins (PKG-01) off

The phone app needs App logins, so turn the phone app off first. Then:
1. In Clinic details → Users, add each staff member's Google email. (With an empty list, only you, the Sheet's owner, can open the ledger.)
2. Turn off App logins, and right away: Deploy → Manage deployments → edit → Execute as: **User accessing the web app** → New version.
   Until you do, everyone sees "App logins were turned off".

## Undoing the 29 Oct 9:00 AM safety fixes (only if something is badly wrong)

Do this **only while App logins (PKG-01) are ON**. The older files have safety holes when App logins are off.
1. In Apps Script, go to Deploy → Manage deployments → ✏️ edit → Version.
2. Pick the version number from before today → Deploy. The link stays the same.

## Safety notes (29 Oct 10:00 AM)

- **Use a GitHub account only for this clinic** (for example `drsantos-claims`), or your own web address. Every page on the same `github.io` address can see what the phone app keeps, so do not host other projects there.
- **Upload only the files in the `phone-app` folder.** Never upload `ledger-records.json`, the `shots` folder, or any test files.
- **A name can be locked by someone else.** Five wrong PINs lock a name for 15 minutes, even if a stranger typed them. This is on purpose. The administrator can tap **Unlock** in Clinic details.
- **The Google Drive permission stays wide on purpose.** The ledger needs it for the nightly backup copy, the "Ledger quotes" folder and replacing old quote PDFs. A narrower permission would stop those from working.
- **Firefox on a phone:** with the phone app turned on, Firefox cannot be shown the app from the home screen icon. Use Chrome (Android) or Safari (iPhone).
- **Viewers:** people with the Viewer role no longer see the "Change history" of a case. Editors and administrators do.

## When you update the phone app later

**Do NOT replace your existing config.js. It holds your ledger link. The new file has placeholders and would break the app.** Upload every other file, and leave `config.js` as it is.
