# 📧 How to Fix Email Notifications

The error happens because Google blocks regular passwords for security. You need to generate a special **App Password**.

## Step 1: Enable 2-Step Verification
1. Go to your [Google Account](https://myaccount.google.com/).
2. Select **Security** on the left panel.
3. Under "How you sign in to Google", turn on **2-Step Verification** (if not already on).

## Step 2: Generate App Password
1. Go to the search bar in your Google Account settings and type **"App passwords"**.
2. Select **App passwords** (or go directly [here](https://myaccount.google.com/apppasswords)).
3. Give it a name (e.g., "Student Print Hub").
4. Click **Create**.
5. Copy the 16-character password shown (it looks like: `xxxx xxxx xxxx xxxx`).

## Step 3: Update Project Configuration
1. Open the `.env` file in the `backend` folder.
2. Find the line: `EMAIL_PASS=...`
3. Replace your old password with the new 16-character App Password (no spaces needed, but spaces are fine too).

Example:
```env
EMAIL_PASS=abcd efgh ijkl mnop
```

## Step 4: Restart Server
1. Go to your backend terminal.
2. Press `Ctrl + C` to stop the server.
3. Run `npm start` again.

Now email notifications will work! 🚀
