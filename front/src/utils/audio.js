const SONS = [
  { id: 'coco',        label: 'Coco',        arquivo: '/coco.ogg' },
  { id: 'passarinho',  label: 'Passarinho',  arquivo: '/passarinho.ogg' },
  { id: 'pum-pum',     label: 'Pum Pum',     arquivo: '/pum-pum.ogg' },
];

const CHAVE_STORAGE = 'cantina_som_notificacao';

export function getSons() {
  return SONS;
}

export function getSomAtual() {
  return localStorage.getItem(CHAVE_STORAGE) || 'coco';
}

export function setSomAtual(id) {
  localStorage.setItem(CHAVE_STORAGE, id);
}

export function tocarSom(idSom) {
  try {
    const id = idSom || getSomAtual();
    const som = SONS.find(s => s.id === id) || SONS[0];
    const audio = new Audio(som.arquivo);
    audio.play();
  } catch {
    // O aviso sonoro é opcional.
  }
}
