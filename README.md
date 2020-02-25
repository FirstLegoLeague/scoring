# Scoring

## TODO List

1. Fix UI issues
	1. Autoscroll when going in from edit upon 2nd time goes crazy
	1. Change button icons
	1. Add clerification in codename modal
1. Option to cancel from scoresheet when editing, in addition to resetting.
1. Resetting when editing shouldn't reset metadata
1. Finish this readme.md

## Install and build

`yarn install` will fetch the modules imported in the server and client.

`yarn build` builds the client.

## Publishing to NPM

When you are ready to publish to npm, run the following commands from the repo root directory.
```
yarn install-all
yarn build
yarn version
npm publish --access=public
```
You will be prompted to enter a new version to publish. Following that the script will run the build and packing stages (`prepack`).

You must be a member of the `npm` `first-lego-league` organization to publish the package.

Note: Publish from a version branch (e.g. v2.2.3) so that you can do a PR.

```bash
$ yarn publish
yarn publish v1.12.1
[1/4] Bumping version...
info Current version: 2.2.1
question New version: 2.2.2
info New version: 2.2.2
[2/4] Logging in...
[3/4] Publishing...
$ yarn run build
yarn run v1.12.1
$ cd client && yarn run build && cd ../
$ webpack -p
i ｢webpack｣: Starting Build
i ｢webpack｣: Build Finished

webpack v4.19.1

b691d5da88fe9d5eff50
  size     name   module                                              status
  165 B    5      ./src/config/index.js                               built

.......
  
Done in 11.30s.
success Published.
[4/4] Revoking token...
info Not revoking login token, specified via config file.
Done in 69.17s.
```

Verify that the new package is available in npm at [@first-lego-league/scoring](https://www.npmjs.com/package/@first-lego-league/scoring)

## Adding new version to the `launcher`

Please see the [Launcher README](https://github.com/FirstLegoLeague/Launcher/blob/readme-update/README.md#module-updates) for instructions on how to include your update in the `launcher` build.