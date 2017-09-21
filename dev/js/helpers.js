// Crear elementos con atributos e hijo
const createCustomElement = (element,attributes,children) => {
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
const addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr,attrObj[attr])
  }
};

// Envolver un elemento con otro
const wrap = (selector, wrapElementType, attributesObj) => {
  const element = getElement(selector),
        nextSibling = element.nextElementSibling,
        parent = element.parentElement,
        wrapElement = createCustomElement(wrapElementType,attributesObj,element);

  nextSibling
    ? parent.insertBefore(wrapElement,nextSibling)
    : parent.appendChild(wrapElement);

  return wrapElement;
};

// Crear e imprimir modal
const printModal = content => {
  const modalContent = createCustomElement('div', {id: "ed-modal-content", class: "ed-modal-content"}, [content]),
          closeModal = createCustomElement('div', {id: "ed-close-modal", class: "ed-close-modal"}),
               modal = createCustomElement('div', {id: "ed-modal-container", class: "ed-modal-container"}, [modalContent,closeModal]);
  // dibujar modal
  document.body.appendChild(modal);
  // cerrar modal
  closeModal.addEventListener('click', () => document.body.removeChild(modal) )
};


// Retornar un elemento del DOM (revisar)
const getElement = elementOrSelector => {
  const el = elementOrSelector.nodeType === 1
    ? elementOrSelector
    : document.querySelector(elementOrSelector)
      ? document.querySelector(elementOrSelector)
      : false;
  if (el === false) console.error('Function getElement() requires a DOM element or a valid selector');
  return el
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
