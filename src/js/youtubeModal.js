// Obtener el código del video y los parámetros adicionales
const getYoutTubeVideoCode = url => {
  let inicio = url.indexOf('?') + 3,
    final = url.indexOf('&',inicio),
    code = final === -1 ? url.slice(inicio) : url.slice(inicio,final),
    params = url.slice(final + 1);
  return final === -1 ? `${code}?` : `${code}?${params}&`;
};

// Crear contenido del modal
const createYouTubeModalContent = youTubeVideoCode =>
`<div class="video">
    <iframe src="https://www.youtube.com/embed/${youTubeVideoCode}autoplay=1" frameborder="0" allowfullscreen></iframe>
</div>`;



// Eventos para abrir los modales en todos los links
const openYouTubeModal = selector => {
  let linksElements = [...document.querySelectorAll(selector)],
    links = linksElements.map(link => link.href);
  linksElements.forEach((el,i) => {
    el.addEventListener('click', e => {
      e.preventDefault();
      printModal(createYouTubeModalContent(getYoutTubeVideoCode(links[i])));
    })
  })
};
