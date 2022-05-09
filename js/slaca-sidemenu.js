const slaca_sidemenu = () => {
  // selecao dos elementos
  const navigationAnchors = document.querySelectorAll(
    ".sidemenu-navigation ul li a"
  );

  const initialActiveLi = document.getElementsByClassName("sidemenu-active");
  const activeSpan = document.querySelector(".sidemenu-active span");

  // funcoes funcionamento
  let lastActiveLi = initialActiveLi[0];

  const selectItemMenu = (event) => {
    const currentClickedLi = event.path[1];
    if (lastActiveLi === currentClickedLi) {
      return;
    }

    lastActiveLi.classList.remove("sidemenu-active");
    lastActiveLi.removeChild(activeSpan);

    currentClickedLi.classList.add("sidemenu-active");
    currentClickedLi.appendChild(activeSpan);

    lastActiveLi = currentClickedLi;
  };

  // eventos
  for (let anchor of navigationAnchors) {
    anchor.addEventListener("click", selectItemMenu);
  }
};
slaca_sidemenu();