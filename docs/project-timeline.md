# Project Timeline

## Discovery Phase

### Data

- Import data from old site and export as CSV and/or spreadsheet
- Define product fields based on this data; so far, on the old site, there is:
  - category (ethnic drums, accessories, etc.)
  - description
  - maker
  - price
- Fix, format, correct misspellings, recategorize items, and create new fields if necessary
- Latest CSV is here: [lapr.csv](lapr.csv)

### Front-End

#### Layout

Decide how the pages will be organized, where the menus will be, roughly what pages are where. Figure out what pages will need to be editable by you, etc.

#### Home Page

How will the homepage be organized? Will there be a slide show/montage?

#### Instrument Lists

Decide how the products will be searched for on the site, taking into account any past/current user input, as well as your own knowledge of what people are searching for, and how to make it as easy as possible to do it.

- Site menu contains instrument categories (mallet instruments, drumsets, other chromatic, etc.)
- Consider using submenus for grouping like instruments: for example, on the "Drumsets/Snare Drums" page, there are 3 categories; maybe we can put those three categories in a dropdown called "drums"
- Clicking on a category lists all instruments in that category; each page can have some inputs that "filter" the results at the top of the page; for instance, sound quality, tonal range, maker, etc.
- Do we still want a text search? Do we want a more "advanced" search page? Or do you think the above will suffice?

#### Instrument Detail

Clicking on an instrument will show a page (via a popup or other means) that shows the following:

- Instrument Name (short, maybe 50 chars or less)
- "Medium" sized image
- "Long Description"
- Maker
- "Alt" name(s) (if supplied)
- Tonal Range (if supplied)
- Tonal Quality (if supplied)

### CMS (Back-End Administration System)

A couple of things will need to be added to the CMS.

#### Products

- Add/edit/delete pages
- Should also be able to delete product categories, and assign products to those categories

#### Users (not critical, but probably useful)

Because I'm assuming there will be more than one user on this system...

- Add/edit/delete pages
- Password change/reset

## Dev/Design Phase

- Make an unstyled, ugly but working prototype
- Locate a designer
- Implement design using prototype
- Test
- Launch!

