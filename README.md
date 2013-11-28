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


How to use with lessphp
-----------------------
Link the styles.php:
```HTML
<link rel="stylesheet" href="css/styles.php">
```
How to use with lessjs
----------------------
Link the import.less stylesheets with the rel set to “stylesheet/less”:

```HTML
<link rel="stylesheet/less" href="css/import.less">
```
and include the less.js in the ```  <head> ``` element of your page, like so:

```HTML
<script src="vendor/less/dist/less-1.5.1.min.js" type="text/javascript"></script>
```

what's inside
----------

<ul>
	<li><strong>public</strong>
		<ul>
			<li><strong>css</strong>
	            <ul>
	               <li>import.less (import files from reticulas-cssframework - Import your own style sheets if you want)</li>
	               <li>reticulas.less (your styles goes here)</li>
	               <li>styles.php (used by lessphp)</li>
	            </ul>
         	</li>
         	<li>index.html (basic template)</li>
         	<li><strong>vendor</strong>
	         	<ul>
	         		<li><strong>reticulas-cssframework</strong> (https://github.com/segundofdez/reticulas-cssframework)</li>
	         		<li><strong>less</strong> (lesscss library if you want to use with js - http://lesscss.org/)</li>
	         	</ul>
        	</li>
      	</ul>
   	</li>
    <li><strong>vendor</strong> (lessphp library if you want to use with php - http://leafo.net/lessphp/)</li>
</ul>


[0]:http://leafo.net/lessphp/
[1]:http://getcomposer.org/
[2]:http://lesscss.org/
[3]:http://bower.io/
[4]:https://github.com/segundofdez/reticulas-cssframework

