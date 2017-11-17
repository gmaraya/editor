jQuery(function ($) {
    function log(msg) {
        console.log('LOG: ' + msg);
    }

    var mainContent = document.getElementById("mainContent");

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

    var selection = '',
        getRangeSelection,
        popupOpened = false;

    function addClassToSelection(range, markerId) {
        let newNode = document.createElement("span");
        newNode.setAttribute('data-markerid', markerId);
        newNode.classList.add("q");
        range.surroundContents(newNode);
    }

    function showBubble(e) {
        if (popupOpened) {
            resetBubble(e);
            return;
        }

        log('Open Popup');

        popupOpened = true;

        getRangeSelection = window.getSelection ? window.getSelection() : document.selection.createRange();
        getRangeSelection = getRangeSelection.getRangeAt(0);

        selection = (document.all) ? document.selection.createRange().text : document.getSelection().toString();

        if (selection.length > 0) {
            renderBubble(e.clientX, e.clientY);
        }
    }
    function resetBubble(e) {
        log('Close Popup');

        popupOpened = false;

        topSearchBar.value = '';
        bubbleDOM.style.display = 'none';
    }

    //mainContent.onmousedown = resetBubble;

    mainContent.onmouseup = showBubble;

    if (!document.all) {
        mainContent.captureEvents(Event.MOUSEUP);
    }

    // Move that bubble to the appropriate location.
    function renderBubble(mouseX, mouseY) {
        $(bubbleBody).on('click', 'a', function (e) {
            e.preventDefault();

            log('On Click inside Popup');

            var action = $(this).data('action');

            if (!action) {
                return;
            }

            addClassToSelection(getRangeSelection, getRangeSelection.startOffset + '_' + getRangeSelection.endOffset);
        });

        var popupContent = jQuery('#popup-content');
        bubbleBody.innerHTML = popupContent.html();

        bubbleDOM.style.top = mouseY + 'px';
        bubbleDOM.style.left = mouseX + 'px';
        bubbleDOM.style.display = 'block';
    }
});