Indeed - Form Validation & User Feedback
========================================

This is our Indeed job search prototype from Figma, built as a real website
with HTML, CSS and JavaScript. We didn't use any frameworks, so there is
nothing to install.

This version adds forms that check what you type as you go and tell you
exactly how to fix any mistakes (see "WHAT'S NEW THIS WEEK" below). It also
keeps everything from earlier weeks: the responsive layout, live search,
loading states and animations.


TEAM MEMBERS
------------
 Emmanuel Owusu
 Lamar Cooper
 Tithi Thakkar
 James Paek


HOW TO RUN IT
-------------

Way 1 (easiest):
1. Unzip the file.
2. Open the Indeed-Project folder.
3. Double click index.html and it opens in your browser.

Way 2 (local server):
We recommend this one because some browsers don't save things like dark mode,
your profile or your application statuses when the page is opened straight
from a file.

If you have Python (Macs already have it), open Terminal and type:

    cd path/to/Indeed-Project
    python3 -m http.server 8000

Then go to http://localhost:8000 in your browser. Press Ctrl + C in the
terminal when you're done.

If you use VS Code, you can also install the Live Server extension, right
click index.html and pick "Open with Live Server".

Note: the font (Inter) loads from Google Fonts, so you need internet for it.
Without internet the site still works, it just uses the normal system font.

If a page still looks like an older version, do a hard refresh with
Cmd + Shift + R on Mac or Ctrl + Shift + R on Windows.


WHAT'S NEW THIS WEEK
--------------------

We have two full forms and one smaller one:

1. Create account (signup.html)
   Full name, email, phone number, password and confirm password.
   How to get there: click "Create An Account" on the landing page (phone),
   or click Sign In / Get Started and pick "Create an Indeed account".

2. Edit profile (account.html)
   Full name, email and phone number, plus an optional new password. The
   name, email and phone you entered on Create account are already filled in.
   How to get there: click Account in the menu.

3. Sign in with another account (signin.html)
   Click "Sign in to another account" and an "Email or phone" box shows up.
   It is checked the same way as the other forms.

How the checking works on every form:
- A box gets checked when you leave it (click or tab out of it). From then
  on it is checked again with every letter you type, so you see right away
  when it's fixed.
- If something is wrong, the box gets a red border and a red icon, and a
  message shows right under it saying what's wrong and how to fix it.
- When a box is filled in correctly, the border turns green and it shows a
  check mark and a short message like "Email looks good."
- Different mistakes get different messages. For example, an empty email
  says "Enter your email address", but "emmanuel@gmail" says "Email is
  missing its ending, like .com or .org."
- The password has a checklist under it (8 characters, one uppercase letter,
  one number). Each line turns green as soon as you meet it.
- The Show button lets you see the password you typed.
- If you click the submit button while something is still wrong, every
  problem gets marked at once, a short note next to the button says how many
  boxes still need fixing, and the cursor jumps to the first one. Nothing is
  shown in a popup alert.
- When everything is right, the button changes to "Creating account..." or
  "Saving..." and can't be clicked again until it's done.

We don't save passwords anywhere. The name, email and phone are saved in the
browser (localStorage) so the Edit profile form can show them.


HOW TO TEST THE FORMS
---------------------

Create account (signup.html):
1. Click into Full name, then click out without typing.
   -> "Enter your full name."
2. Type only a first name, like "Emmanuel", and click out.
   -> "Enter your first and last name, with a space between them."
   Add a last name and it turns green.
3. Email: try "emmanuel", then "emmanuel@", then "emmanuel@gmail".
   Each one gets its own message. "emmanuel@gmail.com" turns green.
4. Phone: type "7045" -> "Phone number needs 10 digits, including the area
   code. You've entered 4." Type all 10 digits and it turns green. When you
   click out it formats itself as (704) 555-0123.
5. Password: type "hello" and watch the checklist. Then try "Hello123".
6. Confirm password: type something different -> "Passwords don't match."
   Fix it and it says "Passwords match."
7. Click Create account with everything correct. It shows "Creating
   account...", then goes to the welcome screen and Home.

Edit profile (account.html):
1. Your details from Create account are already in the boxes.
2. Delete the name, or break the email or phone. The same messages show up.
   Put them back the right way and they turn green.
3. Change your phone number, leave both password boxes empty and click Save
   changes. It shows "Saving...", then a "Profile updated" message. It
   doesn't ask for a password, because changing it is optional.
4. Click Save changes again without changing anything -> "No changes to
   save".
5. Type only in "Confirm new password" -> it asks you to fill in the new
   password too. Fill in both with the same strong password and save, and
   the message says "Profile and password updated".

Sign in (signin.html):
1. Click "Sign in to another account".
2. Type random letters like "asdfgh" and click out.
   -> "Email needs an @ symbol, like name@example.com."
3. Type "7045" -> it tells you the phone number needs 10 digits.
4. Type a real email or phone and it turns green. Click Next to sign in.


HOW TO TEST MOBILE AND DESKTOP
------------------------------

Quick way:
Open the site in Chrome and drag the edge of the window to make it narrower.
Once the window is smaller than about 1100px wide, the site switches to the
mobile layout with the hamburger menu at the top and the tab bar at the
bottom. Make the window wide again and the full desktop menu comes back.
(Chrome won't let the window get smaller than around 500px, so use the next
way to see the exact phone size.)

Exact sizes (375px and 1280px):
1. Open the site in Chrome.
2. Open DevTools with Cmd + Option + I on Mac or Ctrl + Shift + I on Windows.
3. Click the phone/tablet icon at the top of DevTools (or press
   Cmd + Shift + M / Ctrl + Shift + M).
4. Type 375 in the width box to check mobile and 1280 to check desktop.
5. You can also click the "Dimensions: Responsive" dropdown at the top and
   pick a phone from the list. iPhone SE is exactly 375px wide.

What the menu looks like:
- Phone and tablet (under 1100px): hamburger menu with Notifications, Company
  Reviews, Find Salaries, Account and Employers / Post Job, plus a bottom tab
  bar with Home, Messages, Search, My Applications and Career Scout.
- Desktop (1100px and up): one menu across the top with Home, Company Reviews,
  Find Salaries, My Applications, Messages, Notifications, Account, Career
  Scout and Employers / Post Job, with the search bar under it.

The page you're on is always highlighted. On desktop it gets a blue underline,
in the hamburger menu it has a blue background, and in the tab bar the icon
and label turn bold.


OTHER THINGS TO TRY
-------------------

1. index.html (landing page)
   - Click the job title box or the location box to see suggestions. They
     filter as you type.
   - "Get Started" goes to the sign in page and "What's Trending" shows
     popular searches.
   - On a phone, use the Sign In / Create An Account buttons.
2. welcome.html - loading screen, then "Welcome", then it goes to Home on
   its own.
3. home.html - click a job card to see the job description. On desktop it
   shows on the right, on mobile it shows under the cards.
4. search.html - results filter as you type. Try "Business Analyst",
   "Remote", or something that doesn't exist like "astronaut".
5. applications.html - click "Update Your Status", pick a status, then click
   Save. It shows "Saving..." and then a message that the status changed.
6. Light and dark mode - go to Account, scroll down to Settings ->
   Appearance and click the sun/moon button. Your choice is remembered on
   every page.


WHAT'S IN THE FOLDER
--------------------

index.html            - landing page
signin.html           - Google sign in
signup.html           - Create account form
welcome.html          - loading and welcome screen
home.html             - home page with job cards and job description
search.html           - job search
applications.html     - My Applications and the update status popup
account.html          - Edit profile form and Settings (light/dark mode)
messages.html, career-scout.html, notifications.html,
company-reviews.html, salaries.html, employers.html
                      - "coming soon" pages
css/styles.css        - all the styles (one file for every page)
js/main.js            - menu, dark mode, search, forms, job details,
                        status popup
README.txt            - this file


HOW WE MET THE REQUIREMENTS
---------------------------

This week (form validation and user feedback):
- Two real forms with more than three fields: Create account (5 fields)
  and Edit profile (5 fields). Sign in also checks its email/phone box.
- Checking happens while you use the form: when you leave a box, and then
  with every letter you type. It doesn't wait for the submit button.
- We check required fields, email format, phone number length, password
  length and strength, and that both passwords match.
- Every error shows right under its own box, with a red border and icon.
  There are no alert popups.
- Each message says what's wrong and how to fix it, and different mistakes
  on the same box get different messages.
- Errors go away as soon as the box is fixed, and correct boxes show a green
  check and a short success message.
- We checked that there are no errors in the browser console.

Earlier weeks:
- Responsive layout: written for phones first, with breakpoints at 768px and
  1100px. The hamburger menu opens and closes, there's no sideways scrolling
  at 320px, 375px or 1280px, and buttons are at least 44px tall.
- Live search: results and suggestions update with every letter, clearing
  the box resets everything, and there are "No matches" / "No jobs found"
  messages.
- Loading states: placeholder cards, spinners and "Saving..." /
  "Searching..." / "Signing in..." buttons. Since there's no real server,
  these wait about half a second on purpose so you can see them.
- Animations: cards lift on hover, new content fades in, popups ease in, and
  everything turns off if "reduce motion" is on.
