import {createCustomElement} from "./helpers";

// Crear e imprimir modal
export const edModal = content => {
  const modalContentEl = createCustomElement('div', {
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
  const removeModal = () => document.body.removeChild(modalEl);

  // cerrar modal con click
  modalEl.addEventListener('click', e => {
    if (e.target === modalEl) removeModal();
  });

  // cerrar modal con escape
  const offCloseModalEsc = () => removeEventListener('keyup', closeModalEsc);
  const closeModalEsc = e => {
    if (e.key === "Escape") {
      removeModal();
      offCloseModalEsc();
    }
  };
  addEventListener('keyup', closeModalEsc);
};
