Indeed - Interactive Search & Micro-Interactions
================================================

This is our Indeed job search prototype from Figma, built as a real website
with HTML, CSS and JavaScript. We didn't use any frameworks, so there is
nothing to install.

This version builds on our responsive implementation and adds live search
with suggestions, loading states and small animations (see "WHAT'S NEW THIS
WEEK" below).


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


WHAT'S NEW THIS WEEK
--------------------

Our site doesn't have a real server, so anything that would normally load
from one (job listings, saving a status, signing in) waits about half a
second on purpose. That way you can see the loading states the same way you
would on a real site.

1. Live search (search.html)
   - Start typing in the job title box. The job results filter right away
     as you type, and you don't need to press Search.
   - A list of suggestions shows under the box and updates with every letter.
     The part that matches what you typed is in bold. Click one, or use the
     arrow keys and Enter.
   - Type something that doesn't exist, like "astronaut". The suggestions say
     "No matches" and the results show a "No jobs found" message with a
     Clear search button.
   - Delete everything in the box. The suggestions go away and all the jobs
     come back.
   - The location box works the same way (try "Remote" or "Charlotte").

2. Loading states
   - search.html: grey shimmering placeholder cards show while the jobs load,
     and the Search button changes to "Searching..." while it works.
   - home.html: click a job card and the description panel shows a
     placeholder first, then the job details.
   - applications.html: the list shows placeholders while it loads. When you
     click Save in the status popup, the button changes to "Saving..." and
     the buttons can't be clicked again until it's done. Then the popup closes
     and a message pops up saying the status was updated.
   - If saving fails (for example, if the browser blocks saving data), the
     popup stays open and shows an error message instead of spinning forever.
   - signin.html: picking the account or clicking Next shows a spinner before
     it goes to the welcome screen. If you open "Sign in to another account"
     and click Next with the box empty or with a wrong email, it shows an
     error message.
   - welcome.html: the loading spinner before "Welcome".

3. Animations (each one has a reason)
   - Job cards lift up a little with a shadow when you hover over them, so
     you can tell the whole card is clickable.
   - Search results, the job description and the application cards fade in
     and slide up a little when they load, so it's easy to see what changed.
   - The suggestions list and the status popup ease in instead of just
     popping up.
   - The "status updated" message slides in, then fades away on its own.
   - Buttons and search boxes smoothly change color when you hover or click
     into them.
   - If your computer has "reduce motion" turned on, the animations are
     turned off.


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

This week (interactive search and micro-interactions):
- Search filters the results and the suggestions in real time with every
  letter typed, not when the form is submitted.
- Clearing the box hides the suggestions and resets the results.
- There's a "No matches" message in the suggestions and a "No jobs found"
  message in the results.
- Every action with a delay shows a loading state (placeholder cards,
  spinners, "Saving..." / "Searching..." / "Signing in..." buttons), and
  buttons are disabled while they work. Failed saves show an error message.
- More than two animations, each with a purpose (listed above).
- We checked that there are no errors in the browser console on any page.

Last week (responsive implementation):
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
