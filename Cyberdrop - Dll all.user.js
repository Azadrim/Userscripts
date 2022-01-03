// ==UserScript==
// @name          Cyberdrop - Dll all
// @namespace     https://github.com/Azadrim
// @author        Azadrim
// @description   Dl on Cyberdrop
// @copyright     https://github.com/Azadrim
// @license       GPL-3.0 License
// @version       1.0

// @homepageURL   https://github.com/Azadrim/Userscripts/
// @supportURL    https://github.com/Azadrim/Userscripts/issues
// @downloadURL   https://raw.githubusercontent.com/Azadrim/Userscripts/main/Cyberdrop%20-%20Dll%20all.user.js
// @updateURL     https://raw.githubusercontent.com/Azadrim/Userscripts/main/Cyberdrop%20-%20Dll%20all.user.js

// @run-at        document-end
// @match         https://cyberdrop.me/a/*
// @icon          https://www.google.com/s2/favicons?domain=cyberdrop.me
// @require       https://use.fontawesome.com/releases/v5.15.2/js/all.js
// @grant         none
// ==/UserScript==

function run() {

    var aDlAll=[]
    var title=document.querySelector('#title').title;
    document.querySelectorAll('.image').forEach((e)=>{
        let sTmp;
        sTmp = title + '_' + (aDlAll.length + 1) + '.' + e.href.split(/[#?]/)[0].split('.').pop().trim();
        e.setAttribute('download', sTmp);
        aDlAll.push(e);
    });

    var el = document.body.appendChild(document.createElement('div'));
    el.innerHTML = `
    <span class="my_export" style="position: fixed; bottom: 10px; left: 10px; color: red">
        <a><i class="fas fa-fw fa-file-download" ></i></a>
    </span>
    `;

    el.onclick = function() {
        console.log('DL ' + aDlAll.length)
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


    setTimeout(function () {
        //run()
        var tmp = "";
        document.querySelectorAll('.image').forEach((e)=>{tmp+= e.href + '\n'});
        console.log(tmp)

    }, 1 * 1000);
