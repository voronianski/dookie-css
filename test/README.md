#Test dookie-css with mocha.js & casper.js

Dookie uses [mocha.js](http://visionmedia.github.io/mocha) for unit testing of mixins and [casper.js](https://github.com/n1k0/casperjs/) for visualizing them.

You can run unit tests with several commands:

```bash
npm test
```

or

```bash
make test
```

##Screenshots

To test Dookie visually you'll need to install all dependencies:

```bash
npm install
```

and then start test server:

```bash
node ./test/server.js
```

and in **new terminal window** run test itself (be sure that you have [casper.js installed](http://casperjs.org/installation.html) on your machine):

```bash
make screenshots
```

Then you can check how mixins actually look like while going into *./test/screenshots* folder.