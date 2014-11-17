# Project Timeline

## Data

- Import data from old site and export as CSV and/or spreadsheet
- Define product fields based on this data
- Fix, format, correct misspellings, recategorize items, and create new fields if necessary
- Data detail page is here: [data-cleanup.md](./data-cleanup.md)

## Front-End

### Layout

Decide how the pages will be organized, where the menus will be, roughly what pages are where. Figure out what pages will need to be editable by you, etc.

### Home Page

- How will the homepage be organized?
- Will there be a slide show/montage?
- Do you need to pull from FB for a "news" page? (I think the updates you do on FB are really informative and pretty neat. We should maybe think about making those a part of your website somehow).

### Instrument Lists

Decide how the products will be searched for on the site, taking into account any past/current user input, as well as your own knowledge of what people are searching for, and how to make it as easy as possible for your customers.

- Site menu contains instrument categories (mallet instruments, drumsets, other chromatic, etc.)
- Consider using submenus for grouping like instruments: for example, on the "Drumsets/Snare Drums" page, there are 3 categories; maybe we can put those three categories in a dropdown called "drums"
- Clicking on a category lists all instruments in that category; each page can have some inputs that "filter" the results at the top of the page; for instance, sound quality, tonal range, maker, etc.
- Do we still want a text search? Do we want a more "advanced" search page? Or do you think the above will suffice?

*This is off the top of my head, based on past conversations with you guys. It sounded like you wanted to keep the organization of the site basically the same as the old site. Let me know if you have other ideas though.*

### Instrument Detail

Clicking on an instrument will show a page (via a popup or other means) that shows the following:

- Instrument name (short, maybe 50 chars or less)
- Model number
- "Medium" sized image
- Long description
- Maker
- "Alt" name(s) (if supplied)
- Tonal range (if supplied)
- Tonal quality (if supplied)

### Contact Page

- Contact form?
- Map?
- Facebook/G+ links?

## CMS (Back-End Administration System)

Building on the existing CMS used by Nesta, will need to add the following:

### Products

Add/edit/delete pages for the following:
- Products
  - name
  - alt_names
  - category (from list of categories)
  - description
  - maker (from list of makers)
  - price
  - tonal_range_low
  - tonal_range_high
  - tonal_qualities (from list of tonal qualities)
  - num_octaves
  - image
  - sizes
- Product categories
- Makers/manufacturers
- Tonal qualities

### Users (not critical, but probably useful)

Because I'm assuming there will be more than one user on this system...

- Add/edit/delete pages
- Password change/reset

## Dev/Design Phase

- Locate a designer
- Implement design
- Test
- Launch!

