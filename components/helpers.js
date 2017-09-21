'use strict';

// Crear elementos con atributos e hijo
var createCustomElement = function createCustomElement(element, attributes, children) {
  var customElement = document.createElement(element);
  if (children !== undefined) children.forEach(function (el) {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement, attributes);
  return customElement;
};

// Añadir un objeto de atributos a un elemento
var addAttributes = function addAttributes(element, attrObj) {
  for (var attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr]);
  }
};

// Envolver un elemento con otro
var wrap = function wrap(selector, wrapElementType, attributesObj) {
  var element = getElement(selector),
      nextSibling = element.nextElementSibling,
      parent = element.parentElement,
      wrapElement = createCustomElement(wrapElementType, attributesObj, element);

  nextSibling ? parent.insertBefore(wrapElement, nextSibling) : parent.appendChild(wrapElement);

  return wrapElement;
};

// Retornar un elemento del DOM (revisar)
var getElement = function getElement(elementOrSelector) {
  var el = elementOrSelector.nodeType === 1 ? elementOrSelector : document.querySelector(elementOrSelector) ? document.querySelector(elementOrSelector) : false;
  if (el === false) console.error('Function getElement() requires a DOM element or a valid selector');
  return el;
};

// Media queries
var mediaQuery = function mediaQuery(breakpoint, cb) {
  var isChangeSize = function isChangeSize(mql) {
    return cb(mql.matches);
  };
  breakpoint.addListener(isChangeSize);
  isChangeSize(breakpoint);
};

// From (EDgrid equivalent)
// cb receive a boolean argument from mediaQuery() function
var from = function from(breakpoint, cb) {
  var bp = window.matchMedia('(min-width: ' + breakpoint + ')');
  mediaQuery(bp, cb);
};

// To (EDgrid equivalent)
// cb receive a boolean argument from mediaQuery() function
var to = function to(breakpoint, cb) {
  var bp = window.matchMedia('(max-width: ' + breakpoint + ')');
  mediaQuery(bp, cb);
};