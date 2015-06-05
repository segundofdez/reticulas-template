# Reticulas template


Basic template to start [reticulas-cssframework][4]



## Install


1.	Install with [composer][1] create-project on trunk folder:
	```bash
	composer create-project reticulas/template trunk -s dev
	```

2.  Install [node][5] and [bower][3] dependencies:
	```bash
	cd trunk
	npm install
	bower install
	```

## Gulp tasks

	```bash
	gulp watch
	```
	html: livereload
	styles: errors, autoprefixer, minified, rename, sourcemap, notify and livereload
	js: concat, minified and notify


	```bash
	gulp images
	```
	Optimize images (png, jpg, gif and svg) with gulp-imagemin


	```bash
	gulp styleguide
	```
	Generate styleguide with sc5-styleguide



[1]:http://getcomposer.org/
[2]:http://lesscss.org/
[3]:http://bower.io/
[4]:https://github.com/segundofdez/reticulas-cssframework
[5]:https://nodejs.org/

