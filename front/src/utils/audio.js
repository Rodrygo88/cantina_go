// ── Leitura em voz alta (Web Speech API) ──

export function lerPagina(onFim) {
  if (!window.speechSynthesis) return false;
  pararLeitura();

  const main = document.querySelector('main') || document.body;
  const clone = main.cloneNode(true);
  clone.querySelectorAll('nav, button, script, style').forEach(el => el.remove());
  const texto = (clone.innerText || clone.textContent || '').trim();
  if (!texto) return false;

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = 'pt-BR';
  fala.rate = 0.92;
  if (onFim) fala.onend = onFim;

  window.speechSynthesis.speak(fala);
  return true;
}

export function pararLeitura() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

export function suportaLeitura() {
  return !!window.speechSynthesis;
}

// ── Sons de notificação ──

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
