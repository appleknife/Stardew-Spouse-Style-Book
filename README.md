# Spouse Style Book

Decorating ideas for every Stardew Valley and Ridgeside Village spouse, plus a gallery of your finished farms.
Works on iPhone, Android and computers, and keeps working offline after the first visit.

Each spouse card shows their in-game portrait, a pixel room mock-up painted in their palette,
and a small photo of the spouse room they actually get in game, so you can see what you are
redecorating before you start. Switch a card to Summer or Winter and the Pelican Town portrait
changes into that villager's beach or winter outfit.

## Put it online with GitHub Pages (free, about 10 minutes)

1. Sign in at github.com (or make a free account).
2. Click **+** (top right), then **New repository**. Name it `style-book`, choose **Public**, and click **Create repository**.
3. On the new repo page, click **uploading an existing file**. Drag in every file from this folder:
   `index.html`, `manifest.webmanifest`, `sw.js`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `README.md`, and the whole `assets` folder.
   Click **Commit changes**.
4. Go to **Settings**, then **Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main** and **/ (root)**, then click **Save**.
5. Wait a minute or two and refresh that page. It shows your link, like `https://YOUR-USERNAME.github.io/style-book/`.

## Install on iPhone

1. Open the link in **Safari**. Chrome on iPhone can't install it properly.
2. Tap the **Share** button, then **Add to Home Screen**, then **Add**.
3. Open it from the new home-screen icon. It runs full screen and works offline.

## Good to know

- Farms and screenshots are saved on the phone, inside the app. They are not uploaded anywhere.
- Use **Back up farms** in the Portfolio tab now and then. On iPhone it opens the Share sheet, so you can save the backup to Files or send it to a friend. **Restore backup** brings farms back on a new phone.
- Deleting the home-screen app also deletes its saved farms, so back up first.
- To update the app later, upload a new `index.html` to the same repo. In `sw.js`, change the `CACHE` name (`style-book-v2` to `style-book-v3`, and so on) so phones pick up the new version. The current version is `style-book-v2`.

## Project layout

```
index.html                  the whole app: markup, styles and script
sw.js                       offline cache; lists every image so it works without a signal
manifest.webmanifest        install-on-home-screen settings
assets/img/portraits/       one portrait per spouse, named after their id (abigail.webp),
                            plus -beach.webp and -winter.webp outfits for Pelican Town
assets/img/rooms/           the spouse room photo, same naming; a few spouses have none
```

Images are WebP so the whole art set stays under 1 MB. To swap one, replace the file with
another of the same name. If a room photo is missing the card simply hides that block, so you
can add or remove them freely without touching the code. To add a new spouse, add an entry to
the `SP` table in `index.html` plus files named after its `id`.

## Credits and licensing

The portraits and spouse-room photos come from the [Stardew Valley Wiki](https://stardewvalleywiki.com/)
and the [Ridgeside Village Wiki](https://ridgesidevillage.wiki.gg/). They are the work of
ConcernedApe and the Ridgeside Village team, and they appear here for reference only, in a free
non-commercial fan project. No ownership is claimed over them.

Everything else, the palettes, room ideas, mock-up painting and copy, is original to this project.

Stardew Valley is © ConcernedApe. Ridgeside Village is a fan mod by Rafseazz. This project is
unofficial and is not affiliated with, endorsed by or sponsored by either. It is free, has no ads,
no accounts and no payments, and everything you save stays in your browser.
