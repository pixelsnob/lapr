
# Data Cleanup

Latest CSV is here: [lapr.csv](lapr.csv)

## General Issues

- Instruments in "Backline" category have blank "maker" fields, which does exist in some of the names, so they will need to be copied over manually
- Emil Richards "more info..." will need to be copied over
- Current images have all sorts of different sizes and dimensions
- Drumset descriptions have quite a bit of info

## Additional Fields to Consider

- name: right now, the name and description are all in the same field; we need a *short* name field
- alt_names: for instruments that have multiple names, instead of piling all of that in the description :)
- tonal_range_low: C1-C5, etc.
- tonal_range_high
- num_octaves: nice to have, probably not necessary, or maybe can be calculated from range fields
- long_description: for the Emil Richards "more info..." descriptions, etc. -- or maybe we just use description for it
- image
