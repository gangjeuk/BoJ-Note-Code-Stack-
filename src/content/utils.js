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

function getNote(element){
    if(element.hasAttribute('data-original-title') === false){
        getDom(`https://www.acmicpc.net${element.getAttribute('href')}`,dom => {
            const contents = dom.querySelector('#problem-memo-view');
            const pro_title = dom.querySelector('#problem_title').innerText;
            
            var pop_up_note;
            if(contents === null){
                pop_up_note = "#nothing";
            }else{
                pop_up_note = contents.innerText;
            }

            element.setAttribute('data-original-title',
                `<table style="text-align:left; border-spacing: 4px; border-collapse: separate;">
                    <tr>
                        <td><b>Title :</b></td>
                        <td>${pro_title}</td>
                    </tr>
                    <tr>
                        <td>니가 쓴거</td>
                    </tr>
                    <tr>
                        <td><b>${pop_up_note}</b></td>
                    </tr>
                </table>`);

            $(element).tooltip('show');
        });
    }else{
        $(element).tooltip();
    }

}

function delayHover(element, over, out, delay) {
    var timer;
    $(element).hover(function(){
        if (timer) {
            clearTimeout(timer);
            timer = null;
        } else {
            over.apply(this, arguments);
        }
    }, function(){
        var that = this,
            args = $.makeArray(arguments);
            timer = setTimeout(function(){
            out.apply(that, args);
            timer = null;
        }, 0);
    });
}



$('.note-icon').each(function(){
    var memoLink = $(this).attr('href');
    delayHover(this,function(){
        getNote(this);
        

    },function(){
        $(element).tooltip('hide');

    },2000);

})