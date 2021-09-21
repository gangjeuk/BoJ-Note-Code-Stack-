

const userName = document.getElementsByTagName("a")[0];
const note_icon = document.createElement("img");
note_icon.src = chrome.runtime.getURL("/img/note-icon.png");
const boj_memo_view = "#problem-memo"

let regexp = new RegExp("^/problem/[0-9]+$")
let problemLinks = document.getElementsByTagName("a");


let timeOut;
let finishTimeout = false;

// jQeury UI tooltip to tlp
$.widget.bridge("tlp", $.ui.tooltip);

// add button
problemLinks = [].slice.call(problemLinks)
        .filter(item => item.getAttribute('href') && item.getAttribute('href').match(regexp))
        .forEach((item) => {

        

            var parent = document.createElement("div");
            parent.setAttribute('class','note-icon-parent');
            
            

            $(item).before(parent);
            parent.appendChild(item);

            var text = document.createElement("a");
            text.setAttribute('class','note-icon');
            // text.setAttribute('href',item.getAttribute('href'));
            //text.setAttribute('rel', 'tooltip');
            //text.setAttribute('data-placement','right');
            //text.setAttribute('data-html','true');
            $(item).after(text);

            let sibling = parent.lastChild;

            
            
            // click and open note
            $(sibling).click(function(){
                if($('#drag_div').length === 0){

                    getPopupNoteContents(item,Loaded => {
                        $(Loaded).ready(function(){
                            insertNoteFormat();
                            updateNoteContent(Loaded);
                            noteSetting();
                            $('#close_btn').on("click",function(){
                                $('.note_container').slideToggle();
                            })
                            $('.note-icon').on("click",function(){
                                $('.note_container').slideToggle();
                            })
                        })
                    });
                }else{
                    getPopupNoteContents(item,Loaded=>{
                        $(Loaded).ready(function(){
                            updateNoteContent(Loaded);
                        })
                    });
                }
            })

            // click with ctrl to jump
            
        })
        $('.note-icon').append(note_icon)


// tooltip event --> should change 
    // TODO
    //delayHover(item,sibling);

    $('.note-icon').tlp({
        show: null,
        hide: {
            effect: "",
        },

        content: function(){
            if(!finishTimeout)
                return false;
                /*
            getTooltipNote(item,sibling,Loaded => {
                $(Loaded).ready(()=>{return Loaded;});
            });
            */
            return "sibal";
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

    $('.note-icon').mouseover(function(){
        var el = $(this);
        timeout = setTimeout(function(){
            finishTimeout = true;
            el.tlp("open");
            finishTimeout = false;
        }, 300);
    });
    $('.note-icon').mouseout(function(){
        clearTimeout(timeout);
    });