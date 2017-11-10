(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.edUi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _modal = require("./modal");

var _vimeoModal = require("./vimeoModal");

var _youtubeModal = require("./youtubeModal");

var _tabs = require("./tabs");

// Exportar objetos al ambito global para reutilizarlos en otras librerias
// No es la mejor forma pero funciona hasta encontrar un mejor modo
// Idea sacada de http://www.mattburkedev.com/export-a-global-to-the-window-object-with-browserify/

var eduiGlobal = true;

if (eduiGlobal) {
  window.edModal = _modal.edModal;
  window.openYouTubeModal = _youtubeModal.openYouTubeModal;
  window.openVimeoModal = _vimeoModal.openVimeoModal;
  window.edTabs = _tabs.edTabs;
}

},{"./modal":3,"./tabs":4,"./vimeoModal":5,"./youtubeModal":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Crear elementos con atributos e hijo
var createCustomElement = exports.createCustomElement = function createCustomElement(element, attributes, children) {
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
var addAttributes = exports.addAttributes = function addAttributes(element, attrObj) {
  for (var attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr]);
  }
};

// Envolver un elemento con otro
var wrap = exports.wrap = function wrap(selector, wrapElementType, attributesObj) {
  var element = getElement(selector),
      nextSibling = element.nextElementSibling,
      parent = element.parentElement,
      wrapElement = createCustomElement(wrapElementType, attributesObj, element);

  nextSibling ? parent.insertBefore(wrapElement, nextSibling) : parent.appendChild(wrapElement);

  return wrapElement;
};

// Retornar un elemento del DOM (revisar)
var getElement = exports.getElement = function getElement(elementOrSelector) {
  var e = void 0,
      g = void 0;
  if (elementOrSelector.nodeType === 1) {
    e = elementOrSelector;
  } else {
    g = document.querySelector(elementOrSelector);
    if (document.querySelector(g)) {
      e = document.querySelector(g);
    } else {
      e = document.createElement('div');
      console.error('Function getElement() requires a DOM element\n    or a valid selector. It has been created a placeholder element to avoid\n    execution errors, please fixed as soon as posible');
    }
  }
  return e;
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edModal = undefined;

var _helpers = require("./helpers");

// Crear e imprimir modal
var edModal = exports.edModal = function edModal(content) {
  var modalContentEl = (0, _helpers.createCustomElement)('div', {
    id: "ed-modal-content",
    class: "ed-modal-content"
  }, [content]),
      modalEl = (0, _helpers.createCustomElement)('div', {
    id: "ed-modal-container",
    class: "ed-modal-container"
  }, [modalContentEl]);

  // Imprimir modal
  document.body.appendChild(modalEl);

  // Remover modal
  var removeModal = function removeModal() {
    return document.body.removeChild(modalEl);
  };

  // cerrar modal con click
  modalEl.addEventListener('click', function (e) {
    if (e.target === modalEl) removeModal();
  });

  // cerrar modal con escape
  var offCloseModalEsc = function offCloseModalEsc() {
    return removeEventListener('keyup', closeModalEsc);
  };
  var closeModalEsc = function closeModalEsc(e) {
    if (e.key === "Escape") {
      removeModal();
      offCloseModalEsc();
    }
  };
  addEventListener('keyup', closeModalEsc);
};

},{"./helpers":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var edTabs = exports.edTabs = function edTabs() {
  var container = document.querySelector('.edui-tabs'),
      tabsContainer = container.querySelector('.tabs'),
      panelsContainer = container.querySelector('.panels'),
      tabs = [].concat(_toConsumableArray(tabsContainer.querySelectorAll('.tab'))),
      panels = [].concat(_toConsumableArray(panelsContainer.querySelectorAll('.panel')));

  tabs[0].classList.add('active');
  panels[0].classList.add('active');

  tabsContainer.addEventListener('click', function (e) {
    var t = e.target,
        i = tabs.indexOf(t);
    if (e.target.classList.contains('tab')) {
      tabs.map(function (tab) {
        return tab.classList.remove('active');
      });
      panels.map(function (panel) {
        return panel.classList.remove('active');
      });
      t.classList.add('active');
      panels[i].classList.add('active');
    }
  });
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openVimeoModal = undefined;

var _modal = require('./modal');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createVimeoModalContent = function createVimeoModalContent(vimeoCode) {
  return '<div class="video">\n  <iframe src="https://player.vimeo.com/video/' + vimeoCode + '?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n</div>';
};

var getVimeoCode = function getVimeoCode(url) {
  return url.slice('https://vimeo.com/'.length);
};

// Evento para abrir los modales en todos los links
var openVimeoModal = exports.openVimeoModal = function openVimeoModal(selector) {
  var linksElements = [].concat(_toConsumableArray(document.querySelectorAll(selector))),
      links = linksElements.map(function (link) {
    return link.href;
  });

  linksElements.forEach(function (el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      (0, _modal.edModal)(createVimeoModalContent(getVimeoCode(links[i])));
    });
  });
};

},{"./modal":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openYouTubeModal = undefined;

var _modal = require('./modal');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Obtener el código del video y los parámetros adicionales
var getYoutTubeVideoCode = function getYoutTubeVideoCode(url) {
  var inicio = url.indexOf('?') + 3,
      final = url.indexOf('&', inicio),
      code = final === -1 ? url.slice(inicio) : url.slice(inicio, final),
      params = url.slice(final + 1);
  return final === -1 ? code + '?' : code + '?' + params + '&';
};

// Crear contenido del modal
var createYouTubeModalContent = function createYouTubeModalContent(youTubeVideoCode) {
  return '<div class="video">\n    <iframe src="https://www.youtube.com/embed/' + youTubeVideoCode + 'autoplay=1" frameborder="0" allowfullscreen></iframe>\n</div>';
};

// Eventos para abrir los modales en todos los links
var openYouTubeModal = exports.openYouTubeModal = function openYouTubeModal(selector) {
  var linksElements = [].concat(_toConsumableArray(document.querySelectorAll(selector))),
      links = linksElements.map(function (link) {
    return link.href;
  });
  linksElements.forEach(function (el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      (0, _modal.edModal)(createYouTubeModalContent(getYoutTubeVideoCode(links[i])));
    });
  });
};

},{"./modal":3}]},{},[1])(1)
});
//# sourceMappingURL=ed-ui.js.map
