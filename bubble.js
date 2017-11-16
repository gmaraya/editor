// Add bubble
var bubbleDOM = document.createElement('div');
bubbleDOM.classList.add('selection_bubble');
document.body.appendChild(bubbleDOM);

var topSearchBar = document.createElement('input');
topSearchBar.setAttribute("type", "text");
topSearchBar.setAttribute("placeholder", "Search");
topSearchBar.classList.add('bubbleTopSearchBar');
bubbleDOM.appendChild(topSearchBar);

var bubbleBody = document.createElement('div');
bubbleBody.classList.add('bubbleBody');
bubbleDOM.appendChild(bubbleBody);

var anchorsBar = document.createElement('div');
anchorsBar.classList.add('bubbleAnchors');
bubbleDOM.appendChild(anchorsBar);


var selection = '';

function showBubble(e) {
    selection = (document.all) ? document.selection.createRange().text : document.getSelection().toString();
    if (selection.length > 0) {
        renderBubble(e.clientX, e.clientY);
    }
}
function resetBubble(e) {
    topSearchBar.value = '';
    bubbleDOM.style.display = 'none';
}

document.onmousedown = resetBubble;
document.onmouseup = showBubble;

if (!document.all) {
    document.captureEvents(Event.MOUSEUP);
}

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY) {
    var popupContent = jQuery( '#popup-content');
    bubbleBody.innerHTML = popupContent.html();

    bubbleDOM.style.top = mouseY + 'px';
    bubbleDOM.style.left = mouseX + 'px';
    bubbleDOM.style.display = 'block';
}