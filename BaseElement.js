function repeatTmp(list, map) {
  if (list && !(list instanceof Array)) {
    return Object.keys(list).map((key,index)=>map(list[key], index, key)).join("") || '';
  }
  return list && list.map(map).join("") || '';
}

class BaseElement extends HTMLElement {
// export default class BaseElement extends HTMLElement {
  constructor() {
    super();
  }

  createdCallback() {
  }

  get params() {
    const self = this;
    if (!this._params) {
      this._params = new Proxy({},{
        get(obj, prop) {
          if (obj[prop] != undefined)
            return obj[prop];

          let attrValue = self.getAttribute(prop);
          attrValue && (attrValue = attrValue.replace("this.", "self."));
          obj[prop] = attrValue && ((attrValue.indexOf(".") > -1) ? eval(attrValue) : attrValue);

          if (typeof obj[prop] == "function")
            obj[prop] = obj[prop].bind(eval(attrValue.substring(0, attrValue.indexOf(")") + 1)));
          else {
            try {
              obj[prop] = eval(attrValue);
            } catch (e) {}
          }
          return obj[prop];
        },
        set(obj, prop, value) {
          return true;
        }
      });
    }
    return this._params;
  }

  useCompiler(libraryName, data) {
    this._useCompiler = libraryName;
    setTimeout(()=>RunLibraries[libraryName] && RunLibraries[libraryName](this, data));
  }

  repeatTmp(list, map) {
    if (list && !(list instanceof Array)) {
      return Object.keys(list).map((key,index)=>map(list[key], index, key)).join("") || '';
    }
    return list && list.map(map).join("") || '';
  }

  get parentPath() {
    let nodeName = this.nodeName.toLocaleLowerCase();
    return `this.closest('${nodeName}')`;
  }

  get methods() {
    return Object.getOwnPropertyNames(this).filter((p) => {
       if(typeof this[p] === 'function')
        return p
    })
  }
  detachedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}
}
