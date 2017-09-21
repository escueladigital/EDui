const createVimeoModalContent = vimeoCode =>
`<div class="video">
  <iframe src="https://player.vimeo.com/video/${vimeoCode}?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>`;

const getVimeoCode = url => url.slice('https://vimeo.com/'.length);

// Evento para abrir los modales en todos los links
const openVimeoModal = selector => {
  let linksElements = [...document.querySelectorAll(selector)],
    links = linksElements.map(link => link.href);

  linksElements.forEach((el,i) => {
    el.addEventListener('click', e => {
      e.preventDefault();
      printModal(createVimeoModalContent(getVimeoCode(links[i])));
    })
  })
};
