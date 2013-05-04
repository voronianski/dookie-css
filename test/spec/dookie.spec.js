var path = require('path');
var should = require('should');
var stylus = require('stylus');
var dookie = require('../../');

describe('dookie-css utilities', function () {
	var styl, css;

	describe('simple-gradient() mixin', function () {
		beforeEach(function (done) {
			styl = 'simple-gradient(#f00, 20%)';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should add background property for older browsers', function () {
			css.should.include('background: #c00;');
		});

		it('should contain -webkit prefix', function () {
			css.should.include('background-image: -webkit-linear-gradient(top, #f33 0%, #c00 100%);');
		});

		it('should contain -moz prefix', function () {
			css.should.include('background-image: -moz-linear-gradient(top, #f33 0%, #c00 100%);');
		});
	});

	describe('size() mixin', function () {
		describe('with several dimensions', function () {
			beforeEach(function (done) {
				styl = 'size(200px, 100px)';

				stylusHelper(styl, function (err, res) {
					should.not.exist(err);
					should.exist(res);
					css = res.trim();
					done();
				});
			});

			it('should add different "width" and "height" properties', function () {
				css.should.equal('width: 200px;\nheight: 100px;');
			});
		});

		describe('with one dimension', function () {
			beforeEach(function (done) {
				styl = 'size(50px)';

				stylusHelper(styl, function (err, res) {
					should.not.exist(err);
					should.exist(res);
					css = res.trim();
					done();
				});
			});

			it('should create a foursquare', function () {
				css.should.equal('width: 50px;\nheight: 50px;');
			});
		});
	});

	describe('image-block() mixin', function () {
		var imgPath = __dirname + '/public/images/dookie.jpg';

		beforeEach(function (done) {
			styl = 'image-block("' + imgPath + '", 200px)';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should contain background image', function () {
			css.should.include('background: url("' + imgPath + '") no-repeat;');
		});

		it('should hide existed block content', function () {
			css.should.include('font: 0/0 a;');
		});

		it('should have dimensions', function () {
			css.should.include('width: 200px;\nheight: 200px;');
		});
	});

	describe('sprite() mixin', function () {
		var imgPath = __dirname + '/public/images/pixelhunter_logo.png';

		beforeEach(function (done) {
			styl = 'sprite-grid("' + imgPath +'", 0, 1, 44px)';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should position image due grid', function () {
			css.should.equal('background: url("' + imgPath + '") no-repeat;\nbackground-position: 0px -44px;');
		});
	});

	describe('triangle() mixin', function () {
		beforeEach(function (done) {
			styl = 'triangle(down, 15px, #f80)';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should create bulletproof css triangle', function () {
			css.should.equal('width: 0;\nheight: 0;\nborder-left: 15px solid transparent;\nborder-right: 15px solid transparent;\nborder-top: 15px solid #f80;');
		});
	});

	describe('font-face() mixin', function () {
		var fontPath = __dirname + '/public/fonts';

		beforeEach(function (done) {
			styl = 'font-face(OpenSansRegular, "' + fontPath +'")';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should create crossbrowser @font-face rule', function () {
			css.should.include('font-family: OpenSansRegular');
		});

		it('should contain .eot font', function () {
			css.should.include(fontPath + '/OpenSansRegular.eot');
		});

		it('should contain .eot?#iefix font', function () {
			css.should.include(fontPath + '/OpenSansRegular.eot?#iefix');
		});

		it('should contain .ttf font', function () {
			css.should.include(fontPath + '/OpenSansRegular.ttf');
		});

		it('should contain .woff font', function () {
			css.should.include(fontPath + '/OpenSansRegular.woff');
		});

		it('should contain .svg font', function () {
			css.should.include(fontPath + '/OpenSansRegular.svg');
		});
	});

	describe('text-overflow() mixin', function () {
		beforeEach(function (done) {
			styl = 'text-overflow(300px)';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should add ellipsis text overflow', function () {
			css.should.equal('text-overflow: ellipsis;\nwhite-space: nowrap;\noverflow: hidden;\nwidth: 300px;');
		});
	});

	describe('vendor prefixed properties', function () {
		beforeEach(function (done) {
			styl = '-prefix(border-radius, 3px)';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should add prefixes only from settings', function () {
			css.should.equal('-webkit-border-radius: 3px;\n-moz-border-radius: 3px;');
		});
	});

	describe('position mixins', function () {
		beforeEach(function (done) {
			styl = '-pos("absolute", top 5px left 10px)';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should translate to css positions', function () {
			css.should.equal('position: absolute;\ntop: 5px;\nleft: 10px;');
		});

		describe('position mixin without args', function () {
			beforeEach(function (done) {
				styl = 'relative()';

				stylusHelper(styl, function (err, res) {
					should.not.exist(err);
					should.exist(res);
					css = res.trim();
					done();
				});
			});

			it('should not contain any additional fields', function () {
				css.should.equal('position: relative;');
			});
		});
	});

	describe('heading() mixin', function () {
		beforeEach(function (done) {
			styl = 'heading()';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should add font-size from configuration', function () {
			css.should.include('font-size: 24px;')
		});

		it('should add proper margin', function () {
			css.should.include('margin: 7.5px 0');
		});

		it('should take color from settings default-color', function () {
			css.should.include('color: #aaa;');
		});
	});

	describe('display:inline-block with IE support', function () {
		beforeEach(function (done) {
			styl = 'inline-block()';

			stylusHelper(styl, function (err, res) {
				should.not.exist(err);
				should.exist(res);
				css = res.trim();
				done();
			});
		});

		it('should contain -moz-inline-stack by default', function () {
			css.should.include('display: -moz-inline-stack;');
		});

		it('should add specific IE properties', function () {
			css.should.equal('display: inline-block;\ndisplay: -moz-inline-stack;\nvertical-align: baseline;\nzoom: 1;\n*display: inline;\n*vertical-align: auto;');
		});
	});

	// use dookie and get css from stylus string
	function stylusHelper (str, callback) {
		var config = path.join(__dirname, '..', '/styl/_config');

		stylus(str)
			.use(dookie.css())
			.import(config)
			.render(function (err, css) {
				callback(err, css);
			});
	}
});