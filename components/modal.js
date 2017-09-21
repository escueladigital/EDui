"use strict";

// Crear e imprimir modal
var printModal = function printModal(content) {
  var modalContentEl = createCustomElement('div', {
    id: "ed-modal-content",
    class: "ed-modal-content"
  }, [content]),
      modalEl = createCustomElement('div', {
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