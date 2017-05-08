// Crear elementos con atributos e hijo
const createCustomElement = (element,attributes,child) => {
  let customElement = document.createElement(element);
  if (child !== null) {
    child.nodeType === 1 || child.nodeType === 11 ? customElement.appendChild(child) : customElement.innerHTML = child;
  }
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
  const element = document.querySelector(selector);
  if (element) {
    const nextSibling = element.nextElementSibling,
      parent = element.parentElement,
      wrapElement = createCustomElement(wrapElementType,attributesObj,element);

    nextSibling
      ? parent.insertBefore(wrapElement,nextSibling)
      : parent.appendChild(wrapElement);

    return wrapElement;
  }
};
