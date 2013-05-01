#Test dookie-css with mocha.js & casper.js

Dookie uses [mocha.js](http://visionmedia.github.io/mocha) for unit testing of mixins and [casper.js](https://github.com/n1k0/casperjs/) for visualizing them and with ability to see what can be wrong.

You can run dookie unit tests with several commands and go with this command into your terminal:

```bash
npm test
```

or this (if you have mocha installed globally):

```bash
make test
```

##Screenshots

To test Dookie visually you'll need to start test server at first:

```bash
node ./test/server.js
```

and in **new terminal** window run test itself (be sure that you have [casper.js installed](http://casperjs.org/installation.html) on your machine):

```bash
make screenshots
```

then you can check how mixins actually look like while going into *./test/screenshots* folder.