// ==UserScript==
// @name          Theleaknetwork - Dll all
// @namespace     https://github.com/Azadrim
// @author        Azadrim
// @description   Dl on theleaknetwork
// @copyright     https://github.com/Azadrim
// @license       GPL-3.0 License
// @version       1.0

// @homepageURL   https://github.com/Azadrim/Userscripts/
// @supportURL    https://github.com/Azadrim/Userscripts/issues
// @downloadURL   https://raw.githubusercontent.com/Azadrim/Userscripts/main/Theleaknetwork%20-%20Dll%20all.user.js
// @updateURL     https://raw.githubusercontent.com/Azadrim/Userscripts/main/Theleaknetwork%20-%20Dll%20all.user.js

// @run-at        document-end
// @match         https://theleaknetwork.com/files/*
// @icon          https://www.google.com/s2/favicons?domain=theleaknetwork.com
// @grant         none
// ==/UserScript==

function run() {

    var aDlAll=[]
    document.querySelectorAll(':scope td a').forEach((e)=>{
        if (e.text == 'Download') {
            let sTmp;

            sTmp = e.parentElement.previousSibling.previousSibling.previousSibling.textContent // Get name from the column
            sTmp += '.' + e.href.split(/[#?]/)[0].split('.').pop().trim();

            e.setAttribute('download', sTmp)

            aDlAll.push(e);
        }
    });

    var el = document.querySelector('.iq-card-header').appendChild(document.createElement('a'));
    el.classList.add('btn', 'btn-primary');
    el.innerHTML = 'Download All (' + aDlAll.length + ')';
    el.onclick = function() {
        downloadFiles(aDlAll);
    };

    function downloadFiles(arr, value) {
        value = value || 0;
        setTimeout(function () {
            arr[value++].click();
            if (value < arr.length) downloadFiles(arr, value);
        }, 1 * 1000);
    }
};

window.addEventListener('load', function () {
    setTimeout(function () {
        run()
    }, 1 * 1000);
});
