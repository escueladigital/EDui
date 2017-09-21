'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createVimeoModalContent = function createVimeoModalContent(vimeoCode) {
  return '<div class="video">\n  <iframe src="https://player.vimeo.com/video/' + vimeoCode + '?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n</div>';
};

var getVimeoCode = function getVimeoCode(url) {
  return url.slice('https://vimeo.com/'.length);
};

// Evento para abrir los modales en todos los links
var openVimeoModal = function openVimeoModal(selector) {
  var linksElements = [].concat(_toConsumableArray(document.querySelectorAll(selector))),
      links = linksElements.map(function (link) {
    return link.href;
  });

  linksElements.forEach(function (el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      printModal(createVimeoModalContent(getVimeoCode(links[i])));
    });
  });
};