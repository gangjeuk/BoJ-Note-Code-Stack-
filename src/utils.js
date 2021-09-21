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



function getTooltipNote(element,target,callback){
    if(element.hasAttribute('data-original-title') === false){
        getDom(`https://www.acmicpc.net${element.getAttribute('href')}`,dom => {
            const contents = dom.querySelector('#problem-memo-view');
            const pro_title = dom.querySelector('#problem_title').innerText;
            
            var pop_up_note;
            if(contents === null){
                pop_up_note = "#no";
            }else{
                pop_up_note = contents.innerText;
            }

            target.setAttribute('data-original-title',
                `<table style="text-align:left; border-spacing: 4px; border-collapse: separate;">
                    <tr>
                        <td><b>Title :${pro_title}</b></td>
                    </tr>
                    <tr>

                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><b>${pop_up_note}</b></td>
                    </tr>
                </table>`);
            callback(element);
        });
    }else{
        callback(element);
    }
}



function delayHover(item,element) {
    let timeOut;
    let finishTimeout = false;
    
    $(element).tlp({
        show: null,
        hide: {
            effect: "",
        },

        content: function(){
            if(!finishTimeout)
                return false;
            getTooltipNote(item,element,Loaded => {
                $(Loaded).ready(()=>{return Loaded;});
            });
        },

        open: function(event,ui){
        },
        close: function(event,ui){
            ui.tlp.hover(
                function(){
                    $(this).stop(true).fadeOut(400,1);
                },
                function(){
                    $(this).fadeOut("400",function(){$(this).remove();})
                }
            );
        }
    });

    $(element).mouseover(function(){
        timeout = setTimeout(function(){
            finishTimeout = true;
            $(element).tlp("open");
            finishTimeout = false;
        }, 300);
    });
    $(element).mouseout(function(){
        clearTimeout(timeout);
    });
}

