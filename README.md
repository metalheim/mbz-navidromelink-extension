# mbz-navidromelink-extension
A browser extension that adds a button to musicbrainz website, linking to the artist/album in your navidrome server.

It works by
1. you enter your navidrome credentials (URL, user, password)
2. extension tests credentials and saves them to your browsers localstorage (url, usersname, token, salt)
3. Whenever you open a musicbrainz website (matches ```*://*.musicbrainz.org/*```) the extension:
  - fetch the mbid from the URL (regex matches first uuid-format in URL)
  - queries your navidrome server if this mbid exists (it has to be tagged in the file metadata)
  - if it exists and is an album or an artist, extension injects a button to the "External Links" Section

## Screenshots
![Settings provided by the browser extension](/screenshots/browser-extension-settings.png)
![Example of how the injected link looks on MBZ website](/screenshots/mbz-injected-link.png)
