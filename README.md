# SmartVox

> Distributed audio-visual notation applcation.

This application is created using the [*Soundworks*](https://github.com/collective-soundworks/soundworks/) framework.

## Installing the application

To start the development of a new *Soundworks* application, we recommend the following sequence of commands:

```sh
$ git@github.com:belljonathan50/SmartVox0.1.git smartvox
$ cd smartvox
$ npm install
$ npm run watch
```

If you succeeded to execute all commands without errors, you can start connecting clients to the server.

## Available clients

- players: `http://you.ip/`
- conductor: `http://you.ip/conductor`

## Helper Scripts

The template includes a set of scripts to support the development of an application.
The scripts can be invoked through the `npm run` command:
 * `transpile` - creates an executable application from the ES2015 (ES6) sources
 * `start` - starts the application (i.e. its server).
 * `watch` - starts the server and watches the file system to do the necessary operations while developing

```shell
$ npm run transpile
$ npm run start
$ npm run watch
```

