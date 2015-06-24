quick startup for WP development on a local LAMP server

put in the themes folder and push into a directory and push into a seperate directory called BUILD.

name all templates 'template-whateverthetemplateisfor.php'

RUN NPM INSTALL FIRST
=====================


Steps to set up wordpress site
==============================
1. Run `sudo npm install` to install all the needed gulp tasks.
1. In `gulpfile.js`, change the `buildDir` variable to the appropriate folder name. I usually do something like `<nameofproject>-build`.
2. Site directory is generated in `footer.php` to be used in scripting.
3. In `header.php`, change the `<title>` copy to the name of the site you are building.
4. Set up your variables for width breaks in `less/variables.less` & `js/site.js`.
5. Create your favicons.
6. In `style.css`, change the content up at the top so it relates to the site you're building.
7. Run `gulp build` once to create the new build directory / theme.

Generator I use for favicons
----------------------------

I use [this generator](http://www.favicomatic.com/). Make sure you select "Every damn size, sir!" to get all the different sizes made.


Notes
-----


* When you're done and ready to go live, put your analytics in `footer.php` and also drop the `.htaccess` file into your site's `wp-content` directory.
