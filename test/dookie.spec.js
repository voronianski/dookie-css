describe('dookie-css utilities', function () {
	var stylus = require('stylus'),
		dookie = require('../');

	var styl, css;

	describe('simple-gradient(color, strength) mixin', function () {
		beforeEach(function (done) {
			styl = 'simple-gradient(#F00, 20%)';

			stylusHelper(styl, function (err, res) {
				if (err) throw err;
				css = res;
				done();
			});
		});

		it('should add background property for older browsers', function () {
			expect(css).toContain('background: #c00;');
		});

		it('should contain vendor prefixed css -webkit, -moz, -ms, -o', function () {
			expect(css).toContain('background-image: -webkit-gradient(linear');
		});
	});

	function stylusHelper (str, callback) {
		if (!str && typeof str !== 'string') {
			return callback(err);
		}

		stylus(str)
			.use(dookie.css())
			.render(function (err, css) {
				callback(err, css);
			});
	}
});