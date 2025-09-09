# mbz-navidromelink-extension
A browser extension that adds a button to musicbrainz website, linking to the artist/album in your navidrome server.

## how to install
- grab the `mbz-navidromelink-extension.zip` file from releases
- unpack zip file
- go to your browsers "Manage extensions" settings page
- Enable "developer mode"
- search for "load unpacked extensions" or similar and select the unzipped folder

## how it works
1. you enter your navidrome credentials (URL, username, password)
2. extension tests credentials and saves them to your browsers localstorage (url, username, token, salt)
3. Whenever you open a musicbrainz website (matches ```*://*.musicbrainz.org/*```) the extension:
  - fetches the mbid from the URL (regex matches first uuid-format in URL)
  - queries your navidrome server if this mbid exists (it has to be tagged in the file metadata)
  - if it exists and is an album or an artist, extension injects a button to the "External Links" Section

## Screenshots
![Settings provided by the browser extension](/screenshots/browser-extension-settings.png)
![Example of how the injected link looks on MBZ website](/screenshots/mbz-injected-link.png)

## Example
Configure the Navidrome Demo Instance using
- URL: https://demo.navidrome.org
- Username: demo
- Password: demo

Go to [Album NCS: Infinity on MusicBrainz](https://musicbrainz.org/release/97b74e59-f194-40b6-9bc9-cb7267364ffd)
It should show a link to [Album NCS: Infinity on the navidrome demo instance](https://demo.navidrome.org/app/#/album/5xhNxRFhSPTFsVsPkCNq8N/show)
in the "External Links" Section, right under "Discogs"
