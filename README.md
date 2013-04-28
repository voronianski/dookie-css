![Green Day's Dookie button](http://www.goodrock.com/images/Product/medium/b2402.jpg)

#doookie-css

CSS library built on top of the [Stylus](https://github.com/learnboost/stylus "Stylus") preprocessor.
It provides a couple of useful stylus mixins, utilities and components.

##How to install

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

###Other environments

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
	.use(dookie.css()) // call dookie.css() function
	.render(function (err, css) {
		if (err) {
			throw err;
		}
		fs.writeFileSync(__dirname + '/public/css/style.css', css, 'utf8');
	});

app.listen(8080);
```

So now all dookie utilities can be called within your ``.styl`` files and it's time to check lib's [documentation](https://github.com/voronianski/dookie-css#documentation).

##Documentation

###Settings

Dookie contains default configuration [settings.styl](https://github.com/voronianski/dookie-css/blob/master/lib/settings.styl). So this depends on your needs, but it's recommended to create your own ``_settings.styl`` (could be named whatever you like) and specify or overwrite existed variables.

######Examples:

Here is custom ``_settings.styl`` file which specifies vendors that are needed, and path to the folder with images:

```css
img-path = '../images/'
vendors = webkit moz
```

Now in your main Stylus file add ``@import`` configuration and start to use dookie easily:

```css
@import '_settings'

...
```

###Reset mixins

These helpers are global:

``reset()`` - simple base and recommended reset;

``normalize()`` - popular [normalize.css](https://github.com/necolas/normalize.css/) reset;

``fields-reset()`` - reset input fields from sometimes annoying browser based styles (on *::required*, *::valid*, *::invalid*, etc. pseudo-classes);

###Common useful helpers

Shorter replacements for ``display: block | inline-block | none`` respectively:

``block()``, ``inline-block()``, ``hide()``;

Frequently used text transformation and decoration properties shorthands:

``reset-case()``, ``upcase()``, ``lowcase()``, ``nodecorate()``;

Font styles:

``bold()``, ``italic()``, ``normal()``

#####fs: [your font-size]

font-size shortener;

#####fw: [your font-weight]

font-weight shortener;

######Examples:

```css
h2
	fs: 2em
	fw: 500
	italic()

.link
	block()
	nodecorate()

/* yields => */
h2 {
	font-size: 2em;
	font-weight: 500;
	font-style: italic;
}

.link {
	display: block;
	text-decoration: none;
}
```

#####clearfix()

basic clearfix, simply add it to your class name or call [global mixin](https://github.com/voronianski/dookie-css#global-mixins "Global mixins") ``base-classes()`` within your project to have it in ``.clearfix`` class;

#####size: [width, height]

cool and useful dimensions shortener, example:

```css
.box
	size: 30px

.longbox
	size: 100px 20px

/* yields => */
.box {
	width: 30px;
	height: 30px;
}

.longbox {
	width: 100px;
	height: 20px;
}
```

#####bg: [path], [args optional]

background mixin shortener, example:

```css
.logo
	bg: 'logo.png'

.cat
	bg: 'cat.jpg' 100px 80px no-repeat #DDD

/* yields => */
.logo {
	background: url("../images/logo.jpg") no-repeat;
}

.cat {
	background: url("../images/cat.jpg") 100px 80px no-repeat #DDD;
}
```
*Note:* if you specify images folder in your [settings](https://github.com/voronianski/dookie-css#settings) ``img-path`` variable it allows you to not put only picture file name in all dookie mixins;

#####image-block: [path], [dimensions optional]

mixin that replaces block with image specified in it.

*Note:* ``.png`` images could skip dimensions, because of Stylus native ``image-size()`` built-in function, example:

```css
.replacer
	image-block: 'default.png'

/* yields => */
.replacer {
	background: url("../images/default.png") no-repeat;
	font: 0/0 a;
	text-shadow: none;
	color: transparent;
	width: 300px;
	height: 200px;
}
```

#####text-overflow: [width], [type optional]

useful when long text line need to be overflowed, default type is *ellipsis*, example:

```css
.description
	text-overflow: 300px

/* yields => */
.description {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 300px;
}
```

#####text-hide()

hiding text mixin;

#####no-select()

disallow user to select element;

#####round()

makes element rounded corners, useful for large ones;

#####opacity: [opacity]

same as native css property but if your [settings](https://github.com/voronianski/dookie-css#settings) set ``ie-support`` to ``true`` mixin adds old-school IE ``filter`` property by itself;

#####triangle: [up|down|left|right], [size|default: 10px], [color|default: #000]

cool pure css triangle mixin, example:

```css
.triangle
	triangle: down 15px #F80

/* yields => */
.triangle {
	width: 0;
	height: 0;
	border-left: 15px solid transparent;
	border-right: 15px solid transparent;
	border-top: 15px solid #F80;
}
```

###Positioning

Dookie allows you to shorten css element positioning while using simply one line property.

#####absolute: [name value], ...

#####relative: [name value], ...

#####fixed: [name value], ...

#####static: [name value], ...

######Example:

```css
.box
	absolute: top 10px left 15px

/* yields => */
.box {
	position: absolute;
	top: 0px;
	right: 5px;
}
```

###Sprites

Dookie has several helpers to simplify your work with sprites.

#####sprite-grid: [path], [x], [y], [grid]

basic grid helper, *[path]* to your sprite picture, *[x]*, *[y]* - square counts where icon is placed and *[grid]* param is your grid step (also can be as 2 params - ``gridX`` and ``gridY``), example:

```css
.sprite-pic
	sprite-grid: 'sprite.png' 1 5 32px


/* yields => */
.sprite-pic {
	background: url("../images/sprite.png") no-repeat;
	background-position: -64px -32px;
}
```

#####sprite-replace: [path], [x], [y], [grid]

same as previous one but also replaces text within an element with icon from the sprite;

#####sprite-inline: [path], [x], [y], [width], [height], [grid]

inline images typical use cases for are icons next to text links, currently sets icon only before the text;

#####sprite-padded: [path], [x], [y], [width], [height], [grid]

this use case comes up when text isn’t allowed to wrap around a sprite image;

*Note:* nice article describing these techniques by [Niels Matthijs](http://coding.smashingmagazine.com/2012/04/11/css-sprites-revisited/ "CSS Sprites Revisited");

###Vendor prefixes

Dookie intelligently simplifies usage of css properties that mostly need to be prefixed. Only thing that you should do is to setup in your ``_settings.styl`` which prefixes you want to use (by default all of them are included). List of property mixins:

#####box-shadow: [args...]

#####border-radius: [args...]

#####box-sizing: [args...]

#####animation: [args...]

#####transition: [args...]

#####transformation: [args...]

#####perspective: [args...]

#####backface-visibility: [args...]

#####filters: [args...]

*Note:* Properties like ``animation``, ``transition``, ``transform`` and ``perspective`` also include all separate dependent props like ``animation-name``, ``transition-delay``, ``perspective-origin`` etc.

###Easings

Custom timing functions useful for [ui-transitions](http://www.ui-transitions.com/), see all of them in action [here](http://easings.net):

#####ease-in- quad, cubic, quart, quint, sine, expo, circ, back

#####ease-out- quad, cubic, quart, quint, sine, expo, circ, back

#####ease-in-out- quad, cubic, quart, quint, sine, expo, circ, back


######Example:
```css
.animated
	transition: all 300ms ease-in-quad

/* yields => */
.animated {
	-webkit-transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
	-moz-transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
	-o-transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
	-ms-transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
	transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}
```

###Gradients

#####linear-gradient([start], [stops...])

mixin should be called within the property (``background-image`` or ``background`` depends on what you prefer), example:

```css
.gradient
	background-image: linear-gradient(red, orange, yellow 80%)

/* yields => */
.gradient {
	background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f00), color-stop(0.33333333333333326, #ffa500), color-stop(0.8, #ff0));
	background-image: -moz-linear-gradient(top, #f00 0%, #ffa500 33.33333333333333%, #ff0 80%);
	background-image: -webkit-linear-gradient(top, #f00 0%, #ffa500 33.33333333333333%, #ff0 80%);
	background-image: -o-linear-gradient(top, #f00 0%, #ffa500 33.33333333333333%, #ff0 80%);
	background-image: -ms-linear-gradient(top, #f00 0%, #ffa500 33.33333333333333%, #ff0 80%);
	background-image: linear-gradient(top, #f00 0%, #ffa500 33.33333333333333%, #ff0 80%);
}
```

#####radial-gradient([stops...])

same as previous one but radial, example:

```css
.circle
	background-image: radial-gradient(#f1c40f, #f39c12 50%)

/* yields => */
.circle {
	background-image: -webkit-gradient(radial, center center 0px, center center 100%, color-stop(0, #f1c40f), color-stop(0.5, #f39c12), );
	background-image: -moz-radial-gradient(center, ellipse cover, #f1c40f 0%, #f39c12 50%);
	background-image: -webkit-radial-gradient(center, ellipse cover, #f1c40f 0%, #f39c12 50%);
	background-image: -o-radial-gradient(center, ellipse cover, #f1c40f 0%, #f39c12 50%);
	background-image: -ms-radial-gradient(center, ellipse cover, #f1c40f 0%, #f39c12 50%);
	background-image: radial-gradient(ellipse at center, #f1c40f 0%, #f39c12 50%);
}
```

#####gradient: [colorStart], [colorStop]

shorthand for two colors linear-gradient, example:

```css
.box
	gradient: #F80 #F00

/* yields => */
.box {
	background: #f00;
	background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f80), color-stop(1, #f00));
	background-image: -moz-linear-gradient(top, #f80 0%, #f00 100%);
	background-image: -webkit-linear-gradient(top, #f80 0%, #f00 100%);
	background-image: -o-linear-gradient(top, #f80 0%, #f00 100%);
	background-image: -ms-linear-gradient(top, #f80 0%, #f00 100%);
	background-image: linear-gradient(top, #f80 0%, #f00 100%);
}
```

#####simple-gradient: [color], [strength percents|default is 10%]

generates linear-gradient from one color;

###Global mixins

As [reset helpers](https://github.com/voronianski/dookie-css#reset-global-mixins) these mixins are global and should be called not within css selector but in file root.

#####base-classes()

adds couple of useful classes that you might add anyways, full list of them:

```css
.left, .right, .clear, .hide, .bold, .italic, .bullet, .clearfix
```

#####text-selection: [highlight color], [text color is 'white' unless specified]

selection background and text color;

#####font-face: [name], [folder], [weight optional], [style optional]

[bulletproof](http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax) @font-face mixin, keep in mind that font name should be the same as font filename;

######Example:

```css
font-face: DIN, '/fonts'

/* in css this becomes => */
@font-face
	font-family: 'DIN';
	src: url('DIN.eot');
	src: url('DIN.eot?#iefix') format('embedded-opentype'),
		 url('DIN.woff') format('woff'),
		 url('DIN.ttf') format('truetype'),
		 url('DIN.svg#DIN') format('svg');
	font-weight: normal;
	font-style: normal;
```

##Contribute

##Test

##Why dookie?!

Because it's awesome [Green Day's](http://en.wikipedia.org/wiki/Green_Day-_Dookie "Dookie album wiki") album from my childhood :)

---

**MIT Licensed**
(c) 2013 Dmitri Voronianski
