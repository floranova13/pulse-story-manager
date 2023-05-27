# pulse-story-manager
This app will manage my stories (and more) using Google's Drive API. It will also manage my local files.

## TODO: 
- [x] Split chapters into sequence breaks by '---' and classify by perspective Character and location
- [x] Finish function that classifies chapters.
- [x] Put in a check to make sure a character isn't just mentioned in a chapter (or maybe this doesn't matter) Update: I think this is fine.
- [ ] Edit tagging function to make sure some tags (like 'body') are only added if an extra work occurs. For example, I could add \*layer\* to the list and that means that \*layer\* must occur in conjunction with the tag 'body' to be added. Another option is to include a 'limiter' property.