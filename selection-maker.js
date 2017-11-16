class SelectionMaker extends BaseElement {

  createdCallback() {

    this.list = [{
      label: 'שאלה',
      id: 'q'
    }, {
      label: 'הסבר',
      id: 'c'
    }];
    
    this.targetSelection = document.querySelector(this.params.target);
    
    this.targetSelection.addEventListener("mouseup", ()=>{
      this.getRangeSelection = window.getSelection ? window.getSelection() : document.selection.createRange();
      this.getRangeSelection = this.getRangeSelection.getRangeAt(0);
    }
    );

    this.template();

  }

  addClassToSelection(range, markerId) {
    // FF : IE
    // if (sel.getRangeAt) {

    //       sel.type != "Range"
    // thats for FF
    //       sel.baseNode.parentElement
    //       let range = sel.getRangeAt(0);

    let newNode = document.createElement("span");
    newNode.setAttribute('class', markerId);
    range.surroundContents(newNode);

    //} else {
    //and thats for IE7
    //  sel.pasteHTML('<span class="'+ markerId + '">' + sel.htmlText + '</span>');
    //}
  }

  removeClassToSelection(range, markerId) {
    range.commonAncestorContainer.parentElement.outerHTML = range.commonAncestorContainer.parentElement.innerHTML;
  }

  onClick(markerId) {
    if (!this.getRangeSelection.commonAncestorContainer.parentElement.className.includes(markerId)) {

            var ssrange = document.createRange();
  //     ssrange.selectNodeContents(this.targetSelection);
      ssrange.setStart(this.targetSelection, 0);
      ssrange.setEnd(this.getRangeSelection.startContainer, this.getRangeSelection.startOffset);

      this.params.onselection({
        startOffset: this.getRangeSelection.startOffset + ssrange.toString().length,
        endOffset: this.getRangeSelection.endOffset + ssrange.toString().length,
        text: this.getRangeSelection.toString(),
        type: markerId,
      });

      this.addClassToSelection(this.getRangeSelection, markerId);



    } else {
      this.removeClassToSelection(this.getRangeSelection, markerId);
      this.params.onunselection({
        startOffset: this.getRangeSelection.startOffset,
        endOffset: this.getRangeSelection.endOffset,
        text: this.getRangeSelection.toString(),
        type: markerId,
      });
    }

  }

  template() {
    this.innerHTML = `${this.repeatTmp(this.list, item => ` 
        <label
          onclick="${this.parentPath}.onClick('${item.id}')"
          class="${item.id}" marker-id="${item.id}"
        >
          ${item.label}
        </label>
      `)}
    `;
  }
}

document.registerElement("selection-maker", SelectionMaker);
