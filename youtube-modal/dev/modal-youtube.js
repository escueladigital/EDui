// Obtener el código del video y los parámetros adicionales
const getYoutubeVideoCode = url =>
  /(\&)/.test(url)                //verifica si tiene o no parametros.
  ? `${/(?:v=)(.+)/.exec(url)[1]}&`  //con parametros
  : `${/(?:v=)(\w+)/.exec(url)[1]}?` //sin parametros


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
      printYouTubeModal(getYoutubeVideoCode(links[i]))
    })
  })
};
