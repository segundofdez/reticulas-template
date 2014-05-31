Reticulas template
=======

Basic template to start [reticulas-cssframework][4]



Install
--------------

1.	Install with [composer][1] create-project on trunk folder:
	```bash
	composer create-project reticulas/template trunk -s dev
	```

2.  It´s almost done!. Now you have [lessphp][0], a compiler for LESS written in PHP and the basic template installed.

3.  To finish you have to install [reticulas-cssframework][4]. You can do it with [bower][3]:
	```bash
	cd trunk
	bower install
	```
4. This create a folder called vendor inside public with all that you need. As you can see, adds [less js][2] too if you want to use for client-side (modern browsers only).

------------------------------------

5.  **If you don´t use [bower][3], and want to add [reticulas-cssframework][4] you must to add manually:**
   * After download the latest stable version of reticulas-template, inside "public" create the directory structure "vendor/reticulas-cssframework"
   * Download [reticulas-cssframework][4]. Copy the folder 'less' and paste inside "public/vendor/reticulas-cssframework"

6.  **If you don´t use [composer][1], and want to use [lessphp][0] you must to add manually:**
   * After download the latest stable version of reticulas-template, inside "root" create the directory structure "vendor/leafo/lessphp"
   * Download [lessphp][0]. Copy the file 'lessc.inc.php' and paste inside "vendor/leafo/lessphp"
   * To finish, you need to edit the file 'styles.php' (inside folder "css") and replace the line with the new route

   ```php
   include "../../vendor/leafo/lessphp/lessc.inc.php";
   ```

7.  **If you don´t use [bower][3], and want to use [lessjs][2] you must to add manually:**
   * After download the latest stable version of reticulas-template, inside "public" create the directory structure "vendor/less/dist"
   * Download [lessjs][2]. Copy the file 'less.js' and paste inside "public/vendor/less/dist"

what's inside
----------

<ul>
	<li><strong>bin</strong>
		<ul>
			<li>
				<strong>Grunt</strong>
				<ul>
					<li>uglify</li>
					<li>less</li>
					<li>imagemin</li>
					<li>htmlmin</li>
					<li>watch</li>
				</ul>
			</li>
		</ul>
	</li>
	<li><strong>web</strong>
		<ul>
			<li><strong>css</strong>
	            <ul>
	               <li>import.less (import files from reticulas-cssframework - less - Import your own style sheets if you want)</li>
	               <li>reticulas.less (your styles goes here - less)</li>
	               <li>styles.php (used by lessphp)</li>
	               <li>import.scss (import files from reticulas-cssframework - sass - Import your own style sheets if you want)</li>
	               <li>_reticulas.scss (your styles goes here - sass)</li>
	            </ul>
         	</li>
         	<li>index.html (basic template)</li>
         	<li><strong>vendor</strong>
	         	<ul>
	         		<li><strong>reticulas-cssframework</strong> (https://github.com/segundofdez/reticulas-cssframework)</li>
	         		<li><strong>less</strong> (lesscss library if you want to use with js - http://lesscss.org/)</li>
	         		<li><strong>jQuery</strong> (jQuery is a fast, small, and feature-rich JavaScript library - http://jquery.com/</li>
	         	</ul>
        	</li>
      	</ul>
   	</li>
    <li><strong>vendor</strong>
		<ul>
			<li>lessphp library if you want to use with php - http://leafo.net/lessphp/</li>
		</ul>
    </li>
</ul>


[0]:http://leafo.net/lessphp/
[1]:http://getcomposer.org/
[2]:http://lesscss.org/
[3]:http://bower.io/
[4]:https://github.com/segundofdez/reticulas-cssframework

