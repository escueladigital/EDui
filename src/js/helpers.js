// Crear elementos con atributos e hijo
export const createCustomElement = (element,attributes,children) => {
  let customElement = document.createElement(element);
  if (children !== undefined) children.forEach(el => {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement,attributes);
  return customElement;
};

// Añadir un objeto de atributos a un elemento
export const addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr,attrObj[attr])
  }
};

// Envolver un elemento con otro
export const wrap = (selector, wrapElementType, attributesObj) => {
  const element = getElement(selector),
        nextSibling = element.nextElementSibling,
        parent = element.parentElement,
        wrapElement = createCustomElement(wrapElementType,attributesObj,element);

  nextSibling
    ? parent.insertBefore(wrapElement,nextSibling)
    : parent.appendChild(wrapElement);

  return wrapElement;
};

// Retornar un elemento del DOM (revisar)
export const getElement = elementOrSelector => {
  let e, g;
  if (elementOrSelector.nodeType === 1) {
    e = elementOrSelector;
  } else {
    g = document.querySelector(elementOrSelector);
    if (document.querySelector(g)) {
      e = document.querySelector(g)
    } else {
      e = document.createElement('div');
      console.error(`Function getElement() requires a DOM element
    or a valid selector. It has been created a placeholder element to avoid
    execution errors, please fixed as soon as posible`);
    }
  }
  return e;
};


// Media queries
const mediaQuery = (breakpoint,cb) => {
  const isChangeSize = mql => cb(mql.matches);
  breakpoint.addListener(isChangeSize);
  isChangeSize(breakpoint);
};

// From (EDgrid equivalent)
// cb receive a boolean argument from mediaQuery() function
const from = (breakpoint, cb) => {
  const bp = window.matchMedia(`(min-width: ${breakpoint})`);
  mediaQuery(bp,cb)
};

// To (EDgrid equivalent)
// cb receive a boolean argument from mediaQuery() function
const to = (breakpoint, cb) => {
  const bp = window.matchMedia(`(max-width: ${breakpoint})`);
  mediaQuery(bp,cb)
};
