// Add bubble
var bubbleDOM = document.createElement('div');
bubbleDOM.classList.add('selection_bubble');
document.body.appendChild(bubbleDOM);

var topSearchBar = document.createElement('input');
topSearchBar.setAttribute("type", "text");
topSearchBar.classList.add('top_search_bar');
bubbleDOM.appendChild(topSearchBar);

var selection = '';

function gText(e) {
    selection = (document.all) ? document.selection.createRange().text : document.getSelection();
    renderBubble(e.clientX, e.clientY, selection);
}

document.onmouseup = gText;
if (!document.all) {
    document.captureEvents(Event.MOUSEUP);
}

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
    bubbleDOM.innerHTML = selection;
    bubbleDOM.style.top = mouseY + 'px';
    bubbleDOM.style.left = mouseX + 'px';
    bubbleDOM.style.display = 'block';
}