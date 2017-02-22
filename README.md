Zephyr Login
============

[![Build Status](https://travis-ci.org/ZephyrVR/login.svg?branch=master)](https://travis-ci.org/ZephyrVR/login)
[![devDependencies Status](https://david-dm.org/ZephyrVR/login/dev-status.svg)](https://david-dm.org/ZephyrVR/login?type=dev)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/ZephyrVR/login/master/LICENSE)

Desktop application built with [Electron](http://electron.atom.io) which enables a user to quickly authenticate with [Zephyr Server](https://github.com/ZephyrVR/server).

## Usage
This program is intended for use with other software distributions (for example, [Zephyr Overlay](https://github.com/ZephyrVR/overlay)) to enable users to quickly and securely authenticate with [Zephyr Server](https://github.com/ZephyrVR/server).

If you're a developer, you just need a Zephyr API key and App ID to begin.

### Configuration
There are a couple of options to configure Zephyr Login depending on your preference.

#### Environment variables
You can set the following environment variables before execution to configure the utility:

 * `ZEPHYR_SERVER_BASE` - the base url of the [Zephyr Server](https://github.com/ZephyrVR/server) instance
 * `ZEPHYR_API_KEY` - your app's API key (keep secret)
 * `ZEPHYR_APP_ID` - the App ID associated with your application


#### Config file
Alternatively, you can configure the utility by either directly editing the `config.json` file found [here](https://github.com/ZephyrVR/login/blob/master/app/res/js/config.js) or by creating a file named `config-private.js` ([see example](https://gist.github.com/ThomasGaubert/17a0b0387ec1dc4081e44284ae679472)) in the same directory.

### Output
Upon successful login, a file named `token.json` will be created in your current working directory. This file contains the reponse from the Zephyr Server authentication result. Below is an example of such token:

```
{
   "name":"Username",
   "avatar":"https://steamcdn-a.akamaihd.net/.../image.jpg",
   "room":"Zephyr Room ID",
   "token":"Zephyr Token"
}
```