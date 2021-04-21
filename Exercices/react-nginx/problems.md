# Problems During exercice

## Live reload overwrites the node_modules

To create a dev environment that give us the live reload we will use a bind mount.

```sh
docker run --name react -p 3000:3000 --mount type=bind,source="$(pwd)",target=/app react-app
```

But when we do this the node_modules folder is overwritten and during the start of the `start` script we get an error.

```sh
> client@0.1.0 start
> react-scripts start

sh: react-scripts: not found
npm notice
npm notice New minor version of npm available! 7.7.6 -> 7.10.0
npm notice Changelog: <https://github.com/npm/cli/releases/tag/v7.10.0>
npm notice Run `npm install -g npm@7.10.0` to update!
npm notice
```
