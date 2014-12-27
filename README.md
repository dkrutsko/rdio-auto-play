# Rdio Autoplay <img align="right" src="http://dkrutsko.github.io/rdio-autoplay/content/icon.png" />

<p align="justify">Autoplay is a simple Javascript bookmark for Rdio which enables chain playing an artists' top songs as though they were in a list. It works by hooking various UI elements in order to determine which song is currently playing and then automatically clicking the next song when the current one is about to end. In addition, it also enables the use of the next and previous buttons to skip or repeat parts of the list as you'd normally expect. This bookmark has been tested with the latest versions of Chrome, Firefox and Internet Explorer.</p>

### Installation
<p align="justify">Autoplay comes as an auto-updating bookmark, which means you only ever have to install it once to get the latest version. To install, simply visit the product <a href="//dkrutsko.github.io/rdio-autoplay/">homepage</a> and drag and drop the autoplay button to your bookmarks bar. If you prefer, you can also manually create a new bookmark by copying and pasting the code below into the URL section of the bookmark.</p>

<pre>javascript:(function(){if(jQuery&amp;&amp;!window['rdio-autoplay']){var a=document.createElement('script');a.async=!0;a.src='//dkrutsko.github.io/rdio-autoplay/source/autoplay.js';document.documentElement.appendChild(a)}})();</pre>

### Usage
<p align="justify">To enable the features listed, you must first click the bookmark or execute the bookmarks code on the Rdio website. This only needs to be done once per site refresh as Rdio doesn't refresh the website when browsing music. Additionally, only a single instance of the code will execute, so don't need to worry about accidentally clicking the bookmark more than once.</p>
<p align="justify">For the functionality to work, you must first navigate to the artists' song page and then scroll all the way down to load as many songs as you want, this can also be done at any time. Then press play on any song in the list and it will automatically start the next song when the current one is about to finish, some truncation may occur. Please keep in mind that you must remain on the artists' song page for this functionality to continue working. If you navigated away from the page you will have to follow these steps again.</p>

### Contributing
<p align="justify">Autoplay is small, simple and just works. That being said, if you think your contribution is within the scope of this project then feel free to send me a message or submit a pull request. If you find a problem or would like to suggest a feature, please submit a report through the <a href="//github.com/dkrutsko/rdio-autoplay/issues">issues page</a>.</p>
<p align="justify">On the other hand, if you'd like to add entirely new features, morph Autoplay into a browser extension or do something quite different then please go ahead. This project is licensed under the <a href="//tldrlegal.com/license/zlib-libpng-license-(zlib)" target="_blank">ZLib license</a> to do with as you please. Drop me a line if you made something interesting.</p>

### Author
* Email: <dave@krutsko.net>
* Home: [dave.krutsko.net](http://dave.krutsko.net)
* GitHub: [github.com/dkrutsko](https://github.com/dkrutsko)