# package-source-version
This module can update your `package.json` file by adding a `build` property to it representing the latest commit SHA from source code.

## Installing

    npm install package-source-version

## Using
Typically, this module would be used for a postinstall step in a build system, like that of Heroku. The app depending on this module would use it like so, in the `scripts` property, as a `postinstall` command.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "postinstall": "./node_modules/package-source-version/bin/update-package ./package.json"
  },
  "dependencies": {
    "package-source-version": "1.0.0"
  }
}
```

Note that Heroku's build system exposes the commit SHA via the environment variable `SOURCE_VERSION`. This module expects this variable to be set with the commit SHA to serialize to the `package.json` file.

## Result of use
Once the script is executed, the `package.json` file is updated to contain a `build` property, which can then be used for logging or other purposes.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "postinstall": "./node_modules/package-source-version/bin/update-package ./package.json"
  },
  "dependencies": {
    "package-source-version": "1.0.0"
  },
  "build": "cfd6857a2b7f55246091abe2ddc7556f9dd2c866"
}
```