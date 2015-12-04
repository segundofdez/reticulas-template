# Reticulas template


Basic template to start [reticulas-cssframework][4]



## Install


1.  Install with [composer][1] create-project on trunk folder:
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

1.  Watch the app

    Run a server

    Browser sync: less, html, js

    ```bash
    gulp watch
    ```

2.  Generate dist folder

    html: minified

    styles: errors, autoprefixer, minified, sourcemap

    js: concat, minified

    Optimize images (png, jpg, gif and svg)

    ```bash
    gulp dist
    ```

[1]:http://getcomposer.org/
[2]:http://lesscss.org/
[3]:http://bower.io/
[4]:https://github.com/segundofdez/reticulas-cssframework
[5]:https://nodejs.org/

