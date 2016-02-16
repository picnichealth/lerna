## Basket

Lovingly stolen from [Lerna](https://github.com/kittens/lerna).
<strike>Slightly-to-moderately</strike> significantly modified for PicnicHealth.
Here's Lerna's README, with `sed 's/lerna/basket/g'` and other important changes.

<p align="center">
  <img alt="Basket" src="https://i.imgur.com/yT7Skxn.png" width="480">
</p>

<p align="center">
  A tool for managing JavaScript projects with multiple packages.
</p>

## About

While developing [Babel](https://github.com/babel/babel) I followed a
[monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) approach
where the entire project was split into individual packages but everything lived in the same
repo. This was great. It allowed super easy modularisation which meant the core was easier
to approach and meant others could use the useful parts of Babel in their own projects.

This tool was abstracted out of that and deals with bootstrapping packages by linking
them together as well as publishing them to npm. You can see the
[Babel repo](https://github.com/babel/babel/tree/master/packages) for an example of a
large Basket project.

## Usage

```sh
$ npm install -g basket
$ basket bootstrap
```

This will create a dummy `VERSION` file as well as a `packages` folder.

### Bootstrap

```sh
$ basket bootstrap
```

1. Link together all packages that depend on each other.
2. `npm install` all other dependencies of each package.

### Upgrade

```sh
$ basket upgrade
```

1. Set a dependency to a sepcific version in all packages

### Updated

```sh
$ basket updated
```

1. Check which `packages` have changed since the last release, and log it.
   Changed means changed in commits

### Release

```sh
$ basket release
```

1. Publish each module in `packages` that has been updated since the last version to npm with the tag `prerelease`.
2. Once all packages have been published, remove the `prerelease` tags and add the tags `latest` and `stable`.

### Release

```sh
$ basket release
```

1. Release each module in `packages` that has been updated since the last version

## How it works

Basket projects operate on a single version line. The version is kept in the file `VERSION`
at the root of your project. When you run `basket release`, if a module has been updated
since the last time a release was made, it will be updated to the new version you're
releasing. This means that you only release a new version of a package when you need to.
