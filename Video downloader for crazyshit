// ==UserScript==
// @name          Video downloader for CrazyShit
// @namespace     https://github.com/Azadrim
// @author        Azadrim
// @description   Download the video from CrazyShit
// @copyright     https://github.com/Azadrim
// @license       GPL-3.0 License
// @version       1.0

// @homepageURL   https://github.com/Azadrim/Userscripts/
// @supportURL    https://github.com/Azadrim/Userscripts/issues
// @downloadURL   https://raw.githubusercontent.com/Azadrim/Userscripts/main/Video%20downloader%20for%20CrazyShit.user.js
// @updateURL     https://raw.githubusercontent.com/Azadrim/Userscripts/main/Video%20downloader%20for%20CrazyShit.user.js

// @match         https://crazyshit.com/cnt/medias/*
// @icon          https://www.google.com/s2/favicons?domain=crazyshit.com
// @grant         GM_download
// @run-at        document-end
// ==/UserScript==

(function() {
    'use strict';

    function capitalizeTheFirstLetterOfEachWord(words) {
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
            separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
                separateWord[i].substring(1);
        }
        return separateWord.join(' ');
    }


    var el = document.querySelector('.buttons').appendChild(document.createElement('a'));
    el.innerHTML = "Download";
    el.onclick = function () {
        el.onclick = null;
        el.innerHTML = "Download ✅";
        var url = document.querySelector('video').firstElementChild.src,
            extension = url.split('.').pop(),
            filename=capitalizeTheFirstLetterOfEachWord(document.querySelector('.content_title').innerText) + '.' + extension;
        GM_download(url, filename);
    };
})();
