export function tocarSom() {
  try {
    const audio = new Audio('/coco.ogg');
    audio.play();
  } catch {
    // O aviso sonoro é opcional.
  }
}
