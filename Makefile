test-cov:
	rm -rf app-cov
	jscoverage app app-cov
	JS_COV=true ./node_modules/.bin/mocha -G -R json-cov > coverage.json

test-watch:
	NODE_ENV=test nodemon ./node_modules/.bin/mocha -R min -G

.PHONY: test test-cov