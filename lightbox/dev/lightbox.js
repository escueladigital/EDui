// al hacer click en una imagen se abra su version grande

// Obtener la galería de imágenes
const getImages = container => [...container.querySelectorAll('img')];

// Obtener un array de las rutas de las imagenes grandes
const getLargeImages = gallery => gallery
  .map( el => el.src)
  .map( el => el.replace('thumb', 'large'));

// Obtener las descripciones de las imágenes
const getDescriptions = gallery => gallery.map( el => el.alt);

// Capturar el evento click en la galería para abrir el lightbox
const openLigthboxEvent = (container,gallery,larges,descriptions) => {
  container.addEventListener('click', e => {
    let el = e.target,
      i = gallery.indexOf(el);
    if (el.tagName === 'IMG') {
      openLightbox(gallery,i,larges,descriptions);
    }
  })
};

// Imprimir overlay del lightbox en el body
const openLightbox = (gallery,i,larges,descriptions) => {
  let lightboxElement = document.createElement('div');
  lightboxElement.innerHTML = `
    <div class="lightbox-overlay">
      <figure class="lightbox-container">
        <div class="close-modal">✖</div>
        <img src="${larges[i]}" class="ligthbox-image">
        <figcaption>
          <p class="lightbox-description">${descriptions[i]}</p>
          <nav class="lightbox-navigation">
            <a href="#" class="lightbox-navigation__button prev">◀</a>
            <span class="lightbox-navigation__counter">Imagen ${i + 1} de ${gallery.length}</span>
            <a href="#" class="lightbox-navigation__button next">▶</a>
          </nav>
        </figcaption>
      </figure>
    </div>
  `;
  lightboxElement.id = 'lightbox';
  document.body.appendChild(lightboxElement);
  closeModal(lightboxElement);
  navigateLightbox(lightboxElement,i,larges,descriptions);
};

const closeModal = modalElement => {
  let closeModal = modalElement.querySelector('.close-modal');
  closeModal.addEventListener('click', e => {
    e.preventDefault();
    document.body.removeChild(modalElement);
  })
};

const navigateLightbox = (lightboxElement,i,larges,descriptions) => {
  let prevButton = lightboxElement.querySelector('.prev'),
    nextButton = lightboxElement.querySelector('.next'),
    image = lightboxElement.querySelector('img'),
    description = lightboxElement.querySelector('p'),
    counter = lightboxElement.querySelector('span'),
    closeButton = lightboxElement.querySelector('.close-modal');

  window.addEventListener('keyup', e => {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft')  prevButton.click();
    if (e.key === 'Escape') closeButton.click();
  });
  lightboxElement.addEventListener('click', e => {
    e.preventDefault();
    let target = e.target;

    if ( target === prevButton) {
      if ( i > 0 ) {
        image.src = larges[i - 1];
        i--
      } else {
        image.src = larges[larges.length - 1];
        i = larges.length - 1;
      }
    } else if (target === nextButton) {
      if ( i <  larges.length - 1 ) {
        image.src = larges[i + 1];
        i++
      } else {
        image.src = larges[0];
        i = 0;
      }
    }

    description.textContent = descriptions[i];
    counter.textContent = `Imagen ${i + 1} de ${larges.length}`;

  })
};

const lightbox = container => {
  let images = getImages(container),
    larges = getLargeImages(images),
    descriptions = getDescriptions(images);
  openLigthboxEvent(container,images,larges,descriptions);
};
