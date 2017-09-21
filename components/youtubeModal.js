'use strict';

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
var openYouTubeModal = function openYouTubeModal(selector) {
  var linksElements = [].concat(_toConsumableArray(document.querySelectorAll(selector))),
      links = linksElements.map(function (link) {
    return link.href;
  });
  linksElements.forEach(function (el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      printModal(createYouTubeModalContent(getYoutTubeVideoCode(links[i])));
    });
  });
};