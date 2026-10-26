Indeed - Responsive Implementation
==================================

This is our Indeed job search prototype from Figma, built as a real website
with HTML, CSS and JavaScript. We didn't use any frameworks, so there is
nothing to install.


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
We recommend this one because some browsers don't save things like dark mode
or your application statuses when the page is opened straight from a file.

If you have Python (Macs already have it), open Terminal and type:

    cd path/to/Indeed-Project
    python3 -m http.server 8000

Then go to http://localhost:8000 in your browser. Press Ctrl + C in the
terminal when you're done.

If you use VS Code, you can also install the Live Server extension, right
click index.html and pick "Open with Live Server".

Note: the font (Inter) loads from Google Fonts, so you need internet for it.
Without internet the site still works, it just uses the normal system font.


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
   pick a phone from the list. iPhone SE is exactly 375px wide, which is the
   mobile size from the assignment.

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


THINGS TO TRY
-------------

1. index.html (landing page)
   - On desktop, Sign In is at the top right next to "Us En" and Employers.
   - Click the job title box or the location box to see suggestions. They
     filter as you type.
   - "Get Started" goes to the sign in page and "What's Trending" shows
     popular searches.
   - On a phone, use the Sign In / Create An Account buttons.
2. signin.html - pick the Google account or click Next.
3. welcome.html - loading screen, then "Welcome", then it goes to Home on
   its own.
4. home.html - click a job card to see the job description. On desktop it
   shows on the right, on mobile it shows under the cards.
5. search.html - search by job title and location. Every job title in the
   suggestions has a job behind it (try "Business Analyst" or "Remote").
6. applications.html - click "Update Your Status", pick a status like Hired,
   then click Save and the tag on the card changes. Cancel closes it without
   changing anything. You can filter with the tabs at the top, and the "..."
   button has View job and Archive.
7. The sun/moon button at the bottom switches between light and dark mode on
   every page.


WHAT'S IN THE FOLDER
--------------------

index.html            - landing page
signin.html           - Google sign in
welcome.html          - loading and welcome screen
home.html             - home page with job cards and job description
search.html           - job search
applications.html     - My Applications and the update status popup
messages.html, career-scout.html, notifications.html, account.html,
company-reviews.html, salaries.html, employers.html
                      - "coming soon" pages
css/styles.css        - all the styles (one file for every page)
js/main.js            - menu, dark mode, search, job details, status popup
README.txt            - this file


HOW WE MET THE REQUIREMENTS
---------------------------

- Mobile first: the main CSS is written for phones first. Then we used
  min-width media queries at 768px and 1100px to change the layout for
  tablets and desktop.
- Navigation: the hamburger menu really opens and closes. It also closes when
  you click a link, click outside of it or press Escape. On desktop the full
  menu is always showing across the top.
- No sideways scrolling: we checked every page at 320px, 375px, 1280px and on
  a wide monitor.
- Easy to tap: buttons and links are at least 44px tall, and text boxes use
  16px text so phones don't zoom in when you type.
- Same look on both: the colors, font, spacing and rounded corners come from
  our Figma file and are saved as CSS variables, so mobile and desktop use the
  same ones.
- No broken links: every link goes to a real page. Pages we didn't design in
  Figma (Messages, Career Scout, Notifications, Account, Company Reviews,
  Find Salaries and Employers) have a simple "coming soon" page.
