// Obtener el código del video y los parámetros adicionales
const getYoutTubeVideoCode = url => {
  let inicio = url.indexOf('?') + 3,
    final = url.indexOf('&',inicio),
    code = final === -1 ? url.slice(inicio) : url.slice(inicio,final),
    params = url.slice(final + 1);
  return final === -1 ? `${code}?` : `${code}?${params}&`;
};

// Dibujar el modal
const printYouTubeModal = youTubeVideoCode => {
  const modal = document.createElement('div');
  modal.id = "modalYouTube";
  modal.classList.add('ed-modal');
  modal.innerHTML = `
  <div class="modalContent">
    <div id="closeModal" class="ed-closeModal"></div>
    <div class="video">
      <iframe src="https://www.youtube.com/embed/${youTubeVideoCode}autoplay=1" frameborder="0" allowfullscreen></iframe>
    </div>
  </div> 
  `;
  document.body.appendChild(modal);
  closeModal(modal);
};

// cerrar el modal
const closeModal = modalElement => {
  modalElement.querySelector('#closeModal').addEventListener('click', () => {
    document.body.removeChild(modalElement);
  });
  window.addEventListener('keyup', e => {
    if (e.key === 'Escape') document.body.removeChild(modalElement);
  })
};

// Eventos para abrir los modales en todos los links
const openYouTubeModal = selector => {
  let linksElements = [...document.querySelectorAll(selector)],
    links = linksElements.map(link => link.href);
  linksElements.forEach((el,i) => {
    el.addEventListener('click', e => {
      e.preventDefault();
      printYouTubeModal(getYoutTubeVideoCode(links[i]))
    })
  })
};
