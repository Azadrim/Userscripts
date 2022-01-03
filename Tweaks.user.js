// ==UserScript==
// @name          Tweaks
// @namespace     https://github.com/Azadrim
// @author        Azadrim
// @description   Tweaks multiple websites
// @copyright     https://github.com/Azadrim
// @license       GPL-3.0 License
// @version       1.0

// @homepageURL   https://github.com/Azadrim/Userscripts/
// @supportURL    https://github.com/Azadrim/Userscripts/issues
// @downloadURL   https://raw.githubusercontent.com/Azadrim/Userscripts/main/Tweaks.user.js
// @updateURL     https://raw.githubusercontent.com/Azadrim/Userscripts/main/Tweaks.user.js

// @run-at        document-end
// @match         http://*/*
// @match         https://*/*
// @grant         unsafeWindow
// @grant         GM_registerMenuCommand
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    GM_registerMenuCommand('Open first video in new tab', function() {
        window.open(document.querySelector('video').firstElementChild.src || document.querySelector('video').src, '_blank').focus();
        /*var el = document.body.appendChild(document.createElement('a'));
        el.setAttribute("target", "_blank");
        el.href = document.querySelector('video').firstElementChild.src || document.querySelector('video').src;
        el.click();
        el.remove();*/
    }, 'o');

    GM_registerMenuCommand('Download video (crazyshit)', function() {
        function capitalizeTheFirstLetterOfEachWord(words) {
            var separateWord = words.toLowerCase().split(' ');
            for (var i = 0; i < separateWord.length; i++) {
                separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
                    separateWord[i].substring(1);
            }
            return separateWord.join(' ');
        }

        var url = document.querySelector('video').firstElementChild.src,
            extension = url.split('.').pop(),
            filename=capitalizeTheFirstLetterOfEachWord(document.querySelector('.content_title').innerText) + '.' + extension,
            el = document.body.appendChild(document.createElement('a'));
        el.setAttribute('download', filename);
        el.href = url;
        el.click();
        el.remove();
    }, 'd');

    GM_registerMenuCommand('Copy all images link (influencersgonewild.com)', function() {
        var el = document.body.appendChild(document.createElement('textarea'));
        el.style.display = 'none';
        document.querySelectorAll('.alignnone').forEach( (e) => {el.value += e.src + "\n"});
        el.focus();
        el.select();
        document.execCommand('copy');
        el.remove();
    }, 'c');

    GM_registerMenuCommand('Reddit export', function() {
        var user="",
            subr=""
        document.querySelectorAll(':scope div[role="menu"] a[role="menuitem"] span').forEach((e) => {
            if (e.innerText.startsWith("r/")) {
                subr+=e.innerText.replace("r/","") + '\n'
            }
            if (e.innerText.startsWith("u/")) {
                user+=e.innerText.replace("u/","") + '\n'
            }
        });
        if (user != "") {
            console.log(user)
        }
        if (subr != "") {
            console.log(subr)
        }
    }, 'r');

    GM_registerMenuCommand('Mega download', function() {
        function dlMega() {
            var counter_first = document.querySelector(':scope .viewer-bars .counter .first').innerText,
                counter_last = document.querySelector(':scope .viewer-bars .counter .last').innerText,
                filename = document.querySelector(':scope .viewer-bars .file-name').innerText,
                filesrc = document.querySelector(':scope .content .img1').src

            if (filesrc) {
                console.log(counter_first +'/'+counter_last + ' : ' + filename)
                GM_download(filesrc, filename);
            } else {
                console.error(counter_first +'/'+counter_last + ' : ' + filename)
            }
        }
        dlMega();
    }, 'm');

    GM_registerMenuCommand('Mega download album', function() {
        var dlNumber = 0,
            index = 1,
            attempt = 0,
            toComplete = ``;

        if (toComplete.length > 0) {
            console.log('Number to complete: ' + toComplete.split(/\r\n|\r|\n/).length)
        }

        function waiting(filesrc) {
            console.warn('Image blob not found => Waiting 10s. \n' + filesrc)
            index = 2;
            attempt++;
            setTimeout(dlMega, 10 * 1000);
        }

        function goNext() {
            document.querySelector('.gallery-btn.next').click();
            attempt = 0;
            setTimeout(dlMega, 2.5 * 1000);
        }

        function dlImage(counter_first, counter_last, filename, filesrc) {
            console.log(counter_first + ' (' + ++dlNumber + ') / ' + counter_last + ' : ' + filename + '\n' + filesrc)
            setTimeout(GM_download(filesrc, filename), 2.5 * 1000);
            index = 1;
            attempt = 0;
        }

        function dlMega() {
            var counter_first = document.querySelector(':scope .viewer-bars .counter .first').innerText,
                counter_last = document.querySelector(':scope .viewer-bars .counter .last').innerText,
                filename = document.querySelector(':scope .viewer-bars .file-name').innerText,
                filesrc = document.querySelector(':scope .content .img' + index)?.src

            // Check if src found, else try default image
            if (index > 1) {
                if (!filesrc?.includes('blob')) {
                    filesrc = document.querySelector(':scope .content .img1')?.src
                }
            }

            // Check if image is a blob, should be, else it's still loading
            if (filesrc?.includes('blob')) {
                if (toComplete.length == 0 || toComplete.includes(filename)) {
                    dlImage(counter_first, counter_last, filename, filesrc)
                }
                if (counter_first != counter_last) {
                    goNext()
                }
            } else {
                if ((toComplete.length == 0 || toComplete.includes(filename)) && attempt < 10) {
                    waiting(filesrc)
                }else {
                    // After 10 try dl anyway
                    if (attempt >10) {
                        dlImage(counter_first, counter_last, filename, filesrc)
                    }
                    if (counter_first != counter_last) {
                        goNext()
                    }
                }
            }
        }

        dlMega();
    }, 'a');
})();
