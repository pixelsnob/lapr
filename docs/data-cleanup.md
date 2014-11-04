
# Data Cleanup

Latest CSV is here: [lapr.csv](lapr.csv)

## General Issues

- Instruments in "Backline" category have blank "maker" fields, which does exist in some of the names, so they will need to be copied over manually
- Emil Richards "more info..." will need to be copied over

## Additional Fields to Consider

- tonal_range_low: C1-C5, etc.
- tonal_range_high
- alt_names: for instruments that have multiple names, instead of piling all of that in the description :)
- num_octaves: nice to have, probably not necessary, or maybe can be calculated from range fields
- long_description: for the Emil Richards "more info..." descriptions, etc. -- or maybe we just use description for it
- image
- instrument_type/tags?
