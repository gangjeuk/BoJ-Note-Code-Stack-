function getJson(url, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            callback(JSON.parse(request.responseText));
        } else {
            // TODO
        }
    };
    request.onerror = function () {
        // TODO
    };
    request.send();
}

function getDom(url, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const el = document.createElement('html');
            el.innerHTML = request.responseText;
            callback(el);
        } else {
            // TODO
        }
    };
    request.onerror = function () {
        // TODO
    };
    request.send();
}

const userName = document.getElementsByTagName("a")[0];
const note_icon = document.createElement("img");
note_icon.src = chrome.runtime.getURL("/img/note-icon.png");
const boj_memo_view = "#problem-memo"

let regexp = new RegExp("\.*/problem/[0-9]+$")
let problemLinks = document.getElementsByTagName("a");

problemLinks = [].slice.call(problemLinks)
        .filter(item => item.getAttribute('href') && item.getAttribute('href').match(regexp))
        .forEach((item) => {

            var text = document.createElement("a");
            text.setAttribute('class','note-icon');
            text.setAttribute('href',item.getAttribute('href'));
            text.setAttribute('rel', 'tooltip');
            text.setAttribute('data-placement','right');
            text.setAttribute('data-html','true');
            $(item).after(text);
            
        })
        $('.note-icon').append(note_icon)


        