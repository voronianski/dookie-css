# unit tests
test:
	node_modules/.bin/mocha -R nyan ./test/spec

# phantomjs screenshots
screenshots:
	cd test
	node ./runner.js