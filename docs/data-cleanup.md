
# Data Cleanup

Latest list of products has moved to [http://104.200.25.63:3003/products](http://104.200.25.63:3003/products)

## General Issues

- ~~Instruments in "Backline" category have blank "maker" fields, which does exist in some of the names, so they will need to be copied over manually~~
- Emil Richards "more info..." will need to be copied over
- Current images have all sorts of different sizes and dimensions
- Large images need to scraped from old site and imported
- ~~Drumset descriptions have quite a bit of info~~
- ~~Remove n/a's from model_no field~~ 
- ~~Need to find duplicates and merge them so that instrument names are unique~~ 
- ~~Capitalization of names, etc. -- pretty inconsistent right now~~
- ~~General grammar stuff~~

## Existing Fields

- category (ethnic drums, accessories, etc.)
- description/name
- maker
- price
- model_no

## Additional Fields to Consider

- name: right now, the name and description are all in the same field; we need a *short* name field
- alt_names: for instruments that have multiple names, instead of piling all of that in the description :)
- long_description: for the Emil Richards "more info..." descriptions, etc. -- or maybe we just use description for it
- tonal_range: can list individual note values as well as ranges of multiple notes; C#3-Ab5, D2
- qualities: metallic, wood, dark, etc.
- num_octaves: nice to have, probably not necessary, or maybe can be calculated from range fields
- image
- sizes: for drum sizes?

## Further Cleanup/Categorization

- Change order of some of the names in the "name" field so that instruments will sort properly. Some examples:
  - "Log Drum, Medium Range, 6 pitches" -- it's a log drum, which is its name, but the medium range, 6 pitches part should be in the description or "notes field" (I would think)
  - "Variety of Drumset & Ethnic Tambourines" -- in order for this to sort properly in a list, it should be "Tambourines, Drumset & Ethnic, Variety" etc.
  - "Ampeg VST with Tube Amp Head" contains maker (Ampeg) in the name -- repetitive
- Verify that my changes don't conflict with any "business reasons" for why something should be named or displayed a certain way
- Talk about how duplicates have been merged and removed. On your old site, products that were displayed on different pages had, in some cases, slight differences in spellings, missing information, etc. Now, if an instrument needs to be listed on different pages (categories), there is only *one* entry in the database. This eliminates "human error" that comes from trying to maintain multiple copies of the same product synced up with each other. :) This also gives us the ability to display and categorize instruments in pretty much any way we can think of
