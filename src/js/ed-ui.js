import {edModal} from "./modal";
import {openVimeoModal} from "./vimeoModal";
import {openYouTubeModal} from "./youtubeModal";
import {edTabs} from "./tabs";

// Exportar objetos al ambito global para reutilizarlos en otras librerias
// No es la mejor forma pero funciona hasta encontrar un mejor modo
// Idea sacada de http://www.mattburkedev.com/export-a-global-to-the-window-object-with-browserify/

export const EDui = () => {
  window.edModal = edModal;
  window.openYouTubeModal = openYouTubeModal;
  window.openVimeoModal = openVimeoModal;
  window.edTabs = edTabs;
};
