const successBtnEl = document.querySelector(".prompt__success");
const failureBtnEl = document.querySelector(".prompt__failure");

const offsetY = 32;
const offsetX = 32;

const rect = failureBtnEl.getBoundingClientRect();
const edges = {
  left: -1 * Math.ceil(rect.left) + offsetX,
  top: -1 * Math.ceil(rect.top) + offsetY,
};
edges.bottom =
  document.body.offsetHeight - Math.ceil(rect.height) + edges.top - 3 * offsetY;
edges.right =
  document.body.offsetWidth - Math.ceil(rect.width) + edges.left - 2 * offsetX;

successBtnEl.addEventListener("click", showSuccessPrompt);
failureBtnEl.addEventListener("click", repositionButton);

function showSuccessPrompt() {
  const buttonsEl = document.querySelector(".prompt__buttons");
  buttonsEl.remove();

  const titleEl = document.querySelector(".prompt__title");
  titleEl.innerHTML = `Aww! Your'e a cutie 🌹`;
}

function repositionButton() {
  let repositionedCount = 0;
  let randomX = 0;
  let randomY = 0;

  while (repositionedCount < 1000) {
    randomY = generateRandomNumber(edges.top, edges.bottom);
    randomX = generateRandomNumber(edges.left, edges.right);
    repositionedCount++;

    failureBtnEl.style.top = `${randomY}px`;
    failureBtnEl.style.left = `${randomX}px`;

    if (!hasCollision(failureBtnEl, successBtnEl)) break;
  }
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function hasCollision(a, b) {
  const ac = a.getBoundingClientRect();
  const bc = b.getBoundingClientRect();

  return (
    Math.abs(ac.top - bc.top) < ac.height &&
    Math.abs(ac.left - bc.left) < ac.width
  );
}
