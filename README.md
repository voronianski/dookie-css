![Green Day's Dookie button](http://www.goodrock.com/images/Product/medium/b2402.jpg)

# doookie-css

CSS library built on top of the [Stylus](https://github.com/learnboost/stylus "Stylus") preprocessor.
It provides a couple of useful stylus mixins, utilities and components.

## How to install

At first install package into your project:

```bash
npm install dookie-css
```

### Express.js (Connect)

For express or connect framework you can simply include dookie ``middleware`` method into Stylus' compiler:

```javascript
var dookie = require('dookie-css');

...

app.configure(function(){
	...
	app.use(stylus.middleware({ src: __dirname + '/public', compile: dookie.middleware }));
})
```

More about Stylus middleware [here](http://learnboost.github.io/stylus/docs/middleware.html "Stylus connect middleware").

### Other environments

As for pure node.js or some other cases dookie has method called ``css``. Here is an example of simple static ``server.js`` using Stylus + dookie:

```javascript
var	fs = require('fs');
var http = require('http');
var	static = require('node-static');
var	stylus = require('stylus');
var	dookie = require('../dookie-css');

var app = http.createServer(handler);

var str = fs.readFileSync(__dirname + '/style.styl', 'utf8');

var files = new static.Server('./public');

// serve files on request
function handler(request, response) {
	request.addListener('end', function() {
		files.serve(request, response);
	});
}

// use stylus for styling
stylus(str)
	.use(dookie.css()) // call dookie
	.render(function (err, css) {
		if (err) {
			throw err;
		}
		fs.writeFileSync(__dirname + '/public/css/style.css', css, 'utf8');
	});

app.listen(8080);
```

So now all dookie utilities can be called within your ``.styl`` files and it's time to check lib's documentation.

## API Documentation

##### Reset global mixins

``reset()`` - simple base and recommended reset;

``normalize()`` - popular [normalize.css](https://github.com/necolas/normalize.css/) reset;

``fields-reset()`` - reset input fields from sometimes annoying browser based styles (on *::required*, *::valid*, *::invalid*, etc. pseudo-classes);

##### Common useful helpers

Shorter replacements for ``display: block | inline-block | none`` respectively:

``block()``, ``inline-block()``, ``hide()``

Frequently used text transformation and decoration properties shorthands:

``reset-case()``, ``upcase()``, ``lowcase()``, ``nodecorate()``

Font styles:

``bold()``, ``italic()``, ``normal()``

``fs: [your font-size]`` - font-size shortener

``fw: [your font-weight]`` - same for font weight

######Example:

```css
h2
	fs: 2em
	fw: 500
	italic()

.link
	block()
	nodecorate()
```

``clearfix()`` - basic clearfix mixin, simply add it to your class name or call ``base-classes()`` mixin within your project to have it in ``.clearfix`` class;

#####Global mixins

More to do..

## Why dookie?!

Because it's awesome [Green Day's](http://en.wikipedia.org/wiki/Green_Day-_Dookie "Dookie album wiki") album from childhood :)

---

**MIT Licensed**
(c) 2013 Dmitri Voronianski
