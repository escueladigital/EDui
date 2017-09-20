// Crear elementos con atributos e hijo
const createCustomElement = (element,attributes,child) => {
  let customElement = document.createElement(element);
  if (child !== null && child !== undefined) {
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
  const modalContent = createCustomElement('div', {id: "ed-modal-content", class: "ed-modal-content"}, content),
    modal = createCustomElement('div', {id: "ed-modal-container", class: "ed-modal-container"}, modalContent),
    closeModal = createCustomElement('div', {id: "ed-close-modal", class: "ed-close-modal"});
  // imprimir botón cerrar modal
  modal.appendChild(closeModal);
  // dibujar modal
  document.body.appendChild(modal);
  // cerrar modal
  document.body.addEventListener('click', e => {
    if (e.target.id === 'ed-close-modal') {
      document.body.removeChild(modal);
    }
  })
};
