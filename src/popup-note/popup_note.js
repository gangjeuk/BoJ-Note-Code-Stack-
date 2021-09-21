var Imgs = new Array(
chrome.runtime.getURL("/img/popup-note/baseline_add_black_24dp.png"),
chrome.runtime.getURL("/img/popup-note/baseline_remove_black_24dp.png"),
chrome.runtime.getURL("/img/popup-note/baseline_close_black_24dp.png"),
chrome.runtime.getURL("/img/popup-note/baseline_format_bold_black_24dp.png"),
chrome.runtime.getURL("/img/popup-note/baseline_format_italic_black_24dp.png"),
chrome.runtime.getURL("/img/popup-note/baseline_format_underlined_black_24dp.png"),
chrome.runtime.getURL("/img/popup-note/baseline_format_strikethrough_black_24dp.png"),
chrome.runtime.getURL("/img/popup-note/baseline_save_black_24dp.png"),
  )


const noteFormat = `<div class="note animated" id="drag_div">
    <div class="note_container">

        <div class="note_option" id="drag_divheader">
            <button type="button" id="add_btn"><img class="add" title="add" src="baseline_add_black_24dp.png"></button>
            <button type="button" id="remove_btn"><img class="remove" title="remove" src="baseline_remove_black_24dp.png"></button>
            <button type="button" id="close_btn"><img class="close" title="close" src="baseline_close_black_24dp.png"></button>
        </div>
        

        
        <div class="note_style">
            <button type="button" id="bold_btn"><img class="bold" title="bold" src="baseline_format_bold_black_24dp.png"></button>
            <button type="button" id="italic_btn"><img class="italic" title="italic" src="baseline_format_italic_black_24dp.png"></button>
            <button type="button" id="underline_btn"><img class="underline" title="underline" src="baseline_format_underlined_black_24dp.png"></button>
            <button type="button" id="st_btn"><img class="st" title="strikeThrough" src="baseline_format_strikethrough_black_24dp.png"></button>
            <button type="button" id="save_btn"><img class="save" title="save" src="baseline_save_black_24dp.png"></button>

        </div>

    </div>

</div>`

export class popupNote{
  constructor() {
    this.format = noteFormat;
    this.imgs = Imgs;

    this.isCircle = true;
    this.isSaved = false;

    var NoteBtns = document.getElementById('drag_div').getElementsByTagName('img');
    for(let i = 0; i < NoteBtns.length; i++){
      NoteBtns[i].src = Imgs[i];
    }
    
  }


  getSavedNote(){
    let memos = document.getElementById('problem-memo-view');
    if(memos.hasChildNodes == true){
      return memos.childNodes;
    }else{
      return null;
    }
  }

}


function pushImgs(){
  var NoteBtns = document.getElementById('drag_div').getElementsByTagName('img');
  for(var i = 0; i < NoteBtns.length; i++){
    NoteBtns[i].src = Imgs[i];
  }

}

var parseAndPushContents = function () {
  
};

/* give Setting */
function noteSetting(){
  
  /* resizeable scrollable */

  $( function() {
    $( ".note" ).resizable({
      minHeight: 200,
      minWidth: 180
    });
  });


  /* hide option and style section */

  $(".note_container").focusin(function(){
    $(".note_style").show();
    $(".note_option").show("slow");
  });

  $(".note_container").focusout(function(){
    $(".note_option").hide();
    $(".note_style").fadeOut();

  });




  /* draggable */
  dragElement(document.getElementById("drag_div"));
  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

/* get and update Note */

function insertNoteFormat(){
  $('.wrapper').before(noteFormat);
  pushImgs();
}

function updateNoteContent(noteContents){
  $('.note_content').remove();
  $('#drag_divheader').after(noteContents);
}


function getPopupNoteContents(element,callback){
  if(element.hasAttribute('data-original-title') === false){
      getDom(`https://www.acmicpc.net${element.getAttribute('href')}`,dom => {
          const contents = dom.querySelector('.note_content');
          const pro_title = dom.querySelector('#problem_title').innerText;
          
          
          callback(contents);
      });
  }else{
      callback(element);
  }
}
