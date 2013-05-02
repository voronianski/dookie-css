# unit tests
test:
	node_modules/.bin/mocha -R nyan ./test/spec

# phantomjs screenshots
screenshots:
	casperjs ./test/runTest.js