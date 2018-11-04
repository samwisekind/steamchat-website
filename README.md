# Steamchat Podcast Website

1. [Installation](#markdown-header-installation)
2. [Database](#markdown-header-database)
3. [Deployment](#markdown-header-deployment)
    1. [Docker](#markdown-header-docker)
4. [Usage](#markdown-header-usage)
    1. [Quick Start](#markdown-header-quick-start)
    2. [General](#markdown-header-general)
    3. [Development](#markdown-header-development)
    4. [Testing](#markdown-header-testing)
5. [VSCode Config](#markdown-header-vscode-config)

## Installation

1. Clone the repository
2. Ensure you are using Node version >= 10 (`nvm install 10` / `nvm use 10`)
3. Install Node modules (`npm i`)
4. Then create a file name `.env` in the root of the repository with the following contents (insert values where nessecary):

```.properties
NODE_ENV=
NODE_ENC_KEY=
NODE_MONGO_URL=
NODE_MONGO_USER=
NODE_MONGO_PASS=
```

_Note:_ There is a `postinstall` script which builds both the server and assets. If this does not happen, run `npm run build`.

## Database

The app will attempt to connect to a MongoDB database with the URL as defined by `NODE_MONGO_URL` in the `.env` file.

## Deployment

The app runs on port 8888.

### Docker

To deploy with Docker, build and tag an image of the app by running the following command in the root of the repository:

```console
docker build . -t steamchat-website
```

Then run and publish the container by running the following command:

```console
docker run -p 8888:8888 steamchat-website
```

This will run the [`start` script](#markdown-header-general) in [`package.json`](package.json).

_Note:_ You will also need to define environment variables described in the [Installation](#markdown-header-installation) and [Database](#markdown-header-database) sections.

## Usage

The application is made up of the following parts:

* [`/config`](/config) contains configuration files
* [`/src`](/src) contains the server files which are transpiled by Babel to [`/dist`](/dist)
* [`/src/assets`](/src/assets) contains SCSS and JavaScript frontend assets which are compiled to [`/dist/public`](/dist/public)
* [`/tests`](/tests) contains unit and integration tests

### Quick Start

* **For development**, use `npm run watch`
* **For testing**, use `npm run test` and `npm run coverage`
* **For deployment**, use `npm run start`

### General

The following scripts build the server and assets, and run the server:

| Command | Description |
| --- | --- |
| ```npm run start``` | Run the server. |
| ```npm run build``` | Build both the server and assets. |
| ```npm run server:build``` | Build the server only. |
| ```npm run assets:build``` | Build the assets only. |

### Development

The following scripts automatically re-build and reload either both or only the server and assets when any changes are made to them:

| Command | Description |
| --- | --- |
| ```npm run watch``` | Build, run, and watch both the server and assets. |
| ```npm run server:watch``` | Build, run, and watch the server only. |
| ```npm run assets:watch``` | Build and watch the assets only. |

When running `npm run watch` or `npm run server:watch`, the server with be run with the Node debugger (as if using `--inspect`) and will build server files with inline sourcemaps.

### Testing

The following scripts run tests and generate coverage reports:

| Command | Description |
| --- | --- |
| ```npm run test``` | Run all tests. |
| ```npm run test:watch``` | Run and watch all tests. |
| ```npm run coverage``` | Generate a coverage report. |

## VSCode Config

Since the app builds compiled server and asset files to `dist/`, it may pollute the sidebar in VSCode. You can hide files and folders from the sidebar by adding the `.vscode/settings.json` file with the following:

```json
{
    "files.exclude": {
        "node_modules/": true,
        "dist/": true,
        "coverage/": true,
        ".nyc_output/": true,
    }
}
```
